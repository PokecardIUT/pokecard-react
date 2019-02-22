import * as React from "react";
import { ClipLoader, PulseLoader } from "react-spinners";
import Waypoint from "react-waypoint";
import { ICards } from "../../model/Cards";
import { CardCell } from "../components/cardcell/CardCell";
import { NoElement } from "../components/no-element/NoElement";
import { PopupCard } from "../components/popupcard/PopupCard";

interface IMyState {
  listCards: ICards[];
  showSpinner: boolean;
  focus: string | null;
  currentPage: number;
  maxPage: number;
  showLoading: boolean;
  currentName: string;
  favoris: string[];
}

export class ListFavori extends React.Component<{}, IMyState> {
  private static API_URL_CARDS = "https://api.pokemontcg.io/v1/cards";

  constructor(props: any) {
    super(props);

    this.state = {
      currentName: "",
      currentPage: 1,
      favoris: JSON.parse(
        localStorage.getItem("favoris")
          ? localStorage.getItem("favoris")!
          : "[]"
      ),
      focus: null,
      listCards: [],
      maxPage: 0,
      showLoading: false,
      showSpinner: true
    };
  }

  public componentDidMount() {
    this.getCardById();
  }

  public getCardById() {
    for (let i = 0; i < 20; i++) {
      if (this.state.favoris[i]) {
        const url = `${ListFavori.API_URL_CARDS}?id=${
          this.state.favoris[i]
        }`;
        console.log(url)
        fetch(url)
          .then(results => results.json())
          .then(data => {
            this.setState(state => ({
              currentPage: 1,
              listCards: [...state.listCards, ...data.cards],
              maxPage: Math.ceil(this.state.favoris.length / 20)
            }));
           
          });
      }
      if (i === 19) {
        this.setState({ showSpinner: false });
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

  get focusedCard() {
    return this.state.listCards.find(
      (element): boolean => this.state.focus === element.id
    );
  }

  public fetchMore(): void {
    if (!this.state.showSpinner) {
        let compter = this.state.currentPage
      if (this.state.currentPage + 1 <= this.state.maxPage) {
        this.setState({ showLoading: true });
        for(let i = 20*compter; i< 20*compter+20; i++){
            if(this.state.favoris[i]){
            const url = `${ListFavori.API_URL_CARDS}?id=${
                this.state.favoris[i]
              }`;
              fetch(url)
                .then(results => {
                  return results.json();
                })
                .then(data => {
                  this.setState(state => ({
                    listCards: [...state.listCards, ...data.cards],
                  }));
                  compter++;
                });
            }
            if(i === (20*this.state.currentPage+20)-1){
                this.setState(state => ({showLoading: false, currentPage: state.currentPage + 1}))
            }
        }
      }
    }
  }

  public render(): any {
    return (
      <div className="container">
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
}
