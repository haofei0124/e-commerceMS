import React from 'react';

class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchType : 'productId', //productId / productName
      searchKeyword : ''
    }
  }
  onSearchTypeChange(e) {
    this.setState({
      searchType: e.target.value.trim()
    })
  }
  onSearchKeywordChange(e) {
    this.setState({
      searchKeyword: e.target.value.trim()
    })
  }
  //点击按钮触发的事件
  onSearch() {
    this.props.onSearch(this.state.searchType, this.state.searchKeyword)
  }
  onSearchKeywordKeyUp(e){
    if(e.keyCode === 13) {
      this.onSearch()
    }
  }
  render() {
    return (
      <div className="row search-wrap">
          <div className="col-md-12">
          <div className="form-inline">
            <div className="form-group">
              <select 
                className="form-control"
                onChange={(e)=>this.onSearchTypeChange(e)}
              >
                <option value="productId">By item ID</option>
                <option value="productName">By item name</option>
              </select>
            </div>
            <div className="form-group">
              <input 
              type="text" 
              className="form-control" 
              placeholder="Key words"
              onChange={(e)=>this.onSearchKeywordChange(e)}
              onKeyUp={(e)=>{this.onSearchKeywordKeyUp(e)}}
              />
            </div>
            <button 
            className="btn btn-primary"
            onClick={(e)=>{this.onSearch(e)}}
            >Search</button>
          </div>
          </div>
        </div>
    );
  }
}


export default ListSearch;

