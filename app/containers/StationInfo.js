// @flow
import React, { Component, } from 'react';
import { StyleSheet, Text, FlatList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLineInfo, getStations } from '../actions';

class StationInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.station.commonName,
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log('CDM');
  }

  render() {
    const { params } = this.props.navigation.state;
    const { station } = params;
    if (params) {
      return (
        <View style={styles.container}>
          <Text>{station.commonName}</Text>
          <Text>{station.lat}</Text>
          <Text>{station.lon}</Text>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flexDirection: 'column',
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
  },
  right: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  item: {
    padding: 10,
    height: 44,
    textAlign: 'left',
  },
  loader: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    height: 50,
    padding: 20,
  },
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ getLineInfo, getStations }, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(StationInfo);
