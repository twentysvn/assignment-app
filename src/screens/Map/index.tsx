import {View, Text, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setPlaces, setRecent} from '../../redux/actions/places';
import MapView from 'react-native-maps';

const Index = () => {
  const [Query, setQuery] = useState('');
  const {locations} = useSelector(state => state.places);
  const {recent} = useSelector(state => state.places);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

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
  };

  const Row = ({data}) => {
    let {formatted_address, geometry} = data;
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
          }}
        />
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
