import { LOAD_RECEIPTS } from "./types";
import { from, of } from "rxjs";
import { map, merge, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";
import { fetchReceipts } from "../../services/receipts";
import { loadedReceipts, loadingReceipts } from "./actions";

export const loadReceiptsEpic = actions => {
  debugger;
  return actions.pipe(
    ofType(LOAD_RECEIPTS),
    mergeMap(({ request }) => {
      return merge(
        of(loadingReceipts()),
        from(fetchReceipts(request)).pipe(map(data => loadedReceipts(data)))
      );
    })
  );
};
