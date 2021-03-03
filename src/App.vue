<template>
  <v-app id="inspire">
    <!-- v-navigation-drawer color="Lighen-5"  v-model="drawer"  floating clipped app permanent --> 
   <v-navigation-drawer color="Lighen-5"  v-model="drawer"  app >
      <v-system-bar></v-system-bar>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.quasar.dev/img/boy-avatar.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content v-if="isLogin">
            <v-list-item-title class="title">
              {{ userInfo.name }} 
            </v-list-item-title>
            <v-list-item-subtitle>{{ userInfo.email }} </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="appBarDrawerSelectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in appBarDrawerLeftitems"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

   </v-navigation-drawer>

    <!--  dense clipped-left clipped-right color="indigo darken-2" flat dark app -->
    <v-app-bar color="indigo darken-2" dense flat dark app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  
      <div class="px-3">
      
        <v-flex xs12>
          <v-text-field  placeholder="Search" class="questrial no-top-padding" hide-details prepend-icon="mdi-magnify" single-line ></v-text-field>
        </v-flex>

      </div>

      <!--
      <v-tabs centered class="ml-n1" color="darken-1">
        <v-tab v-for="link in links" :key="link">
          <h3>{{ link }}</h3>
        </v-tab>
      </v-tabs>
      -->
     <v-spacer></v-spacer>
     <div v-if="isLogin">
     <v-btn v-if="userInfo.userid === '100017'" small color="primary" flat class="ma-2 white--text" router :to="{ name: 'Signin' }">Sigin
              <v-icon right dark> mdi-login </v-icon>
     </v-btn>
     </div>
    <div v-if="!isMobile()" class=".d-none .d-lg-flex .d-xl-none" >      
      <h4 v-if="isLogin">{{ userInfo.name }} </h4>
    </div>
      <v-btn small color="secondary" flat v-if="isLogin" @click="$store.dispatch('logout')" >Logout
              <v-icon right dark> mdi-logout </v-icon>
            </v-btn >     
            <v-btn small v-else color="primary" flat class="ma-2 white--text" router :to="{ name: 'Login' }">Login
              <v-icon right dark> mdi-login </v-icon>
      </v-btn>
      <!--
         <v-row my-2> 
          <v-col offset="0">
            <h4 v-if="isLogin">{{ userInfo.name }} </h4> 
          </v-col>
          <v-col offset="0">
            <v-btn small color="secondary" flat v-if="isLogin" @click="$store.dispatch('logout')" >Logout
              <v-icon right dark> mdi-logout </v-icon>
            </v-btn >     
            <v-btn small v-else color="primary" flat class="ma-2 white--text" router :to="{ name: 'Login' }">Login
              <v-icon right dark> mdi-login </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      -->
    <div v-if="isMobile()" class="d-none d-sm-flex">
       <v-btn x-small color="secondary" flat v-if="isLogin" @click="$store.dispatch('logout')" >Logout
         <v-icon right dark> mdi-logout </v-icon>
      </v-btn >     
      <v-btn small v-else color="primary" class="ma-2 white--text" router :to="{ name: 'Login' }">Login
        <v-icon right dark> mdi-login </v-icon>
      </v-btn>
    </div>
 

    </v-app-bar>
    <v-main  class="grey lighten-3" >
      <v-container>
        <v-row>
          <v-col xl="12" >
            <v-sheet min-height="70vh" rounded="lg" >
              <!--  -->
              <v-bottom-navigation>                
                <v-btn
                  value="Feed"
                  router
                  :to="{name: 'Feed', params:{id:1, name:'Feed'}}"
                >
                  <span>Home</span>
                   <v-icon large color="blue darken-2">mdi-home </v-icon>
                </v-btn>                
                <v-btn
                  value="Colleagues"
                  router
                  :to="{name: 'DrawerRight', params:{id:1, name:'DrawerRight'}}"
                >
                  <span>Colleagues</span>
                  <v-icon large color="blue darken-2">people</v-icon> 
                </v-btn> 
               
                <v-menu
                    v-for="([text, rounded], index) in subMenuBtns"
                    :key="text"
                    :rounded="rounded"
                    offset-y
                  >
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        :color="colors[index]"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span>{{ text }} </span>
                        <v-icon large color="blue darken-2">chat</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                         :to="item.route" 
                        v-for="item in subMenuItems"
                        :key="item.title"                        
                        link
                      >
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
              </v-bottom-navigation>
              <keep-alive v-if="$route.meta.keepAlive">
                  <router-view></router-view>                
              </keep-alive>
              <router-view v-else></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

    </v-main>
    <v-footer color="secondary" dark fixed>
      <div class="mx-auto">
        Copyright &copy; {{ new Date().getFullYear()}}
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
//import DrawerLeft from './views/DrawerLeft.vue';
//import DrawerLeft2 from './views/DrawerLeft2.vue';
//this is new repository
export default {

  components: {
    //DrawerLeft,
    //DrawerLeft2,
    
  },

  data: () => ({

    drawer: false,

    appBarDrawerSelectedItem: 0,
    appBarDrawerLeftitems: [
      { text: 'My profile', icon: 'mdi-folder' },
      { text: 'History', icon: 'mdi-account-multiple' },
      { text: 'One-Point Lession', icon: 'mdi-star' },
      { text: 'Trouble-Shooting Guide', icon: 'mdi-history' },
      { text: 'System Catagory', icon: 'mdi-check-circle' },
      { text: 'Global Serivce Contact', icon: 'mdi-upload' },
      { text: 'Local System Configuration', icon: 'mdi-cloud-upload' },
    ],

    links: [],
    loginUser: null,
    events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],

    logoutTimer: null,

    subMenuBtns: [
        ['ScrapList ', '0'],
      ],
    items: [...Array(4)].map((_, i) => `Item ${i}`),
    colors: ['normal', 'error', 'teal darken-1'],
    subMenuItems: [ 
                    {title: "ScrapInput"          ,route: "/ScrapInput"}, 
                    {title: "ScrapOutHistory"     ,route: "/ScrapOutHistory"}, 
                    {title: "ScrapDailyReport"    ,route: "/ScrapDailyReport"}, 
                    {title: "Trade Customer"      ,route: "/Customer"}, 
                    {title: "Customer Trade Item" ,route: "/ItemCode"},
                    {title: "Catagory"            ,route: "/ScrapOutHistory"}, 
                    {title: "Truck"               ,route: "/"},
                    {title: "Scale data "         ,route: "/ScrapInput"} 
                  ],
  }),

  methods: {

    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    test() {
      alert("test");
    },
    resetTimer: function() {
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
    setTimers: function() {
      this.logoutTimer = setTimeout(this.autoLogoutUser, 5 * 60 * 1000); // 30 minutes
    },

    autoLogoutUser() {
      if (this.isLogin === true) {
        alert("Are you still here ? system auto logout !!");
        this.$store.dispatch("logout");
      }
    },

    movetoScreen(item) {

      //user is not authorized
      if (localStorage.getItem("token") === null) {
        this.$router.push("/login");
      }

      switch (item) {
          case "Item Code":
              if (localStorage.getItem("token") === null) {
                this.$router.push("/ScrapInput");
              }
              break;

          case "winaki":
              break;
        }
    }

  },
  computed: {
    ...mapState(["isLogin", "userInfo", "isAdminLogin"]),
  },
  created() {
    console.log("vue created ");

    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
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
  },

  mounted() {
    this.events.forEach(function(event) {
      window.addEventListener(event, this.resetTimer);
    }, this);

    this.setTimers();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Questrial");

.questrial {
  font-family: "Questrial";
}

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
