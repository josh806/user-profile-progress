import React, { useState } from 'react';
import * as icon from '../../utils/svg';

import './Checkbox.css';

type Props = {
  label: string;
  value?: number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({ label, value, checked, onChange }: Props) {
  const [isChecked, setIsChecked] = useState(checked);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let valueToAdd = e.target.value;
    if (isChecked) valueToAdd *= -1;

    setIsChecked(!isChecked);
    onChange(valueToAdd);
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
