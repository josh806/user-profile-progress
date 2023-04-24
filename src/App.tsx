import React from 'react';
import './App.css';

import { GroupTasks } from './features/index';

function App() {
  return (
    <>
      <div className="app">
        <div className="container">
          <GroupTasks />
        </div>
      </div>
    </>
  );
}

export default App;
