import * as React from "react";
import { ICards } from "../../../model/Cards";
import "../list-cards.css";

export class CardCell extends React.Component<{ card: ICards; onClick: any }, {}> {
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
      </div>
    );
  }
}
