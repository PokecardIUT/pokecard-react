import * as React from "react";
import {Redirect} from "react-router-dom"
import "./list-deck.css";


interface IMyState {
  cardRedirect: boolean;
  listSets: any[];
}

class ListDecks extends React.Component<{}, IMyState> {
  public static API_URL_SETS = "https://api.pokemontcg.io/v1/sets";
  public codeSets: {id:string};

  constructor(props: any) {
    super(props);
    this.state = {
      cardRedirect: false,
      listSets: []
    };

    this.codeSets = {
      id: ""
    }
  }

  public componentDidMount() {
    this.getSets();
  }

  public render(): any {
    return (

      this.state.cardRedirect ?
      <Redirect to={{ pathname: "/card", search: `?setCode=${this.codeSets.id}` }} push/> :

      <div className="container">
        {this.state.listSets.map(res => {
          return (
            <div className="cell" key={res.code} onClick={() => this.onClickCell(res.code)}>
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


  private onClickCell(code : string): void {
    this.codeSets.id = code
    this.setState({cardRedirect: true});
  }

}

export default ListDecks;
