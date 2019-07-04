import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';

// import './index.scss';

const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component {
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
    this.loadOrderList();
  }
  loadOrderList() {
    let listParam = {};
    listParam.listType = this.state.listType;
    listParam.pageNum = this.state.pageNum;
    //如果是搜索的话，需要传入搜索类型和搜索关键字
    if(this.state.listType === 'search') {
      listParam.orderNo = this.state.orderNumber;
      // listParam.keyword = this.state.searchKeyword;
    }
    // 请求接口
    _order.getOrderList(listParam).then(res => {
      this.setState(res)
    }, errMsg => {
      this.setState({
        list : []
      })
      _mm.errorTips(errMsg)
    })
  }
  //搜索
  onSearch(orderNumber) {
    // console.log(searchType, searchKeyword)
    let listType = orderNumber === '' ? 'list' : 'search';
    this.setState({
      listType : listType,
      pageNum : 1,
      orderNumber : orderNumber
    }, ()=>{
      this.loadOrderList()
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
  
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="Order List"/>
        <ListSearch onSearch={(orderNumber)=>{this.onSearch(orderNumber)}}/>
        <div className="row">
          <div className="col-md-12">
           <table className="table table-striped table-border">
              <thead>
                <tr>
                  <th style={{width:20+ '%'}}>OrderNumber</th>
                  <th style={{width:15+ '%'}}>Recipient</th>
                  <th style={{width:15+ '%'}}>OrderStatus</th>
                  <th style={{width:15+ '%'}}>TotalPrice</th>
                  <th style={{width:20+ '%'}}>CreateTime</th>
                  <th style={{width:15+ '%'}}>Operate</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.map((order, index)=> {
                    return(
                    <tr key={index}>
                      <td style={{width:20+ '%'}}>
                      <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                      </td>
                      {/* <td style={{width:40+ '%'}}>
                      
                      </td> */}
                      <td style={{width:15+ '%'}}>{order.receiverName}</td>
                      <td style={{width:15+ '%'}}>￥{order.statusDesc}</td>
                      <td style={{width:15+ '%'}}>￥{order.payment}</td>
                      <td style={{width:20+ '%'}}>{order.createTime}</td>
                      <td style={{width:15+ '%'}}>
                        <Link to={`/order/detail/${order.orderNo}`}>detail</Link>
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

export default OrderList;