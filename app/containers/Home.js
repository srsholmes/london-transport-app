import React, { Component, } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLines, favouriteLine, setInitialFavourites } from '../actions';
import LinesList from '../components/LinesList';


class App extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'London Transport App',
    };
  };

  componentDidMount() {
    const { fetchLines } = this.props.actions;
    fetchLines();
  }

  render() {
    const { tflLines } = this.props;
    console.log({ tflLines });
    return (
      <View style={styles.container}>
        {
          tflLines.length
            ? <LinesList {...this.props}/>
            : <ActivityIndicator style={styles.loader}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  loader: {
    paddingTop: 20,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchLines,
    favouriteLine,
    setInitialFavourites,
  }, dispatch),
});

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(App);
