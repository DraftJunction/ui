import { LOAD_RECEIPTS, LOADED_RECEIPTS } from "./types";

const initialState = {
  loaded: null,
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADED_RECEIPTS:
      return {
        ...state,
        isLoading: false,
        loaded: action.value
      };
    case LOAD_RECEIPTS: {
      return {
        ...state,
        isLoading: true
      };
    }

    default:
      return state;
  }
};
