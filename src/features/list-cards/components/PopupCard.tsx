import * as React from "react";
import { FaTimes } from "react-icons/fa";
import { ICards } from "../../../model/Cards";
import "../list-cards.css";

export class PopupCard extends React.Component<{ card: ICards; onClick: any },{}> {
  constructor(props: any) {
    super(props);
  }

  public render(): any {
    return (
      <div
        className="popup"
        onClick={() => {
         this.props.onClick(null)
        }}
      >
        <FaTimes className="close-button" />
        <div className="popup_inner">
          <img
            className="popup-img"
            src={this.props.card.imageUrlHiRes}
            height="100%"
          />
        </div>
      </div>
    );
  }
}
