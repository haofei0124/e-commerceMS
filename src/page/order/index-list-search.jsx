import React from 'react';

class ListSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderNumber : '', //productId / productName
    }
  }
  onSearchTypeChange(e) {
    this.setState({
      searchType: e.target.value.trim()
    })
  }
  onSearchKeywordChange(e) {
    this.setState({
      orderNumber: e.target.value.trim()
    })
  }
  //点击按钮触发的事件
  onSearch() {
    this.props.onSearch(this.state.orderNumber)
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
              >
                <option >Order number</option>
              </select>
            </div>
            <div className="form-group">
              <input 
              type="text" 
              className="form-control" 
              placeholder="Order number"
              name="orderNumber"
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

