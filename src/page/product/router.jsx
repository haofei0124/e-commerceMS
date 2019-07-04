import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import CategoryList from 'page/product/category/index.jsx';

class ProductRouter extends React.Component {
  render() {
    return (
              <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/save/" component={ProductSave} />
                <Route path="/product-category/index/:categoryId?" component={CategoryList} />
                <Redirect exact from="/product" to="/product/index" />             
                <Redirect exact from="/product-category" to="/product-category/index" />             
              </Switch>
    );
  }
}


export default ProductRouter;

