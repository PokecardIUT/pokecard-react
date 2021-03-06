import * as React from "react";
import { ClipLoader, PulseLoader } from "react-spinners";
import Waypoint from "react-waypoint";
import { ICards } from "../../model/Cards";
import { CardCell } from "../components/cardcell/CardCell";
import { NoElement } from "../components/no-element/NoElement";
import { PopupCard } from "../components/popupcard/PopupCard";
import { SearchBar } from "../components/search-bar/SearchBar";
import "./list-cards.css";

interface IMyState {
  codeSets: string;
  listCards: ICards[];
  showSpinner: boolean;
  focus: string | null;
  currentPage: number;
  maxPage: number;
  showLoading: boolean;
  currentName: string;
  favoris: string[];
}

class ListCards extends React.Component<{}, IMyState> {
  get focusedCard() {
    return this.state.listCards.find(
      (element): boolean => this.state.focus === element.id
    );
  }
  private static API_URL_CARDS = "https://api.pokemontcg.io/v1/cards";

  constructor(props: any) {
    super(props);
    const params = new URLSearchParams(props.location.search);

    this.state = {
      codeSets: params.get("setCode") ? params.get("setCode")! : "",
      currentName: "",
      currentPage: 1,
      favoris: JSON.parse(localStorage.getItem("favoris") ? localStorage.getItem("favoris")! : "[]" ),
      focus: null,
      listCards: [],
      maxPage: 0,
      showLoading: false,
      showSpinner: true
    };
  }

  public componentDidMount() {
    this.getCardsBySets();
  }

  public fetchMore(): void {
    if (!this.state.showSpinner) {
      if (this.state.currentPage + 1 <= this.state.maxPage) {
        this.setState({ showLoading: true });
        const url = `${ListCards.API_URL_CARDS}?setCode=${
          this.state.codeSets
        }&pageSize=20&page=${this.state.currentPage + 1}&name=${
          this.state.currentName
        }`;
        fetch(url)
          .then(results => {
            return results.json();
          })
          .then(data => {
            this.setState(state => ({
              currentPage: state.currentPage + 1,
              listCards: [...state.listCards, ...data.cards],
              showLoading: false,
              showSpinner: false
            }));
          });
      }
    }
  }

  public addFavorite(id: string) {
    const index = this.state.favoris.indexOf(id)
    const tmpFav = [...this.state.favoris]
    
    if(index === -1){
      this.setState(state => ({
        favoris: [...state.favoris, id]
      }));
      tmpFav.push(id);
    } else {
      const fav = this.state.favoris
      fav.splice(index,1)
      tmpFav.splice(index,1)
      this.setState({favoris: fav})
    }
    
    this.saveLocal(tmpFav)
  }

  public saveLocal(fav: string[]):void {
    console.log(fav)
    localStorage.setItem("favoris", JSON.stringify(fav))
    console.log(localStorage.getItem("favoris"))
  }

  public render(): any {
    return (
      <div className="container">
        <SearchBar onChange={(e: string) => this.change(e)} />
        {this.state.listCards.length > 0 ? (
          this.state.listCards.map(res => {
            return (
              <CardCell
                key={res.id}
                card={res}
                favorite={this.state.favoris}
                onClick={(id: string) => {
                  this.setState({ focus: id });
                }}
                onClickFavorite={(id: string) => {
                  this.addFavorite(id);
                }}
              />
            );
          })
        ) : this.state.showSpinner === false ? (
          <NoElement />
        ) : null}
        {this.focusedCard !== undefined ? (
          <PopupCard
            card={this.focusedCard}
            onClick={(cancel: null) => {
              this.setState({ focus: cancel });
            }}
          />
        ) : null}
        <Waypoint onEnter={() => this.fetchMore()} />
        <PulseLoader
          sizeUnit={"px"}
          size={30}
          color={"#123abc"}
          loading={this.state.showLoading}
        />
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
    this.setState({ currentName: event });
    this.getCardsByName(event);
  }

  private getCardsByName(name: string): void {
    let pageSize = 0;
    let totalCard = 0;
    const url = `${ListCards.API_URL_CARDS}?setCode=${
      this.state.codeSets
    }&pageSize=20&name=${name}`;
    fetch(url)
      .then(results => {
        results.headers.forEach((val, key) => {
          if (key === "page-size") {
            pageSize = Number(val);
          } else if (key === "total-count") {
            totalCard = Number(val);
          }
        });
        return results.json();
      })
      .then(data => {
        this.setState({
          currentPage: 1,
          listCards: data.cards,
          maxPage: Math.ceil(totalCard / pageSize),
          showSpinner: false
        });
      });
  }

  private getCardsBySets(): void {
    let pageSize = 0;
    let totalCard = 0;
    const url = `${ListCards.API_URL_CARDS}?setCode=${
      this.state.codeSets
    }&pageSize=20`;
    fetch(url)
      .then(results => {
        results.headers.forEach((val, key) => {
          if (key === "page-size") {
            pageSize = Number(val);
          } else if (key === "total-count") {
            totalCard = Number(val);
          }
        });
        return results.json();
      })
      .then(data => {
        this.setState({
          listCards: data.cards,
          maxPage: Math.round(totalCard / pageSize),
          showSpinner: false
        });
      });
  }
}

export default ListCards;
