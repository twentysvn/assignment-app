import {actionInterface} from '../types';
import {placesInterfaces} from '../types/places';

const initialState: placesInterfaces = {
  locations: [],
};

export const places = (
  state: placesInterfaces = initialState,
  action: actionInterface,
) => {
  const payload = action.payload;
  switch (action.type) {
    case 'set_places':
      return {...state, ...payload};
    case 'clear_places':
      return {...initialState};
    default:
      return state;
  }
};
