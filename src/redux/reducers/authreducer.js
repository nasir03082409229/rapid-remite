import * as types from "../types";

const initialState = {
  user: false,
  countries: false,
  country_selected: false,
  partners_results: false,
  slider: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.auth.AUTHENTICATED: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case types.auth.SKIP_SLIDER: {
      return {
        ...state,
        slider: action.payload,
      };
    }
    case types.flags.COUNTRIES: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case types.flags.SELECTED_FLAG: {
      return {
        ...state,
        country_selected: action.payload,
      };
    }
    case types.conversion.CONVERSION_PATNERS: {
      return {
        ...state,
        partners_results: action.payload,
      };
    }
    default:
      return state;
  }
}
