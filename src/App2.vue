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
          <v-list-item-content>
            <v-list-item-title class="title">
              HOJUN SHIN
            </v-list-item-title>
            <v-list-item-subtitle>winaki@kumhotire.com</v-list-item-subtitle>
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
      <v-spacer></v-spacer>      
      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      ></v-text-field>

      <v-tabs centered class="ml-n1" color="darken-1">
        <v-tab v-for="link in links" :key="link">
          <h3>{{ link }}</h3>
        </v-tab>
      </v-tabs>

    
      <h6 v-if="isLogin">{{ userInfo.name }} {{ userInfo.userid }}</h6>

      <v-btn
        x-small
        color="secondary"
        flat
        v-if="isLogin"
        @click="$store.dispatch('logout')"
        >Logout</v-btn
      >
      <v-btn
        small
        v-else
        color="primary"
        class="ma-2 white--text"
        router
        :to="{ name: 'Login' }"
      >
        Login
        <v-icon right dark>
          mdi-login
        </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        x-small
        color="primary"
        flat
        v-if="isAdminLogin"
        router
        :to="{ name: 'Signin' }"
        >Sign in</v-btn
      >
    </v-app-bar>
    <v-main  class="grey lighten-3" >
      <v-container>
        <v-row>
          <v-col xl="12" >
            <v-sheet min-height="70vh" rounded="lg" >
              <!--  -->
              <v-bottom-navigation>                
                <v-btn
                  value="DrawerRight"
                  router
                  :to="{name: 'DrawerRight', params:{id:1, name:'DrawerRight'}}"
                >
                  <span>DrawerRight</span>
                  <v-icon large color="blue darken-2">mdi-clock</v-icon>
                </v-btn>

                <v-btn
                  value="Feed"
                  router
                  :to="{name: 'Feed', params:{id:1, name:'Feed'}}"
                >
                  <span>Feed</span>
                   <v-icon large color="blue darken-2">mdi-message-text </v-icon>
                </v-btn>                
                <v-btn
                  value="ScrapInput"
                  router
                  :to="{
                    name: 'ScrapInput',
                    params: {
                      userID: 4321,
                      name: 'winaki',
                    },
                    query: {
                      group: 'member',
                      catagory: 'trial',
                    },
                  }"
                >
                  <span>ScrapInOut</span>
                  <v-icon large color="blue darken-2">mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  value="ScrapOutHistory"
                  router
                  :to="{
                    name: 'ScrapOutHistory',
                    query: {
                      group: 'member',
                      catagory: 'trial',
                    },
                  }"
                >
                  <span>ScrapOutHistory</span>
                  <v-icon large color="blue darken-2">mdi-monitor</v-icon>
                </v-btn>
                <v-btn
                  value="ScrapDailyReport"
                  router
                  :to="{
                    name: 'ScrapDailyReport',
                    query: {
                      group: 'member',
                      catagory: 'trial',
                    },
                  }"
                >
                  <span>ScrapDailyReport</span>
                  <v-icon>mdi-monitor</v-icon>
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
                        <v-icon>mdi-pencil</v-icon>
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

    links: ["O/D Scrap","Truck-Scale"],
    loginUser: null,
    events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],

    logoutTimer: null,

    subMenuBtns: [
        ['Item Code List ', '0'],
      ],
    items: [...Array(4)].map((_, i) => `Item ${i}`),
    colors: ['normal', 'error', 'teal darken-1'],
    subMenuItems: [ 
                    {title: "Item Code"           ,route: "/ItemCode"}, 
                    {title: "Trade Customer"      ,route: "/Customer"}, 
                    {title: "Customer Trade Item" ,route: "/"},
                    {title: "Catagory"            ,route: "/ScrapOutHistory"}, 
                    {title: "Truck"               ,route: "/"},
                    {title: "Scale data "         ,route: "/ScrapInput"} 
                  ],
  }),

  methods: {
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
