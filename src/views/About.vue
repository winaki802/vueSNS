<template>
 <div class="About">
    <h1>This is an about page </h1>
    Click
    <router-link :to="{name: 'Home'}">
      <h1>Click</h1>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
 

export default {
  name: 'About',
  components: {
  },
  
}
</script>
