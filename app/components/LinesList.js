import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const ListItem = props => {
  console.log(props);
  const { nav } = props;
  return (
    <View onPress={() => nav.navigate('LineInfo')}>
      <Text style={styles.item}>{props.item.key}</Text>
    </View>
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
