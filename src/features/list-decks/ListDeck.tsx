import * as React from "react";
import { Redirect } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ISets } from "../../model/Sets";
import { SearchBar } from '../components/search-bar/SearchBar';
import "./list-deck.css";

interface IMyState {
  cardRedirect: boolean;
  listSets: ISets[];
  listSearch: ISets[];
  showSpinner: boolean;
}

class ListDecks extends React.Component<{}, IMyState> {
  public static API_URL_SETS = "https://api.pokemontcg.io/v1/sets";
  public codeSets: { id: string };

  constructor(props: any) {
    super(props);
    this.state = {
      cardRedirect: false,
      listSearch: [],
      listSets: [],
      showSpinner: true
    };

    this.codeSets = {
      id: ""
    };
  }

  public componentDidMount() {
    this.getSets();
  }

  public render(): any {
    return this.state.cardRedirect ? (
      <Redirect
        to={{ pathname: "/card", search: `?setCode=${this.codeSets.id}` }}
        push
      />
    ) : (
      <div className="container">
        <SearchBar onChange={ (e:string) =>  this.change(e) }/>
        {this.state.listSearch.length > 0 ? (
          this.state.listSearch.map(res => {
            return (
              <div
                className="cell"
                key={res.code}
                onClick={() => this.onClickCell(res.code)}
              >
                <div className="container-logo">
                  <img className="logo" src={res.logoUrl} />
                </div>
                <div className="container-info">
                  <p className="info-name">{res.name}</p>
                  <p>{res.releaseDate}</p>
                </div>
              </div>
            );
          })
        ) : this.state.showSpinner === false ? (
          <div className="empty"> Aucun élément trouvé </div>
        ) : null}

        <div className="spinner">
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={this.state.showSpinner}
          />
        </div>
      </div>
    );
  }

  private change(event: string): void {
    const listFilter: ISets[] = [];
    this.state.listSets.map(element => {
      const name = element.name.toLowerCase();
      if (name.includes(event.toLowerCase())) {
        listFilter.push(element);
      }
    });
    this.setState({ listSearch: listFilter });
  }

  private getSets(): void {
    fetch(ListDecks.API_URL_SETS)
      .then((res: any) => res.json())
      .then(data => {
        let listSetsByDate: any = data.sets.sort(
          (o: any) => new Date(o.releaseDate)
        );
        listSetsByDate = listSetsByDate.reverse();
        this.setState({
          listSearch: listSetsByDate,
          listSets: listSetsByDate,
          showSpinner: false
        });
      });
  }

  private onClickCell(code: string): void {
    this.codeSets.id = code;
    this.setState({ cardRedirect: true });
  }
}

export default ListDecks;
