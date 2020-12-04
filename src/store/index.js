import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allUsers: [
      { id: "100017", name: "winaki", password: "100017", email: "winaki@kumhotire.com" },
      { id: "999999", name: "Admin", password: "ktgmes", email: "admin@kumhotire.com" },
    ],
    isLogin: false,
    isLoginError: false,
    loginUser: null,
    loginName: null,
    userInfo: null

  },
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    }
  },
  actions: {
    login({ state, commit,dispatch }, signObj) {
      
      console.log(state.isLogin)
      console.log(signObj)
      
      let userInfo = {
        userid: signObj.tfuserid,
        name: "ktg employee",
        dept: "Production",
        email: signObj.tfuserid + "@kumhotire.com",
        password: signObj.tfpassword
      }
      console.log("login action");
      console.log(userInfo);
      axios
        //.post("http://10.20.226.111:5000/login", {userid: signObj.tfuserid, password: signObj.tfpassword})
        .post("http://10.20.226.111:5000/login", userInfo)
        .then(response => {
          console.log(response)
          //if token receive ok -> local storage set..
          //else just exit
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token);

            commit("loginSuccess", userInfo)
            dispatch("getMemberInfo");
            router.push({ name: "ScrapInput" })
          }
          else {
            commit("loginError")
            localStorage.clear();
          }
        })
        .catch(error => {
            console.log(error)
            commit("loginError")
            localStorage.clear();
        })

        /*
      axios
        .post("https://reqres.in/api/login", { email: signObj.tfuserid, password: signObj.tfpassword })
        .then(res => {

          let token = res.data.token
          let config = {
            headers: {
              "access-token": token
            }
          }
          axios
            .get("https://reqres.in/api/users/2",config)
            .then(response => {

              let userInfo = {
                id: response.data.data.id,
                first_name: response.data.data.first_name,
                last_name: response.data.data.last_name,
                avatar: response.data.data.avatar
              }
              commit("loginSuccess", userInfo)
              console.log(response)
              router.push({ name: "Home" })
             }) 
            .catch(error => {
              alert("check your ID and Password")
              console.log(error)
              commit("loginError")
            })
          
          console.log(res)
        })
        .catch(err => {
          alert("check your ID and Password")
          console.log(err)
          commit("loginError")
        })

      */
      

      /*
      state.allUsers.forEach(user => {
        if (user.id === signObj.tfuserid) selectUser = user
      })
      if (selectUser === null) {
        console.log('winaki2')
        //commit("loginError")
      }

      
      if (selectUser.password !== signObj.tfpassword) {
        console.log("isLoginError :" + state.isLoginError)
        commit("loginError")
        console.log("isLoginError :" + state.isLoginError)
        
      }
      else {
        console.log("isSuccess :" + state.isLogin)
        commit("loginSuccess", selectUser)
        console.log("isSuccess :" + state.isLogin)
        router.push({ name: "Home" })
      }
      */

    },

    getMemberInfo({ commit }) {
      let token = localStorage.getItem("token");
      let config = {
        headers: {
          "token": token
        }
      }
      console.log("token" + token);
      if(token === '' ||  token === null) return;

      axios
        .get("http://10.20.226.111:5000/user", config)
        .then(response => {
          console.log(response.data);

          let userInfo = {
            userid: response.data.user.userid,
            name: response.data.user.name
          }
          commit("loginSuccess", userInfo);
          router.push({ name: "ScrapInput" })
        })
        .catch(() => {
          alert('id and password not correct');
        })

    }, 

    signin({ state, commit }, signObj) {
      
      console.log(state.isLogin)
      console.log(signObj)
      
      let userInfo = {
        userid: signObj.tfuserid,
        name: "ktg employee",
        dept: "Production",
        email: signObj.tfuserid + "@kumhotire.com",
        password: signObj.tfpassword
      }

      axios
        .post("http://10.20.226.111:5000/signin", {userid: signObj.tfuserid, name: "KTG Employee",  dept: "Production", email: signObj.tfuserid + "@kumhotire.com", password: signObj.tfpassword})
        .then(response => {
          console.log(response)

          //if token receive ok -> local storage set..
          //else just exit
          commit("loginSuccess", userInfo)
        })
        .catch(error => {
          console.log(error)
        })

      /*
      axios
        .post("https://reqres.in/api/login", { email: signObj.tfuserid, password: signObj.tfpassword })
        .then(res => {

          let token = res.data.token
          let config = {
            headers: {
              "access-token": token
            }
          }
          axios
            .get("https://reqres.in/api/users/2",config)
            .then(response => {

              let userInfo = {
                id: response.data.data.id,
                first_name: response.data.data.first_name,
                last_name: response.data.data.last_name,
                avatar: response.data.data.avatar
              }
              commit("loginSuccess", userInfo)
              console.log(response)
              router.push({ name: "Home" })
             }) 
            .catch(error => {
              alert("check your ID and Password")
              console.log(error)
              commit("loginError")
            })
          
          console.log(res)
        })
        .catch(err => {
          alert("check your ID and Password")
          console.log(err)
          commit("loginError")
        })

      */
      

      /*
      state.allUsers.forEach(user => {
        if (user.id === signObj.tfuserid) selectUser = user
      })
      if (selectUser === null) {
        console.log('winaki2')
        //commit("loginError")
      }

      
      if (selectUser.password !== signObj.tfpassword) {
        console.log("isLoginError :" + state.isLoginError)
        commit("loginError")
        console.log("isLoginError :" + state.isLoginError)
        
      }
      else {
        console.log("isSuccess :" + state.isLogin)
        commit("loginSuccess", selectUser)
        console.log("isSuccess :" + state.isLogin)
        router.push({ name: "Home" })
      }
      */

    },
    logout({ commit }) {
      commit("logout")
      localStorage.clear();
      router.push({ name: "/login" })
      
    }
  },
  modules: {
  }
})
