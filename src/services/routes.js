import { matchPath, useLocation } from "react-router";
import { createLocation } from "history";

export const resolveToLocation = (to, currentLocation) =>
  typeof to === "function" ? to(currentLocation) : to;

export const normalizeToLocation = (to, currentLocation) => {
  return typeof to === "string"
    ? createLocation(to, null, null, currentLocation)
    : to;
};

export const matchRoute = ({ to, location, exact, strict }) => {
  const toLocation = normalizeToLocation(
    resolveToLocation(to, location),
    location
  );
  const { pathname: path } = toLocation;
  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  return matchPath(location.pathname, {
    path: escapedPath,
    exact,
    strict
  });
};

export const isRouteMatched = ({ to, location, exact, strict }) =>
  !!matchRoute({ to, location, exact, strict });

export const navigateToRoute = ({ to, location, history, replace = false }) => {
  const _location = resolveToLocation(to, location);
  const method = replace ? history.replace : history.push;
  method(_location);
};

export const pathWithoutTrailing = url =>
  url.endsWith("/")
    ? pathWithoutTrailing(url.substring(0, url.length - 1))
    : url;
