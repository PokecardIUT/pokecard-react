import * as React from "react";
import "./list-deck.css";

interface IMyState {
  listSets: any[];
}

class ListDecks extends React.Component<{}, IMyState> {
  public static API_URL_SETS = "https://api.pokemontcg.io/v1/sets";
  constructor(props: any) {
    super(props);
    this.state = {
      listSets: []
    };
  }

  public componentDidMount() {
    this.getSets();
  }

  public render(): any {
    return (
      <div className="container">
        {this.state.listSets.map(res => {
          return (
            <div className="cell" key={res.code}>
              <div className="container-logo">
                <img className="logo" src={res.logoUrl} />
              </div>
              <div className="container-info">
                <p className="info-name">{res.name}</p>
                <p>{res.releaseDate}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  private getSets(): void {
    fetch(ListDecks.API_URL_SETS)
      .then((res: any) => res.json())
      .then(data => {
        let listSetsByDate:any = data.sets.sort((o:any) =>  new Date( o.releaseDate ) );
        listSetsByDate = listSetsByDate.reverse();
        this.setState({ listSets: listSetsByDate });
      });
  }
}

export default ListDecks;
