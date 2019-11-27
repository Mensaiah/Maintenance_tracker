const requestDefault = {
  pending: [],
  approved: [],
  disapproved: [],
  resolved: []
};

export default (state = requestDefault, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_REQUESTS":
      return {
        ...state,
        pending: payload.filter(
          data => data.request_status.toLowerCase() === "pending" && data
        ),
        approved: payload.filter(
          data => data.request_status.toLowerCase() === "approved" && data
        ),
        disapproved: payload.filter(
          data => data.request_status.toLowerCase() === "disapproved" && data
        ),
        resolved: payload.filter(
          data => data.request_status.toLowerCase() === "approved" && data
        )
      };
    default:
      return state;
  }
};
