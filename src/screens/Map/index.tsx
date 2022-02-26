import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setPlaces, setRecent} from '../../redux/actions/places';
import MapView, {Marker} from 'react-native-maps';

const Index = () => {
  const [Query, setQuery] = useState('');
  const [MarkerData, setMarkerData] = useState({
    lat: 0,
    lng: 0,
    desc: '',
    title: '',
  });
  const {locations, recent} = useSelector(state => state.places);
  const dispatch = useDispatch();

  const onChange = query => {
    setQuery(query);
    dispatch(setPlaces(query));
  };

  const onPress = item => {
    let pushed = recent;
    if (pushed.length >= 5) {
      pushed = pushed.slice(Math.max(pushed.length - 4, 1));
    }
    pushed.push(item);
    dispatch(setRecent(pushed));
    console.log('ITEM', item);

    let {formatted_address, geometry} = item;
    setMarkerData({
      title: 'Location',
      desc: formatted_address,
      lat: geometry.location.lat,
      lng: geometry.location.lng,
    });
    setQuery('');
  };

  const Row = ({data}) => {
    let {formatted_address} = data;
    return (
      <Pressable
        onPress={() => onPress(data)}
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginBottom: 5,
          elevation: 4,
        }}>
        <Text style={{color: 'black'}}>{formatted_address}</Text>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {MarkerData.lat && MarkerData.lng && (
            <Marker
              key={1}
              coordinate={{latitude: MarkerData.lat, longitude: MarkerData.lng}}
              title={MarkerData.title}
              description={MarkerData.desc}
            />
          )}
        </MapView>
      </View>
      <View style={{position: 'absolute', width: '100%', height: '100%'}}>
        <TextInput label="Search" value={Query} onChangeText={onChange} />
        {Query.length > 1 && (
          <ScrollView>
            {recent.map(item => {
              return <Row data={item} />;
            })}
            {locations.map(item => {
              return <Row data={item} />;
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Index;
