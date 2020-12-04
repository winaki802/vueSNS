<template>
 <div class="Home">
    <h1>This is an UserDetail page </h1>
   <h2>{{userID}}</h2>
  </div>
</template>

<script>
export default {
    computed: {
        userID() {
            return this.$route.params.id
        }
    }
}
</script>