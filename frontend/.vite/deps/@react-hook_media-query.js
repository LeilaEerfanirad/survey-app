import {
  require_react
} from "./chunk-URNRBCZE.js";
import {
  __toESM
} from "./chunk-LNEMQRCO.js";

// node_modules/@react-hook/media-query/dist/module/index.js
var React = __toESM(require_react());
function queriesDidChange(prevQueries, nextQueries) {
  if (nextQueries === prevQueries)
    return false;
  const nextQueriesArr = Object.values(nextQueries);
  const prevQueriesArr = Object.values(prevQueries);
  if (nextQueriesArr.length !== prevQueriesArr.length)
    return true;
  if (nextQueriesArr.some((q, i) => q !== prevQueriesArr[i]))
    return true;
  const prevKeys = Object.keys(prevQueries);
  return Object.keys(nextQueries).some((n, i) => n !== prevKeys[i]);
}
function _ref(curr, key) {
  curr.matches[key] = false;
  curr.mediaQueries[key] = {};
  return curr;
}
function init(queries) {
  const queryKeys = Object.keys(queries);
  if (typeof window === "undefined")
    return queryKeys.reduce(_ref, {
      mediaQueries: {},
      matches: {}
    });
  return queryKeys.reduce((state, name) => {
    const mql = window.matchMedia(queries[name]);
    state.mediaQueries[name] = mql;
    state.matches[name] = mql.matches;
    return state;
  }, {
    mediaQueries: {},
    matches: {}
  });
}
function reducer(state, action) {
  function _ref2(prev, key) {
    prev[key] = state.mediaQueries[key].matches;
    return prev;
  }
  switch (action.type) {
    case "updateMatches":
      return {
        matches: Object.keys(state.mediaQueries).reduce(_ref2, {}),
        mediaQueries: state.mediaQueries
      };
    case "setQueries":
      return init(action.queries);
  }
}
function useMediaQueries(queryMap) {
  const prevQueries = React.useRef(queryMap);
  const [state, dispatch] = React.useReducer(reducer, queryMap, init);
  React.useEffect(() => {
    if (queriesDidChange(queryMap, prevQueries.current)) {
      dispatch({
        type: "setQueries",
        queries: queryMap
      });
      prevQueries.current = queryMap;
    }
  }, [queryMap]);
  function _ref3() {
    return dispatch({
      type: "updateMatches"
    });
  }
  function _ref4(mq) {
    const callback = _ref3;
    if (typeof mq.addListener !== "undefined")
      mq.addListener(callback);
    else
      mq.addEventListener("change", callback);
    return callback;
  }
  React.useEffect(() => {
    const queries = Object.values(state.mediaQueries);
    const callbacks = queries.map(_ref4);
    function _ref5(mq, i) {
      if (typeof mq.addListener !== "undefined")
        mq.removeListener(callbacks[i]);
      else
        mq.removeEventListener("change", callbacks[i]);
    }
    return () => {
      queries.forEach(_ref5);
    };
  }, [state.mediaQueries]);
  const {
    matches
  } = state;
  const matchValues = React.useMemo(() => Object.values(matches), [matches]);
  return {
    matches,
    matchesAny: matchValues.some(Boolean),
    matchesAll: matchValues.length > 0 && matchValues.every(Boolean)
  };
}
function useMediaQuery(query) {
  return useMediaQueries(getObj(query)).matchesAll;
}
var cache = {};
function getObj(query) {
  if (cache[query] === void 0)
    cache[query] = {
      default: query
    };
  return cache[query];
}
export {
  useMediaQueries,
  useMediaQuery
};
//# sourceMappingURL=@react-hook_media-query.js.map
