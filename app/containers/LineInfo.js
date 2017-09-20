// @flow
import React, { Component, } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLines } from '../actions';
import LinesList from '../components/LinesList';

class LineInfo extends Component {
  componentDidMount() {
    console.log('Get line ifno ');
  }

  render() {
    const { tflLines } = this.props;
    return (
      <View style={styles.container}>
        <Text>Line Info Page</Text>
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

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchLines }, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(LineInfo);
