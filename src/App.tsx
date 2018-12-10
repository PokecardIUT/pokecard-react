import * as React from "react";
import "./App.css";
import ListDeck from "./features/list-decks/ListDeck";

class App extends React.Component {
  public render() {
    return (
      <div>
        <ListDeck />
      </div>
    );
  }
}

export default App;
