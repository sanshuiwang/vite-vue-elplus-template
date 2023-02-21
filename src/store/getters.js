const getters = {
  userName: (state) => state.user.userName,
  roles: () => ['canShowAdd', 'canDel'],
}

export default getters
