import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from '../containers/Home';
import LineInfo from '../containers/LineInfo';
import StationInfo from '../containers/StationInfo';

export const AppNavigator = StackNavigator({
  Home: { screen: Home },
  LineInfo: { screen: LineInfo },
  StationInfo: { screen: StationInfo },
}, {
  initialRouteName: 'Home'
});


const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
);

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

