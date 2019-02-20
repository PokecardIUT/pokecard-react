import * as React from "react";

export class NoElement extends React.Component<{}, {}> {
  public render(): any {
    return <div className="empty"> Aucun élément trouvé </div>;
  }
}
