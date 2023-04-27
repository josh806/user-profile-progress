import { useEffect, useState } from 'react';
import './App.css';

import * as types from './types';
import * as apiService from './services/ApiService';
import { GroupTasks } from './features/index';

function App() {
  const [profileData, setProfileData] = useState<types.GroupTask[] | []>([]);
  const [error, setError] = useState<string>();

  // Fetch data
  useEffect(() => {
    apiService
      .getGroupsData()
      .then((response: types.GroupTask[] | types.ErrorType) => {
        if (!Array.isArray(response) && response.errorMsg) {
          setError(`Error: ${response.errorMsg}`);
        } else {
          setProfileData(response as types.GroupTask[]);
        }
      });
  }, []);

  return (
    <>
      <div className="app">
        <div className="container">
          <GroupTasks
            title="Lodgify Grouped Tasks"
            data={profileData || {}}
            error={error}
          />
        </div>
      </div>
    </>
  );
}

export default App;
