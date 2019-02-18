import * as React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { ICards } from "../../model/Cards";
import "./list-cards.css";

interface IMyState {
  codeSets: string;
  listCards: ICards[];
  listSearch: ICards[];
  showSpinner: boolean;
  focus: string | null;
}

class ListCards extends React.Component<{}, IMyState> {
  private static API_URL_CARDS = "https://api.pokemontcg.io/v1/cards";

  constructor(props: any) {
    super(props);
    const params = new URLSearchParams(props.location.search);

    this.state = {
      codeSets: params.get("setCode") ? params.get("setCode")! : "",
      focus: null,
      listCards: [],
      listSearch: [],
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

  public render(): any {
    return (
      <div className="container">
        <div className="search-form">
          <FaSearch className="search-button" />
          <input
            type="text"
            className="search-input"
            placeholder="Recherche"
            onChange={e => this.change(e)}
          />
        </div>
        {this.state.listSearch.length > 0 ? (
          this.state.listSearch.map(res => {
            return (
              <div className="cellule" key={res.id}>
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

  private change(event: React.ChangeEvent<HTMLInputElement>): void {
    console.log(event.currentTarget.value);

    const listFilter: ICards[] = [];
    this.state.listCards.map(element => {
      const name = element.name.toLowerCase();
      console.log(element.name);
      if (name.includes(event.currentTarget.value.toLowerCase())) {
        listFilter.push(element);
      }
    });
    this.setState({ listSearch: listFilter });
  }

  private getCardsBySets(): void {
    const url = `${ListCards.API_URL_CARDS}?setCode=${
      this.state.codeSets
    }&pageSize=1000`;
    fetch(url)
      .then(results => results.json())
      .then(data => {
        console.log(data.cards.length);
        this.setState({
          listCards: data.cards,
          listSearch: data.cards,
          showSpinner: false
        });
      });
  }
}

export default ListCards;
