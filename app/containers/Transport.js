// @flow
import React, { Component, } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hello } from '../actions';

function multiply(n1: number, n2: number): number {
  return n1 * n2;
}

class App extends Component {
  render() {
    const { hello } = this.props.actions;
    console.log('Transport Props')
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Text onPress={hello}>{multiply(2882, 14)}</Text>
        <Text>{this.props.hello}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ hello }, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(App);
