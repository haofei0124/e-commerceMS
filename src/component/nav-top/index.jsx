import React from 'react';
import { Link } from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class NavTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        username: _mm.getStorage('userInfo').username || ''
    }
  }
  onLogout() {
    _user.logout().then(res => {
        _mm.removeStorage('userInfo');
        window.location.href = '/login'
    }, errMsg => {
        _mm.errorTips(errMsg);
    })
  }
  render() {
    return(
      <div className="navbar navbar-default top-navbar" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/" style={{marginTop:10}}><b>MMALL</b>MS</Link>
            </div>

            <ul className="nav navbar-top-links navbar-right">
                
                <li className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:;" style={{marginTop: 10}}>
                        <i className="fa fa-tasks fa-fw"></i> 
                        {
                            this.state.username
                            ? <span>welcome, {this.state.username}</span>
                            : <span>welcome</span>
                        }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-tasks">
                        <li>
                            <a className="text-center" onClick={()=>{this.onLogout()}}>
                            <i className="fa fa-sign-out fa-fw"/>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                    
                </li>
                
            </ul>
        </div>
    );
  }
}

export default NavTop;