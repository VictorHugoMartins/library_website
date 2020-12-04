import React from 'react';

import './global.css';
import Routes from './routes.js';

function App() {
  /*let [ counter, setCounter ] = useState(0);

  function increment(){
    setCounter(counter + 1);
    console.log(counter);
  }*/

  return (
    <>
    <Routes/>
    {/*<Header>Contador: {counter}</Header>
    <button onClick={increment}>Incrementar</button>
    </div>*/}
    </>
  );
}

export default App;


/* npm install react-router-dom */