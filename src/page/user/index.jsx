import React from 'react';
import { Link } from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx'


const _mm = new MUtil;
const _user = new User();

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list : [],
      pageNum : 1
    }
  } 
  componentDidMount() {
    this.loadUserList();
  }
  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => {
      this.setState(res)
    }, errMsg => {
      _mm.errorTips(errMsg)
    })
  }
  //页数发生变化的时候
  onPageNumChange(pageNum) {
    this.setState({
      pageNum : pageNum
    }, ()=> {
      this.loadUserList();
    })
  }
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="User List" />
        <div className="row">
          <div className="col-md-12">
           <table className="table table-striped table-border">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Mailbox</th>
                  <th>Telphone</th>
                  <th>RegisterTime</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.list.map((user, index)=> {
                    return(
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{new Date(user.createTime).toLocaleString()}</td> 
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

export default UserList;