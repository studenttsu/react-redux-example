import React from 'react';
import s from './App.module.css';

import { UsersPage } from 'features/users';

function App() {
  return (
    <div className={s.wrapper}>
        <UsersPage />
    </div>
  );
}

export default App;
