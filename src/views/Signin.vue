<template>
  <v-container fill-height style="max-width:450px;">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-alert type="success" :value="isSignin">
          Sign-in complete successfully !!
        </v-alert>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Sign-in</v-toolbar-title>
          </v-toolbar>
          <div class="pa-3">
            <v-text-field v-model="tfuserid" label=" Input user Id !!">
            </v-text-field>
            <v-text-field
              type="password"
              v-model="tfpassword"
              label="Password !!"
            >
            </v-text-field>
            <v-text-field
              type="Name"
              v-model="tfname"
              label="Enter your Name !! "
            >
            </v-text-field>
            <v-text-field
              type="Department"
              v-model="tfdept"
              label="Enter your Department !! "
            >
            </v-text-field>
            <v-text-field
              type="e-mail"
              v-model="tfemail"
              label="Enter your e-mail !! "
            >
            </v-text-field>
          </div>
          <v-btn
            large
            block
            depressed
            color="Primary"
            v-bind:disabled="tfuserid.length < 6"
            @click="signin({ tfuserid, tfpassword, tfname, tfdept, tfemail })"
          >
            Sign-In
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    tfuserid: "",
    tfpassword: "",
    tfname: "",
    tfdept: "",
    tfemail: "",
    isError: false,
    isSuccess: false,
    allUsers: [
      { id: "100017", password: "100017", email: "winaki@kumhotire.com" },
      { id: "999999", password: "ktgmes", email: "admin@kumhotire.com" },
    ],
  }),

  computed: {
    ...mapState(["isSignin", "isLogin", "isLoginError"]),
  },

  mounted() {
    if (localStorage.getItem("token") === null) {
      //this.$store.dispatch('getUserInfo({token}');
    } else console.log("mounted : no token");
  },

  methods: {
    postTest() {
      axios
        .post("https://reqres.in/api/register", {
          //body data
          email: "eve.holt@reqres.in",
          password: "pistol",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    ...mapActions(["signin", "login", "getUserInfo"]),

    /*
        login() {

          
            console.log(this.tfuserid, this.tfpassword)
            let selectUser = null;
            this.allUsers.forEach(user => {
                console.log(user.id)
                if(user.id === this.tfuserid) selectUser = user
            })
            if (selectUser === null) {
                this.isError = true
                this.isSuccess = false
                console.log("user and isError1 =" + selectUser + "," + this.isError)
            }
            else {
                selectUser.passoword !== this.tfpassword ? (this.isError = true, this.isSuccess=false) :  (this.isSuccess = true, this.isError= false)
            }
        
        }
    */
  },
};
</script>
