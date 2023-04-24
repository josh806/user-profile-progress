import React, { useState, useRef } from 'react';
import * as icon from '../../utils/svg';

import './Accordian.css';

type Props = {
  title: string;
  content: JSX.Element;
};

export default function Accordian({ title, content }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  const contentEl = useRef();

  return (
    <div className={`accordian${isActive ? ' accordian--active' : ''}`}>
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
        ref={contentEl}
        className="accordian__content"
        style={
          isActive
            ? {
                height: contentEl.current.scrollHeight,
              }
            : { height: '0' }
        }
      >
        {content}
      </div>
    </div>
  );
}
