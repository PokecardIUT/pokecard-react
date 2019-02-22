import * as React from "react";
import { FaHeart } from "react-icons/fa";
import { ICards } from "../../../model/Cards";
import "../../list-cards/list-cards.css";

export class CardCell extends React.Component<
  { card: ICards; onClick: any; onClickFavorite: any; favorite: string[] },
  {}
> {
  constructor(props: any) {
    super(props);
  }

  public render(): any {
    return (
      <div className="cellule">
        <img
          src={this.props.card.imageUrl}
          onClick={() => {
            this.props.onClick(this.props.card.id);
          }}
        />
        <FaHeart
          className={this.props.favorite.indexOf(this.props.card.id) === -1 ? "favorite-icon favorite-icon-white" : "favorite-icon favorite-icon-red" }
          onClick={() => {
            this.props.onClickFavorite(this.props.card.id);
          }}
        />
      </div>
    );
  }
}
