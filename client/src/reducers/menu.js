const menuDefault = {
  show: "",
  loading: false
};

export default (state = menuDefault, action) => {
  const { payload } = action;
  switch (action.type) {
    case "HANDLE_SHOW":
      return {
        ...state,
        show: payload
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
};
