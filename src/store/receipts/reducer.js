import { LOAD_RECEIPTS, LOADED_RECEIPTS } from "./types";

const initialState = {
  data: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADED_RECEIPTS:
      return {
        ...state,
        loading: false,
        data: action.receipts
      };
    case LOAD_RECEIPTS: {
      return {
        ...state,
        loading: true
      };
    }

    default:
      return state;
  }
};
