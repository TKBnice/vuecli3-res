const getters = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,

  msg : state => state.user.msg,
  userData : state => state.user.userData,
  isCollapse : state => state.user.isCollapse,
  chartTheme : state => state.user.chartTheme,
  token: state => state.user.token,
  permission_routers: state => state.user.routers,
  addRouters:state => state.user.addRouters,
  visitedviews:state => state.user.visitedviews
}
export default getters




