import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from '../containers/Home';
import LineInfo from '../containers/LineInfo';

export const AppNavigator = StackNavigator({
  Home: { screen: Home },
  LineInfo: { screen: LineInfo },
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
});


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

