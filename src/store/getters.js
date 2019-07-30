const getters = {
  name: state => state.user.name,
  roles: state => state.user.roles,
  isCollapse: state => state.StoreGlobal.isCollapse
}
export default getters
