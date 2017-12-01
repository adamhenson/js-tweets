import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Tweets from '../../routes/Tweets';
import NotFound from '../../routes/NotFound';

class App extends Component {
  componentDidMount() {
    // if we had users we could check if there logged in at this point
    // and handle accordingly.
  }

  render() {
    const { props } = this;
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Tweets} />
          {/* error routes */}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
