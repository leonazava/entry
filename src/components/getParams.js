import { matchPath } from "react-router-dom";

export default function getParams(pathname, path) {
  return matchPath(pathname, { path: path }).params;
}
