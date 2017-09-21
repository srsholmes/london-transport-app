import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';


const ListItem = props => {
  console.log(props);
  const { nav, item, favouriteLine } = props;
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => nav.navigate('LineInfo', { line: props.item })}>
          <Text style={styles.name}>{item.key}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => favouriteLine(item.key)}>
          <Text>Fave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => nav.navigate('LineInfo', { line: item })}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const sortFaves = faves => (a, b) => {
  if (faves.includes(a.name)) return -1;
  if (faves.includes(a.name) && faves.includes(b.name)) return 0;
  return 1;
};

const LinesList = (props) => {
  const { favouriteLines } = props;
  // Get other lines, then concat the other onto the fave
  return (
    <View>
      <FlatList
        data={props.tflLines.sort(sortFaves(favouriteLines)).map(x => ({ key: x.name, ...x }))}
        renderItem={x => <ListItem {...x} favouriteLine={props.actions.favouriteLine} nav={props.navigation}/>}
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
    backgroundColor: 'green',
    width: 37,
    height: 37,
    borderRadius: 18,
    marginRight: 12,
    paddingTop: Platform.OS === 'android' ? 7 : 5,
  },
});

export default LinesList;
