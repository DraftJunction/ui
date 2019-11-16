import { useCallback } from "react";
import { withRouter } from "react-router";
import { isRouteMatched, navigateToRoute } from "../services/routes";

export default withRouter(
  ({ children, history, replace, exact, strict, location, to }) => {
    const onClickHandler = useCallback(
      e => {
        e.preventDefault();
        navigateToRoute({ to, location, history, replace });
      },
      [to, location, history, replace]
    );

    return children({
      onClick: onClickHandler,
      active: isRouteMatched({ to, location, exact, strict })
    });
  }
);
