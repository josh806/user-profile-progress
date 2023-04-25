import { useState, useRef, useEffect } from 'react';
import * as icon from '../../utils/svg';

import './Accordian.css';

import * as types from '../../types';
import { Checkbox } from '../index';

type Props = {
  title: string;
  checkboxes: types.Task[];
};

export default function Accordian({ title, checkboxes }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [tasks, setTasks] = useState(checkboxes);

  const contentRef = useRef<HTMLDivElement>(null);

  // Update tasks' checked status
  useEffect(() => {
    if (tasks) {
      setAllChecked(tasks.every((task) => task.checked));
    }
  }, [tasks]);

  return (
    <div
      className={`accordian${isActive ? ' accordian--active' : ''}${
        allChecked ? ' accordian--highlight' : ''
      }`}
    >
      <div className="accordian__header" onClick={() => setIsActive(!isActive)}>
        <div className="accordian__header__left">
          <div className="accordian__icon">
            {allChecked ? icon.clipboard : icon.clipboardCheck}
          </div>
          <div className="accordian__title">{title}</div>
        </div>
        <div className="accordian__header__right">
          <div className="accordian__status">
            <div className="accordian__text">{isActive ? 'Hide' : 'Show'}</div>
            <div className="accordian__arrow">{icon.arrowDown}</div>
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        className="accordian__content"
        style={
          isActive
            ? {
                height: contentRef.current
                  ? contentRef.current.scrollHeight
                  : 0,
              }
            : { height: '0' }
        }
      >
        {tasks
          ? tasks.map((task, key) => {
              return (
                <div key={key} className="accordian__item">
                  <Checkbox
                    index={key}
                    setTasks={setTasks}
                    label={task.description}
                    value={task.value}
                    checked={task.checked}
                  />
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
}
