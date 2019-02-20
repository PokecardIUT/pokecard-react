import * as React from "react";
import { ISets } from '../../../model/Sets';

export class CellDeck extends React.Component<{ set: ISets; onClick: any },{}> {
  constructor(props: any) {
    super(props);
  }

  public render(): any {
    return (
      <div
        className="cell"
        onClick={() => this.props.onClick(this.props.set.code)}
      >
        <div className="container-logo">
          <img className="logo" src={this.props.set.logoUrl} />
        </div>
        <div className="container-info">
          <p className="info-name">{this.props.set.name}</p>
          <p>{this.props.set.releaseDate}</p>
        </div>
      </div>
    );
  }
}
