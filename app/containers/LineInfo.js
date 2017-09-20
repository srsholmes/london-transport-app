// @flow
import React, { Component, } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLineInfo } from '../actions';
import LinesList from '../components/LinesList';

class LineInfo extends Component {
  componentDidMount() {
    console.log('LineInfo', this.props);
    const { params } = this.props.navigation.state;
    getLineInfo(params.line.id);
  }

  render() {
    console.log('LineInfo', this.props);
    const { nav } = this.props;
    const { index } = nav;
    const { params } = nav.routes[ index ];

    return (
      <View style={styles.container}>
        <Text>{params.line.name} Line</Text>
        <Text>{params.line.id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flexDirection: 'column',
  },
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ getLineInfo }, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(LineInfo);
