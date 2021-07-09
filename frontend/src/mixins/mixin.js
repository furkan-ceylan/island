export const checkAuth = {
  computed() {
    this.auth = localStorage.getItem('token')
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login')
    }
  },
}
