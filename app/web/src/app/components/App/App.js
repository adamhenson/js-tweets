import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tweets from '../../routes/Tweets';
import NotFound from '../../routes/NotFound';

export default props => (
  <div>
    <Switch>
      <Route exact path="/" component={ () => <Tweets {...props} /> } />
      {/* error routes */}
      <Route component={ NotFound } />
    </Switch>
  </div>
)
