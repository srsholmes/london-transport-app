import React, { Component, } from 'react';
import { StyleSheet, Text, View, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLineInfo, getStations } from '../actions';
import MapView from 'react-native-maps';

class StationInfo extends Component {
  state = {
    loaded: false,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.station.commonName,
    };
  };

  componentDidMount() {
    // Wait till scene transitioned before showing map for performance.
    InteractionManager.runAfterInteractions(() => this.setState({ loaded: true }));
  }

  render() {
    const { params } = this.props.navigation.state;
    const { station } = params;
    if (params) {
      return (
        <View style={styles.container}>
          {
            station.lat && station.lon && this.state.loaded
              ? <MapView
                style={styles.map}
                initialRegion={{
                  latitude: station.lat,
                  longitude: station.lon,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <MapView.Marker
                  coordinate={{ latitude: station.lat, longitude: station.lon }}
                  title={station.commonName}
                />
              </MapView>
              : <Text>Sorry, the station location currently is unavailable.</Text>
          }
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ getLineInfo, getStations }, dispatch) });
const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, mapDispatchToProps)(StationInfo);
