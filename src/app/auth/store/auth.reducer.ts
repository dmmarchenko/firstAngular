import { User } from '../user.model';
import { AuthActions, LOGIN, LOGIN_FAIL, LOGIN_START, LOGOUT } from './auth.actions';

export interface AuthState {
  user: User,
  authError: string,
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGIN:
      return {...state, user: action.payload, authError: null, loading: false};
    case LOGOUT:
      return {...state, user: null};
    case LOGIN_START:
      return {...state, authError: null, loading: true};
    case LOGIN_FAIL:
      return {...state, user: null, authError: action.payload, loading: false};
    default:
      return state;
  }
}
