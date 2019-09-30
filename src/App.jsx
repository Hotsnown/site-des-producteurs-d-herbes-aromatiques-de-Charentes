import 'babel-polyfill';
import React from 'react';

import Header from './Header.jsx';

const App = (props) => (
  <div>
    <Header />
    <div className="container-fluid">
      {props.children}
      <hr />
      <h5><small>
         **** Contacter deboissy.pierre@gmail.com pour toute information ****
      </small></h5>
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

export default App;
