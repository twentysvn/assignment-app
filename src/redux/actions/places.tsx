import {API_KEY} from '@env';
import Axios from 'axios';
import {placesInterfaces} from '../types';

export const setPlaces = query => dispatch => {
  const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}&language=id`;
  Axios.get(URL)
    .then(res => {
      let Data = res.data?.results;
      if (Data.length > 5) Data = Data.slice(0, 5);
      console.log('RESULT', Data);
      dispatch({type: 'set_places', payload: {locations: Data}});
    })
    .catch(e => {
      console.log('err: ', e);
    });
};

export const setRecent = (payload: placesInterfaces) => ({
  type: 'set_recent',
  payload,
});
