export const handleShow = (show = "") => ({
  type: "HANDLE_SHOW",
  payload: show
});

export const setLoading = () => {
  return {
    type: "SET_LOADING"
  };
};
