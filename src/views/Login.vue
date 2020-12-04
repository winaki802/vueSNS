<template>
    <v-container fill-height style="max-width:450px;" >
        <v-layout align-center row wrap>
            <v-flex xs12>
                <v-alert
                    type="error"
                    :value="isLoginError"
                >
                    Check you id and password !!
                </v-alert>
                <v-alert
                    type="success"
                    :value="isLogin"
                >
                    login complete successfully !!
                </v-alert>
                <v-card>
                    <v-toolbar flat>
                        <v-toolbar-title>로그인</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                        <v-text-field 
                        v-model="tfuserid"
                        label="계정을 입력하세요">
                        </v-text-field>
                        <v-text-field 
                        type="password"
                        v-model="tfpassword"
                        label="패스워드를 입력하세요">
                        </v-text-field>
                    </div> 
                    <v-btn
                        large
                        block
                        depressed
                        color="Primary"
                        v-bind:disabled="tfuserid.length < 6"
                        @click="login({tfuserid, tfpassword})"
                    >
                        Login
                    </v-btn>           
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import {mapActions, mapState} from "vuex"
import axios from 'axios';

  export default {
    data: () => (
        { 
          tfuserid: '',
          tfpassword: '',
          isError: false,
          isSuccess: false,
          allUsers: [
              {id: "100017", password: "100017", email: "winaki@kumhotire.com"},
              {id: "999999", password: "ktgmes", email: "admin@kumhotire.com"},
          ]
        }        
        ),

    computed: {

        ...mapState(["isLogin","isLoginError"])


    },

    mounted() {

         if (localStorage.getItem('token') === null) {
             //this.$store.dispatch('getUserInfo({token}');
         }
         else console.log("mounted : no token")
    },


    methods: {
        
        postTest() {
            axios
                .post("https://reqres.in/api/register", {
                    //body data
                    email: "eve.holt@reqres.in",
                    password: "pistol"
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        ...mapActions(["login", "getUserInfo"]),

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
    }
  }
</script>
