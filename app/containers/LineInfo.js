/* @flow */

import React, { Component, } from 'react';
import { StyleSheet, Text, Button, FlatList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLineInfo, getStations } from '../actions';
import StationsList from '../components/StationsList';
import type { Connector } from 'react-redux';
import type { Dispatch } from '../types/Store';
import type { State } from '../types/State';

type DisruptionProps = {
  info: { disruptions: Array<string> }
}

type Props = {
  actions: {
    getStations: Function,
    fetchLines: Function,
    setInitialFavourites: Function,
    getLineInfo: Function
  },
  tflLines: Array<{ name: string }>,
  item: { id: string, key: string, name: string },
  navigation: { state: { params: { line: { name: string, id: string } } } },
  tflLineInfo: {
    lineStatuses: Array<{ statusSeverityDescription: string }>,
    disruptions: Array<string>,
    stations: Array<any>,
  },
  favouriteLines: Array<string>
}

const DisruptionInfo = ({ info }: DisruptionProps) => {
  return info.disruptions.length
    ? (<View>{info.disruptions.map(x => <Text>{x}</Text>)}</View>)
    : (<Text>No Disruptions</Text>);
};

class LineInfo extends Component<void, Props, void> {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.line.key} Line`,
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.actions.getLineInfo(params.line.id);
  }

  render() {
    const { tflLineInfo } = this.props;
    const hasInfo = Object.keys(tflLineInfo).length;
    const { params } = this.props.navigation.state;
    if (params) {
      return (
        <View style={styles.container}>
          {
            hasInfo
            ? <Text style={styles.heading}>{`Current service: ${tflLineInfo.lineStatuses[ 0 ].statusSeverityDescription}`}</Text>
            : <ActivityIndicator style={styles.loader}/>
          }
          {
            hasInfo
              ? <DisruptionInfo info={tflLineInfo}/>
              : <ActivityIndicator style={styles.loader}/>
          }
          <StationsList { ...this.props}/>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  stationList: {},
  heading: {
    fontSize: 25,
  },
  container: {
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'column',
  },
  listItemContainer: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 44,
  },
  left: {
    paddingTop: 5,
    flexDirection: 'row',
    flex: 9,
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
    height: 50,
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    height: 50,
    padding: 20,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({
    getLineInfo,
    getStations,
  }, dispatch),
});

const mapStateToProps = (state: State) => ({ ...state });

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default connector(LineInfo);

