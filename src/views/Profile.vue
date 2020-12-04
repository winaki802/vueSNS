<template>
 <div class="Home">
    <h1>This is an Profile page </h1>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Profile',
  components: {
  },
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  }
}
</script>
