import {authInterface} from '../types';

export const setAuth = (payload: authInterface) => ({
  type: 'set_auth',
  payload,
});

export const clearAuth = () => ({
  type: 'clear_auth',
  payload: null,
});
