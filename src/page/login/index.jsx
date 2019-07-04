import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

import './index.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }
  componentWillMount() {
    document.title = 'Login';
  }

  onUsernameChange(e) {
    
    this.setState({
      username: e.target.value
    })
  }

  onPasswordChange(e) {
    
    this.setState({
      password: e.target.value
    })
  }

  onInputKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSubmit()
    }
  }

  // onInputChage(e) {
  //   let inputValue = e.target.value
  //   let inputName = e.target.name
  //   this.setState({
  //     [inputName]: inputValue
  //   })
  // }

  // 当用户提交表单
  onSubmit() {
    let loginInfo = {
      username: this.state.username,
      password: this.state.password
    }
    let checkResult = _user.checkLoginInfo(loginInfo);
    //验证通过
    if(checkResult.status) {
      _user.login(loginInfo).then((res)=> {
        _mm.setStorage('userInfo', res);
        // console.log(this.state.redirect)
        this.props.history.push(this.state.redirect)
      }, (errMsg)=> {
        _mm.errorTips(errMsg);
      })
    }
    //验证不通过
    else {
      _mm.errorTips(checkResult.msg);
    }
   
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">Login — MS</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                {/* <label htmlFor="exampleInputEmail1">用户名</label> */}
                <input type="text"
                  name="username"
                  className="form-control"
                  placeholder="username"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onUsernameChange(e)}
                />
              </div>
              <div className="form-group">
                {/* <label HtmlFor="exampleInputPassword1">密码</label> */}
                <input type="password"
                  name="passwrord"
                  className="form-control"
                  placeholder="password"
                  onKeyUp={e => this.onInputKeyUp(e)}
                  onChange={e => this.onPasswordChange(e)}
                />
              </div>
              <button 
                className="btn btn-lg btn-primary btn-block"
                onClick={e => { this.onSubmit(e) }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;