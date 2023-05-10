import './App.css';
import React from 'react';
import { initDB } from 'react-indexed-db';
import WorkSpase from './workspace'

const DBConfig = {
  name: 'MyDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'notes',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'text', keypath: 'text', options: { unique: false } }
      ]
    }
  ]
};
initDB(DBConfig)


function App() {
  return (
      <div className='container'>
        <WorkSpase />
      </div>
  );
}

export default App;
