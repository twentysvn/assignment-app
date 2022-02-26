import {actionInterface} from '../types';
import {authInterface} from '../types/auth';

const initialState: authInterface = {
  token: '',
  username: '',
  phone: '',
  email: '',
};

export const auth = (
  state: authInterface = initialState,
  action: actionInterface,
) => {
  const payload = action.payload;
  switch (action.type) {
    case 'set_auth':
      return {...state, ...payload};
    case 'clear_auth':
      return {...initialState};
    default:
      return state;
  }
};
