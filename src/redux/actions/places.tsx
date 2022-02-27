import {API_KEY} from '@env';
import Axios from 'axios';
import {Alert} from 'react-native';

export const setPlaces = query => dispatch => {
  const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}&language=en`;
  Axios.get(URL)
    .then(res => {
      let Data = res.data?.results;
      dispatch({type: 'set_places', payload: {locations: Data}});
    })
    .catch(e => {
      Alert.alert('Error', e);
    });
};
