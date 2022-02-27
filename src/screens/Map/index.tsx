import React, {useState, useEffect} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  BackHandler,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {CamOptions} from '../../helper';
import {setPlaces} from '../../redux/actions/places';

const Index = () => {
  const [Query, setQuery] = useState('');
  const [MarkerData, setMarkerData] = useState({
    lat: 0,
    lng: 0,
    desc: '',
    title: '',
  });
  const [Camera, setCamera] = useState({
    ...CamOptions,
    center: {
      latitude: -7.743651,
      longitude: 110.396118,
    },
  });
  const {locations} = useSelector(state => state.places);

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      onChange('');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const onChange = query => {
    setQuery(query);
    dispatch(setPlaces(query));
  };

  const onPress = item => {
    let {formatted_address, geometry} = item;
    setMarkerData({
      title: 'Location',
      desc: formatted_address,
      lat: geometry.location.lat,
      lng: geometry.location.lng,
    });
    setCamera({
      ...CamOptions,
      center: {
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
      },
    });
    setQuery('');
  };

  const Row = ({data}) => {
    let {formatted_address, icon, name, icon_background_color} = data;
    return (
      <Pressable
        onPress={() => onPress(data)}
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginBottom: 5,
          elevation: 4,
          flexDirection: 'row',
        }}>
        <View style={{width: 35, height: 35, marginRight: 10}}>
          <Image
            source={{uri: icon ?? null}}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>
        <View style={{width: '85%'}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: icon_background_color ?? 'blank',
            }}>
            {name}
          </Text>
          <Text style={{color: 'black'}}>{formatted_address}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}} camera={Camera}>
          {MarkerData.lat != 0 && MarkerData.lng != 0 && (
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
        <TextInput
          label="Search location"
          value={Query}
          onChangeText={onChange}
        />
        {Query.length > 1 && (
          <ScrollView>
            {locations.map((item, index) => {
              return <Row data={item} key={index} />;
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Index;
