import * as React from "react";
import "./App.css";
import ListCards from "./features/list-cards/ListCards";
import ListDeck from "./features/list-decks/ListDeck";

class App extends React.Component {
  public render() {
    return (
      <div>
        <ListDeck />
        <ListCards />
      </div>
    );
  }
}

export default App;
