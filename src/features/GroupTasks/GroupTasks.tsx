import React, { useEffect, useState, useCallback } from 'react';
import { Accordian, ProgressBar } from '../../components/index';
import './GroupTasks.css';

import * as types from '../../types';
import * as utils from '../../utils/index';
import { getGroupsData } from '../../services/ApiService';

export const ProgressContext = React.createContext<
  React.Dispatch<React.SetStateAction<number>>
>(() => console.log('Error in Context'));

export default function GroupTasks() {
  const [progressTotalValue, setProgressTotalValue] = useState(0);
  const [currProgressValue, setCurrProgressValue] = useState(0);
  const [currProgressPercetage, setCurrProgressPercentage] = useState(0);
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState<string>();

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

  // Fetch data
  useEffect(() => {
    getGroupsData().then((response) => {
      if (response.errorMsg) {
        setError(`Error: ${response.errorMsg}`);
      } else {
        setProfileData(response);

        let initialProgressTotal = 0;
        let initialProgressValue = 0;
        response.forEach((item: types.GroupTask) => {
          item.tasks.forEach((task) => {
            initialProgressTotal += task.value;
            if (task.checked) initialProgressValue += task.value;
          });
        });

        setProgressTotalValue(initialProgressTotal);
        setCurrProgressValue(initialProgressValue);
      }
    });
  }, []);

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
            <div className="group-tasks__title">Lodgify Grouped Tasks</div>
            <div className="group-tasks__progress">
              <ProgressBar percentage={currProgressPercetage} />
            </div>
          </div>
          <div className="group-tasks__bot">
            <ProgressContext.Provider value={setCurrProgressValue}>
              <div className="accordians">
                {profileData.map((item: types.GroupTask, key) => (
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
