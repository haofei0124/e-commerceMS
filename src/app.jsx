import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import Home from 'page/home/index.jsx';
import ProductRouter from 'page/product/router.jsx';
import Layout from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';
import OrderList from 'page/order/index.jsx'
import UserList from 'page/user/index.jsx'
import ErrorPage from 'page/error/index.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" render={props => (
            // 无论什么路径到这里都会匹配到，所以它会进入到这里面
            <Layout>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/product" component={ProductRouter} />
                <Route path="/product-category" component={ProductRouter} />
                <Route path="/order/index" component={OrderList} />
                <Route path="/user/index" component={UserList} />
                <Redirect exact from="/order" to="/order/index"/>
                <Redirect exact from="/user" to="/user/index"/>
                <Route component={ErrorPage}/> 
                {/* 能走到这儿就说明前面的path都没匹配到 */}
              </Switch>
            </Layout>
          )} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

