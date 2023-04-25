import React, { useEffect, useState, useCallback } from 'react';
import { Accordian, ProgressBar } from '../../components/index';
import './GroupTasks.css';

import * as types from '../../types';
import * as utils from '../../utils/index';

export const ProgressContext = React.createContext<
  React.Dispatch<React.SetStateAction<number>>
>(() => console.log('Error in Context'));

type Props = {
  title: string;
  data: types.GroupTask[];
  error?: string;
};

export default function GroupTasks({ title, data, error }: Props) {
  const [progressTotalValue, setProgressTotalValue] = useState(0);
  const [currProgressValue, setCurrProgressValue] = useState(0);
  const [currProgressPercetage, setCurrProgressPercentage] = useState(0);

  // Cache function for use in useEffect
  const updateProgress = useCallback(
    (valueToAdd = 0) => {
      const newPercetage = utils.calculatePercentage(
        progressTotalValue,
        valueToAdd
      );
      if (
        typeof newPercetage === 'number' &&
        newPercetage >= 0 &&
        newPercetage <= 100
      )
        setCurrProgressPercentage(newPercetage);
    },
    [progressTotalValue]
  );

  // Calculate progressTotalValue and currProgressValue
  useEffect(() => {
    let initialProgressTotal = 0;
    let initialProgressValue = 0;
    data.forEach((item: types.GroupTask) => {
      item.tasks.forEach((task) => {
        initialProgressTotal += task.value;
        if (task.checked) initialProgressValue += task.value;
      });
    });

    setProgressTotalValue(initialProgressTotal);
    setCurrProgressValue(initialProgressValue);
  }, [data]);

  // Update progress bar
  useEffect(() => {
    updateProgress(currProgressValue);
  }, [currProgressValue, updateProgress]);

  return (
    <div className="group-tasks">
      {error ? (
        error
      ) : (
        <>
          <div className="group-tasks__top">
            <div className="group-tasks__title">{title}</div>
            <div className="group-tasks__progress">
              <ProgressBar percentage={currProgressPercetage} />
            </div>
          </div>
          <div className="group-tasks__bot">
            <ProgressContext.Provider value={setCurrProgressValue}>
              <div className="accordians">
                {data.map((item: types.GroupTask, key) => (
                  <Accordian
                    key={key}
                    title={item.name}
                    checkboxes={item.tasks}
                  />
                ))}
              </div>
            </ProgressContext.Provider>
          </div>
        </>
      )}
    </div>
  );
}
