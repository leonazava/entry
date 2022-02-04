import { matchPath } from "react-router-dom";

//   getParams() {
//     let { category } = matchPath(this.props.history.location.pathname, {
//       path: this.props.match.path,
//     }).params;
//     return category;
//   }

export default function getParams(pathname, path) {
  return matchPath(pathname, { path: path }).params;
}
