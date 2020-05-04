import React from "react";
import { Route, Link } from 'react-router-dom';
import Form from './components/Form';
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <nav>
        <h1>Tony Bologne's Pizza Parlour</h1>
      </nav>
      <Route exact path ="/" component={Form} />
      </div>
  );
};
export default App;