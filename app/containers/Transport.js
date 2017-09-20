// @flow
import React, { Component, } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLines } from '../actions';
import LinesList from '../components/LinesList';

class App extends Component {
  componentDidMount() {
    const { fetchLines } = this.props.actions;
    fetchLines();
  }

  render() {
    const { tflLines } = this.props;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>{this.props.hello}</Text>
        {
          tflLines.length
            ? <LinesList {...this.props}/>
            : <ActivityIndicator/>
        }
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

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchLines }, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(App);
