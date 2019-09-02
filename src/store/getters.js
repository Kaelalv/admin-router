const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routers: state => state.myRouter.routers
};

export default getters;
