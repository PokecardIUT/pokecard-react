import * as React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import ListCards from "./features/list-cards/ListCards";
import ListDeck from "./features/list-decks/ListDeck";
import { ListFavori } from "./features/list-favoris/ListFavoris";

class App extends React.Component {
  public render() {
    return (
      <div>
        <Navbar className="margin-b" bg="navbar" variant="dark">
          <Navbar.Brand href="/">PokecardAppReact</Navbar.Brand>
          <Nav.Link href="/favoris"><FaHeart className="favoris-icon"/> Favoris</Nav.Link>
        </Navbar>
        <Switch>
          <Route exact path="/" component={ListDeck} />
          <Route path="/card" component={ListCards} />
          <Route path="/favoris" component={ListFavori} />
        </Switch>
      </div>
    );
  }
}

export default App;
