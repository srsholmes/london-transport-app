import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';


const ListItem = props => {
  const { nav } = props;
  return (
    <TouchableOpacity onPress={() => nav.navigate('LineInfo', { line: props.item })}>
      <Text style={styles.item}>{props.item.key}</Text>
    </TouchableOpacity>
  );
};


const LinesList = (props) => {
  console.log({ props });
  return (
    <View>
      <FlatList
        data={props.tflLines.map(x => ({ key: x.name, ...x }))}
        renderItem={x => <ListItem {...x} nav={props.navigation}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'left',
  },
});

export default LinesList;
