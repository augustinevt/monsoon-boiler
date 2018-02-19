const main = (state = {...state, users: {loading: true, users: []}}, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      const { users } = action.payload;
      return {...state, users: {users, loading: false}};
    default:
      return state;
  }
};

export default main;
