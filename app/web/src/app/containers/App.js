import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import App from '../components/App';
import * as Actions from '../actions';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
