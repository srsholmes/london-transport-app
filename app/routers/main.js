import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Home from '../containers/Home';
import LineInfo from '../containers/LineInfo';

export default (StackNav = StackNavigator({
  Home: { screen: Home },
  LineInfo: { screen: LineInfo }
}, {
  initialRouteName: 'Home',
  headerMode: 'none',
}));
