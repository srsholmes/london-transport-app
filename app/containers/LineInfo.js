// @flow
import React, { Component, } from 'react';
import { StyleSheet, Text, FlatList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLineInfo, getStations } from '../actions';

const DisruptionInfo = ({ info }) => {
  return info.disruptions.length
    ? (<View>{info.disruptions.map(x => <Text>{x}</Text>)}</View>)
    : (<Text>No Disruptions</Text>);
};

const ListItem = props => {
  const { nav, item, favouriteLine } = props;
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => nav.navigate('StationInfo', { station: item })}>
          <Text style={styles.name}>{item.key}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => nav.navigate('StationInfo', { station: item })}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

class LineInfo extends Component {
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
    const { tflLineInfo, navigation } = this.props;
    const { getStations } = this.props.actions;
    const { stations } = tflLineInfo;
    const hasInfo = Object.keys(tflLineInfo).length;
    const { params } = this.props.navigation.state;
    if (params) {
      return (
        <View style={styles.container}>
          <Text>{params.line.name} Line</Text>
          <Text>{hasInfo && tflLineInfo.lineStatuses[ 0 ].statusSeverityDescription}</Text>
          {
            hasInfo
              ? <DisruptionInfo info={tflLineInfo}/>
              : <ActivityIndicator style={styles.loader}/>
          }
          <TouchableOpacity onPress={() => getStations(params.line.id)} style={styles.button}>
            <Text>Show Stations</Text>
          </TouchableOpacity>
          {
            stations && <FlatList
              data={stations.map(x => ({ key: x.commonName, ...x }))}
              renderItem={x => <ListItem nav={navigation} {...x}/>}
            />
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(LineInfo);
