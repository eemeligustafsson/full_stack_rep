import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import { Provider } from "react";

import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const handleClick = (type) => {
    store.dispatch({ type });
  };

  return (
    <div>
      <button onClick={() => handleClick("GOOD")}>GOOD</button>
      <button onClick={() => handleClick("OK")}>OK</button>
      <button onClick={() => handleClick("BAD")}>BAD</button>
      <button onClick={() => handleClick("ZERO")}>RESET</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
