/* @flow */

import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { tflColors } from '../themes';

type ListItemProps = {
  nav: { navigate: Function },
  item: { id: string, key: string, name: string },
  favouriteLine: Function,
  favouriteLines: Array<string>
}

type LinesListProps = {
  tflLines: Array<{ name: string }>,
  item: { id: string, key: string, name: string },
  navigation: {},
  favouriteLines: Array<string>,
  actions: { favouriteLine: Function }
}

const ListItem = (props: ListItemProps) => {
  const { nav, item, favouriteLine, favouriteLines } = props;
  return (
    <View style={styles.listItemContainer}>
      <View style={{ width: 20, height: 45, backgroundColor: tflColors[ item.id ] }}/>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => nav.navigate('LineInfo', { line: props.item })}>
          <Text style={styles.name}>{item.key}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => favouriteLine(item.key)}>
          <Icon name="star" size={25} color={favouriteLines.includes(item.name) ? '#ffe100' : '#727272'}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => nav.navigate('LineInfo', { line: item })}>
          <Icon name="chevron-small-right" size={30} color="#727272"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LinesList = (props: LinesListProps) => {
  const { favouriteLines, tflLines, navigation } = props;
  const lines = [
    ...favouriteLines.sort().map(x => tflLines.find(y => y.name === x)),
    ...tflLines.filter(x => favouriteLines.includes(x.name) === false)
  ];
  return (
    <View>
      <FlatList
        data={lines.map(x => ({ key: x.name, ...x }))}
        ItemSeparatorComponent={() => (<View style={{ height: 1, width: '100%', backgroundColor: '#CED0CE' }}/>)}
        renderItem={x =>
          <ListItem
            {...x}
            favouriteLines={favouriteLines}
            favouriteLine={props.actions.favouriteLine}
            nav={navigation}
          />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
  },
  left: {
    flexDirection: 'row',
    flex: 2,
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
  name: {
    flex: 2,
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'left',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: 10,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: Platform.OS === 'android' ? 7 : 5,
  },
});

export default LinesList;
