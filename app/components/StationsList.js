/* @flow */

import React from 'react';
import { StyleSheet, Platform, Text, Button, FlatList, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

type ListItemProps = {
  nav: { navigate: Function },
  item: { key: string }
}

type LinesListProps = {
  tflLineInfo: {
    lineStatuses: Array<{ statusSeverityDescription: string }>,
    disruptions: Array<string>,
    stations: Array<any>,
  },
  tflLines: Array<{ name: string }>,
  item: { id: string, key: string, name: string },
  navigation: { state: { params: { line: { id: string }} } },
  favouriteLines: Array<string>,
  actions: {
    getStations: Function
  }
}

const ListItem = (props: ListItemProps) => {
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

const StationsList = (props: LinesListProps) => {
  const { tflLineInfo, navigation } = props;
  const { getStations } = props.actions;
  const { stations } = tflLineInfo;
  const { params } = props.navigation.state;
  return (
    <View>
      {stations
        ?
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, width: '100%', backgroundColor: '#CED0CE' }}/>)}
          data={stations.map(x => ({ key: x.commonName, ...x }))}
          style={styles.stationList}
          renderItem={x => <ListItem containerStyle={{ borderBottomWidth: 0 }} nav={navigation} {...x}/>}
        />
        :
        <Button
          onPress={() => getStations(params.line.id)}
          style={styles.button}
          title={`Show ${params.line.name} Line Stations`}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      }
    </View>
  );
};

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

export default StationsList;
