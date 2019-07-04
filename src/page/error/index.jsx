import React from 'react';

import PageTitle from 'component/page-title/index.jsx';

import { Link } from 'react-router-dom'

class Error extends React.Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="error!" />
        <div className="row">
          <div className="col-md-12">
            <span>can not find path </span>
            <Link to="/">click back to homePage</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;