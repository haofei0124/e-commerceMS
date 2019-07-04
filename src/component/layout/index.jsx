import React from 'react';

import NavTop from 'component/nav-top/index.jsx';
import NavSide from 'component/nav-side/index.jsx';

import './theme.css';
import './index.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div id="wrapper">
      {/* test layout */}
        <NavTop />
        <NavSide />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;