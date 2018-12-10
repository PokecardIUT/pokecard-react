import * as React from "react";
import "./list-cards.css";

interface IMyState {
  listCards: any[];
}

class ListCards extends React.Component<{}, IMyState> {
  private static API_URL_CARDS = "https://api.pokemontcg.io/v1/cards";

  constructor(props: any) {
    super(props);
    this.state = {
      listCards: []
    };
  }

  public componentDidMount() {
    this.getCards();
  }

  public render(): any {
    return (
      <div className="container">
        {this.state.listCards.map(res => {
          return (
            <div className="cell" key={res.id}>
              <img src={res.imageUrl} />
            </div>
          );
        })}
      </div>
    );
  }

  private getCards(): void {
    fetch(ListCards.API_URL_CARDS)
      .then(results => results.json())
      .then(data => {
        this.setState({ listCards: data.cards });
        console.log(this.state);
      });
  }
}

export default ListCards;
