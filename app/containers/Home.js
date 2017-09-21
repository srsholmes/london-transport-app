/* @flow */
import React, { Component, } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLines, favouriteLine, setInitialFavourites } from '../actions';
import LinesList from '../components/LinesList';

import type { Connector } from 'react-redux';
import type { Dispatch } from '../types/Store';
import type { State } from '../types/State';

type Props = {
  actions: {
    favouriteLine: Function,
    fetchLines: Function,
    setInitialFavourites: Function,
  },
  tflLines: Array<{ name: string }>,
  item: { id: string, key: string, name: string },
  navigation: {},
  favouriteLines: Array<string>
}


class App extends Component<void, Props, void> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'London Transport App',
    };
  };

  componentDidMount() {
    const { fetchLines } = this.props.actions;
    fetchLines();
  }

  render() {
    const { tflLines } = this.props;
    return (
      <View style={styles.container}>
        {
          tflLines.length
            ? <LinesList {...this.props}/>
            : <ActivityIndicator style={styles.loader}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  loader: {
    paddingTop: 20,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    fetchLines,
    favouriteLine,
    setInitialFavourites,
  }, dispatch),
});

const mapStateToProps = (state: State) => ({ ...state });

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(App);
