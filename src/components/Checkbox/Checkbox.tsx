import { useContext, useState } from 'react';
import { Task } from '../../types';
import * as icon from '../../utils/svg';

import './Checkbox.css';
import { ProgressContext } from '../../features/index';

type Props = {
  index: number;
  setTasks: any;
  label: string;
  value?: number;
  checked: boolean;
};

export default function Checkbox({
  index,
  setTasks,
  label,
  value,
  checked,
}: Props) {
  const [isChecked, setIsChecked] = useState(checked);
  const setCurrProgressValue =
    useContext<React.Dispatch<React.SetStateAction<number>>>(ProgressContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let valueToAdd = +e.target.value;
    if (isChecked) valueToAdd *= -1;

    const newChecked = !isChecked;

    setIsChecked(newChecked);
    setTasks((prev: Task[]) => {
      const newTasks = [...prev];
      newTasks[index].checked = newChecked;
      return newTasks;
    });

    if (value) {
      setCurrProgressValue((prev: number) => prev + valueToAdd);
    }
  }

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="checkbox__custom">{icon.checkmark}</span>
      <span className="checkbox__label">{label}</span>
    </label>
  );
}
