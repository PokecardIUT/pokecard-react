import * as React from "react";
import { Navbar } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ListCards from './features/list-cards/ListCards';
import ListDeck from "./features/list-decks/ListDeck";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Navbar className="margin-b" bg="navbar" variant="dark">
          <Navbar.Brand href="/">PokecardAppReact</Navbar.Brand>
        </Navbar>
        <Switch>
          <Route exact path="/" component={ListDeck} />
          <Route path="/card" component={ListCards} />
        </Switch>
      </div>
    );
  }
}

export default App;
