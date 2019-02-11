import * as React from "react";
import { Route , Switch } from "react-router-dom";
import "./App.css";
import ListCards from './features/list-cards/ListCards';
import ListDeck from "./features/list-decks/ListDeck";

class App extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact path="/" component={ListDeck} />
        <Route path="/card" component={ListCards} />
      </Switch>
    );
  }
}

export default App;
