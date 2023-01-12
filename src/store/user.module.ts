export default {
  namespaced: true,
  state: {
    firstName: 'John',
    lastName: 'Doe'
  },
  getters: {
    fullName: function (state: any) {
      return `${state.firstName} ${state.lastName}`
    }
  }
}
