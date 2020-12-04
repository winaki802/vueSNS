<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link" 
        >
          <h2>{{ link }} </h2>
        </v-tab>
      </v-tabs>

      <h6 v-if="isLogin">
        {{userInfo.name}} {{userInfo.userid}}
      </h6>
    
      <v-btn 
        x-small
        color="secondary"
        flat v-if="isLogin"
        @click="$store.dispatch('logout')"
      >Logout</v-btn>
      <v-btn
        small
        v-else
        color="primary"
        class="ma-2 white--text"      
        router :to="{name: 'Login'}"
      >
        Login
        <v-icon
          right
          dark
        >
          mdi-login
        </v-icon>
      </v-btn>

      
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!--  -->
             <v-bottom-navigation >
              <v-btn value="Home" @click="$router.push({name: 'Home'})" >
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
              </v-btn>
              <v-btn value="OutdoorScrapList" router :to="{
                  name: 'ScrapInput',
                  params: {
                    userID: 4321,
                    name: 'winaki'
                  },
                  query: {
                    group: 'member',
                    catagory: 'trial'
                  }

                }"
              >
                <span>OutdoorScrapList</span>
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-bottom-navigation>

            <router-view></router-view>
            
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {mapState} from  "vuex"

  export default {
    data: () => ({
      links: [
        'OutDoor-Scrap List',
      ],
      loginUser: null
    }),
    methods : {
      test() {
        alert('test');
      },
       
    },
    computed: {
    ...mapState(["isLogin", "userInfo"])
    },
    created() {

      console.log("vue creted ")

      //user is not authorized
      if (localStorage.getItem('token') === null) {
        this.$router.push('/login');
      }

      /*
      if (this.userInfo === null) {
        this.loginUser = "Login"
        console.log("userInfo null ")
      }
      else {
        console.log("userInfo not null ")
        this.loginUser = this.userInfo.name
      }
      */
    }
  }
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
