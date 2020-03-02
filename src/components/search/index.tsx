import React from 'react';
const style = require('./style.scss');

export interface SearchComponentProps {
  onChange: (text: string,col:string) => void
  col:string
}

export interface SearchComponentState {
  searchText: string
  col:string
}
export default class SearchComponent extends React.Component<SearchComponentProps, SearchComponentState> {
  constructor(props: SearchComponentProps, context: {}) {
    super(props, context);
    this.state = {
      searchText: '',
      col:''
    };

    this.onChange = this.onChange.bind(this);
  }

 onChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({
      searchText: e.currentTarget.value,
      col:this.props.col
    });
    this.props.onChange(e.currentTarget.value,this.props.col);
  }

  render() {
    return (
        <div className={style.searchContainer}>
          <input className={style.searchInput} id="" type='text' onChange={this.onChange} value={this.state.searchText}  />
        </div>
    );
  }
}