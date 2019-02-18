import * as React from "react";
import { FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Waypoint from "react-waypoint";
import { ICards } from "../../model/Cards";
import { SearchBar } from "../components/search-bar/SearchBar";
import "./list-cards.css";

interface IMyState {
  codeSets: string;
  listCards: ICards[];
  listSearch: ICards[];
  showSpinner: boolean;
  focus: string | null;
  currentPage: number;
  maxPage: number;
  showLoading: boolean;
}

class ListCards extends React.Component<{}, IMyState> {
  private static API_URL_CARDS = "https://api.pokemontcg.io/v1/cards";

  constructor(props: any) {
    super(props);
    const params = new URLSearchParams(props.location.search);

    this.state = {
      codeSets: params.get("setCode") ? params.get("setCode")! : "",
      currentPage: 1,
      focus: null,
      listCards: [],
      listSearch: [],
      maxPage: 0,
      showLoading: false,
      showSpinner: true
    };
  }

  public componentDidMount() {
    this.getCardsBySets();
  }

  get focusedCard() {
    return this.state.listCards.find(
      (element): boolean => this.state.focus === element.id
    );
  }

  public fetchMore(): void {
    if (!this.state.showSpinner) {
      if (this.state.currentPage + 1 <= this.state.maxPage) {
      
        this.setState({ showLoading: true });
        const url = `${ListCards.API_URL_CARDS}?setCode=${
          this.state.codeSets
        }&pageSize=20&page=${this.state.currentPage + 1}`;
        console.log(url)
        fetch(url)
          .then(results => {
            return results.json();
          })
          .then(data => {
            this.state.listSearch.push(data)
            this.state.listCards.push(data)
            this.setState({
              currentPage: this.state.currentPage+1,
              showLoading: false,
              showSpinner: false,
            });
          });
      }
    }
  }

  public render(): any {
    return (
      <div className="container">
        <SearchBar onChange={(e: string) => this.change(e)} />
        {this.state.listSearch.length > 0 ? (
          this.state.listSearch.map(res => {
            return (
              <div className="cellule" key={Math.random()}>
                <img
                  src={res.imageUrl}
                  onClick={() => {
                    this.setState({ focus: res.id });
                  }}
                />
              </div>
            );
          })
        ) : this.state.showSpinner === false ? (
          <div className="empty"> Aucun élément trouvé </div>
        ) : null}
        {this.focusedCard !== undefined ? (
          <div
            className="popup"
            onClick={() => {
              this.setState({ focus: null });
            }}
          >
            <FaTimes className="close-button" />
            <div className="popup_inner">
              <img
                className="popup-img"
                src={this.focusedCard.imageUrlHiRes}
                height="100%"
              />
            </div>
          </div>
        ) : null}
        <Waypoint onEnter={() => this.fetchMore()} />

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
    const listFilter: ICards[] = [];
    this.state.listCards.map(element => {
      const name = element.name.toLowerCase();
      if (name.includes(event.toLowerCase())) {
        listFilter.push(element);
      }
    });
    this.setState({ listSearch: listFilter });
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
          listSearch: data.cards,
          maxPage: Math.round(totalCard / pageSize),
          showSpinner: false
        });
      });
  }
}

export default ListCards;
