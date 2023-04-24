import React, { useEffect, useState, useCallback } from 'react';
import { Accordian } from '../../components/index';
import './GroupTasks.css';

import * as types from '../../types';
import * as utils from '../../utils';
import { getGroupsData } from '../../services/ApiService';

import Checkbox from '../../components/Checkbox/Checkbox';

export default function GroupTasks() {
  const [progressTotalValue, setProgressTotalValue] = useState(0);
  const [currProgressValue, setCurrProgressValue] = useState(0);
  const [currProgressPercetage, setCurrProgressPercentage] = useState(0);
  const [profileData, setProfileData] = useState([]);

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

  useEffect(() => {
    getGroupsData().then((response) => {
      console.log(response);
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
    });
  }, []);

  useEffect(() => {
    updateProgress(currProgressValue);
  }, [currProgressValue, updateProgress]);

  function getTaskList(tasks: types.Task[]): JSX.Element[] {
    return tasks.map((task) => {
      return (
        <Checkbox
          label={task.description}
          value={task.value}
          checked={task.checked}
          onChange={(valueToAdd) => {
            setCurrProgressValue((prev) => {
              return prev + +valueToAdd;
            });
          }}
        />
      );
    });
  }

  return (
    <div className="group-tasks">
      <div className="group-tasks__top">
        <div className="group-tasks__title">Lodgify Grouped Tasks</div>
        {currProgressPercetage && (
          <div className="group-tasks__progress">{currProgressPercetage}</div>
        )}
      </div>
      <div className="group-tasks__bot">
        <div className="accordians">
          {profileData.map((item: types.GroupTask, key) => (
            <Accordian
              key={key}
              title={item.name}
              content={getTaskList(item.tasks)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
