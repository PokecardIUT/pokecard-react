import * as React from "react";
import "./list-cards.css";

interface IMyState {
  codeSets: string;
  listCards: any[];
}

class ListCards extends React.Component<{}, IMyState> {
  private static API_URL_CARDS = "https://api.pokemontcg.io/v1/cards";

  constructor(props: any) {
    super(props);
    const params = new URLSearchParams(props.location.search)

    this.state = {
      codeSets: params.get("setCode") ? params.get("setCode")! : "",
      listCards: [],
    };
       
  }

  public componentDidMount() {
    this.getCardsBySets();
  }

  public render(): any {
    return (
      <div className="container">
        {this.state.listCards.map(res => {
          return (
            <div className="cellule" key={res.id}>
              <img src={res.imageUrl} />
            </div>
          );
        })}
      </div>
    );
  }

  private getCardsBySets(): void {
    const url = `${ListCards.API_URL_CARDS}?setCode=${this.state.codeSets}&pageSize=1000`
    fetch(url)
      .then(results => results.json())
      .then(data => {
        console.log(data.cards.length)
        this.setState({ listCards: data.cards});
      });
  }
}

export default ListCards;
