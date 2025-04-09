import React from 'react';
import './assets/styles/App.css';
import AppRoutes from './routes';
import BackToTopButton from './components/common/BackToTopButton';

function App() {
  return (
    <div className="app">
      <AppRoutes />
      <BackToTopButton />
    </div>
  );
}

export default App;
