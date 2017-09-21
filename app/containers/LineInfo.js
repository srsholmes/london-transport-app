// @flow
import React, { Component, } from 'react';
import { StyleSheet, Text, Button, FlatList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLineInfo, getStations } from '../actions';
import Icon from 'react-native-vector-icons/Entypo';

const DisruptionInfo = ({ info }) => {
  return info.disruptions.length
    ? (<View>{info.disruptions.map(x => <Text>{x}</Text>)}</View>)
    : (<Text>No Disruptions</Text>);
};

const ListItem = props => {
  const { nav, item } = props;
  return (
    <TouchableOpacity onPress={() => nav.navigate('StationInfo', { station: item })}>
      <View style={styles.listItemContainer}>
        <View style={styles.left}>
          <Text style={styles.name}>{item.key}</Text>
        </View>
        <View style={styles.right}>
          <Icon name="chevron-small-right" size={30} color="#727272"/>
        </View>
      </View>
    </TouchableOpacity>
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
          <Text
            style={styles.heading}>{`Current service: ${hasInfo && tflLineInfo.lineStatuses[ 0 ].statusSeverityDescription}`}</Text>
          {
            hasInfo
              ? <DisruptionInfo info={tflLineInfo}/>
              : <ActivityIndicator style={styles.loader}/>
          }
          {
            stations ?
              <FlatList
                ItemSeparatorComponent={() => (
                  <View style={{ height: 1, width: '100%', backgroundColor: '#CED0CE' }}/>)}
                data={stations.map(x => ({ key: x.commonName, ...x }))}
                style={styles.stationList}
                renderItem={x => <ListItem containerStyle={{ borderBottomWidth: 0 }} nav={navigation} {...x}/>}
              />
              : <Button
                onPress={() => getStations(params.line.id)}
                style={styles.button}
                title={`Show ${params.line.name} Line Stations`}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
          }
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

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ getLineInfo, getStations }, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(LineInfo);
