import * as React from "react"
import { FaSearch } from "react-icons/fa";

interface ISearchState {
    value: string
}

export class SearchBar extends React.Component<{onChange: any},ISearchState> {
    constructor (props: any) {
        super(props);
    }

    public render(): any {
        return( <div className="search-form">
        <FaSearch className="search-button" />
        <input
          type="text"
          className="search-input"
          placeholder="Recherche"
          onChange={e => this.change(e)}
        />
      </div>)
    }

    public change(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({value: event.currentTarget.value}, () => this.props.onChange(this.state.value))
    }
}