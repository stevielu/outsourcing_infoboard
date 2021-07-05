import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppFrame from './views/AppFrame/AppFrame';
import './App.css';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppFrame />
      </Router>
    </Provider>
  );
}

export default App;
