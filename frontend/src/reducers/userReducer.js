import {
  EMAIL_RESET,
  EMAIL_SEND_FAIL,
  EMAIL_SEND_REQUEST,
  EMAIL_SEND_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
} from '../types/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }

    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_REGISTER_RESET:
      return {}

    default:
      return state
  }
}

//for sending email to the seller

export const emailReducer = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_SEND_REQUEST:
      return {
        loading: true,
      }

    case EMAIL_SEND_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      }
    case EMAIL_SEND_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case EMAIL_RESET:
      return {}
    default:
      return state
  }
}
