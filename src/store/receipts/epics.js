import { LOAD_RECEIPTS, LOADED_RECEIPTS } from "./types";
import { catchError, map, mapTo, mergeMap } from "rxjs/operators";
import { from, of } from "rxjs";

import { ofType } from "redux-observable";
import { fetchReceipts } from "../../services/receipts";
import { loadedReceipts, loadingReceipts } from "./actions";
import { push } from "react-router-redux";

export const loadingReceiptsEpic = actions => {
  return actions.pipe(
    ofType(LOAD_RECEIPTS),
    map(() => loadingReceipts())
  );
};

export const loadReceiptsEpic = actions => {
  return actions.pipe(
    ofType(LOAD_RECEIPTS),
    mergeMap(({ request }) =>
      from(fetchReceipts(request)).pipe(catchError(() => of([])))
    ),
    map(data => loadedReceipts(data))
  );
};

export const loadedReceiptsEpic = actions => {
  return actions.pipe(ofType(LOADED_RECEIPTS), mapTo(push("/receipts")));
};
