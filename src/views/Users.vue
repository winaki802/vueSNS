<template>
 <div class="Home">
    <h1>This is an Users page </h1>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },

  data() {
      return {
          userID : null
      }
  },

  mounted() {
    //if token exist request user info to axios '/user'
    console.log("users mounted");
    //this.$store.dispatch('getUserInfo');
    }  

  }

</script>
