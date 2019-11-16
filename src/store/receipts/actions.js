import { LOAD_RECEIPTS, LOADED_RECEIPTS, LOADING_RECEIPTS } from "./types";

export const loadReceipts = request => ({
  type: LOAD_RECEIPTS,
  request
});

export const loadingReceipts = () => ({
  type: LOADING_RECEIPTS
});

export const loadedReceipts = receipts => ({
  type: LOADED_RECEIPTS,
  receipts
});
