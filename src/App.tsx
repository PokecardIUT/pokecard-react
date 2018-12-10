import * as React from "react";
import "./App.css";
import ListCards from "./features/list-cards/ListCards";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ListCards />
      </div>
    );
  }
}

export default App;
