import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      list : [],
      pageNum : 1,
      listType : 'list',
      // searchType : '',
      // searchKeyword: ''
    }
  } 
  componentDidMount() {
    this.loadProductList();
  }
  loadProductList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索的话，需要传入搜索类型和搜索关键字
    if(this.state.listType === 'search') {
      listParam.searchType = this.state.searchType;
      listParam.keyword = this.state.searchKeyword;
    }
    // 请求接口
    _product.getProductList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list : []
      })
      _mm.errorTips(errMsg)
    })
  }
  //搜索
  onSearch(searchType, searchKeyword) {
    // console.log(searchType, searchKeyword)
    let listType = searchKeyword === '' ? 'list' : 'search';
    this.setState({
      listType : listType,
      pageNum : 1,
      searchType : searchType,
      searchKeyword : searchKeyword
    }, ()=>{
      this.loadProductList()
    })
  }
  //页数发生变化的时候
  onPageNumChange(pageNum) {
    this.setState({
      pageNum : pageNum
    }, ()=> {
      this.loadProductList();
    })
  }
  //改变商品状态，上架/下架
  onSetProductStatus(e, productId, currentStatus) {
    let newStatus = currentStatus == 1 ? 2 : 1;
    let confirmTips = currentStatus == 1 ? 'Are you sure to take this item off shelves?' : 'Are you sure to put this item on shelves?';
    if(window.confirm(confirmTips)) {
      _product.setProductStatus({
        productId: productId,
        status: newStatus
      }).then(res => {
        _mm.successTips(res);
        this.loadProductList();
      }, errMsg => {
        _mm.errorTips(res);
      })
    }
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="Item List">
          <div className="page-header-right">
            <Link to="/product/save" className="btn btn-primary">
            <i className="fa fa-plus"></i>
             <span>Ddd Item</span>
            </Link>
          </div>
        </PageTitle>
        <ListSearch onSearch={(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
        <div className="row">
          <div className="col-md-12">
           <table className="table table-striped table-border">
              <thead>
                <tr>
                  <th style={{width:10+ '%'}}>ProductID</th>
                  <th style={{width:50+ '%'}}>ProductInfo</th>
                  <th style={{width:10+ '%'}}>Price</th>
                  <th style={{width:10+ '%'}}>Status</th>
                  <th style={{width:10+ '%'}}>Operate</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.map((product, index)=> {
                    return(
                    <tr key={index}>
                      <td style={{width:10+ '%'}}>{product.id}</td>
                      <td style={{width:50+ '%'}}>
                      <p style={{padding: 0}}>{product.name}</p>
                      <p style={{padding: 0}}>{product.subtitle}</p>
                      </td>
                      <td style={{width:10+ '%'}}>￥{product.price}</td>
                      <td style={{width:10+ '%'}}>
                      <p style={{padding: 0}}>{
                        product.status == 1 ? 'on sale' : 'already off  shelves'
                      }</p>
                      <button
                      className="btn btn-xs btn-warning"
                        onClick={(e)=>{this.onSetProductStatus(e, product.id, product.status)}}
                      >{
                        product.status == 1 ? 'off the shelves' : 'put on the shelves'
                      }</button>
                      </td>
                      <td style={{width:10+ '%'}}>
                        <Link className="opear" to={`/product/detail/${product.id}`}>checkDetail</Link>
                        <Link className="opear" to={`/product/save/${product.id}`}>edit</Link>
                      </td> 
                    </tr>
                    );
                  })
                }
              </tbody>
           </table>
          </div>
        </div>
        <Pagination 
        current={this.state.pageNum} 
        total={this.state.total} 
        onChange={(pageNum)=> {
          this.onPageNumChange(pageNum)
        }}/>
      </div>
    );
  }
}

export default ProductList;