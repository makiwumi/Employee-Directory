import React from 'react';
import Wrapper from './components/wrapper';
import Main from './components/main';
import Header from './components/header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Main />
      </Wrapper>
    </div>
  );
}

export default App;
