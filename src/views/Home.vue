<template>
 <div class="Home">
    <input v-model= "greeting">
    <h1>OUT-DOOR SCRAP MANAGEMENT</h1>
      <v-btn>winaki</v-btn>
    <h3>winaki</h3>
    <div>
      <h2 v-if="greeting ==='Hello'">{{greeting}}</h2>
    </div>
    <div v-if="count === 1">
      Green
    </div>
    <div v-else>
      Red
      <v-input v-model="email"></v-input>
      <h2>{{email}}</h2>
      <p v-once>{{email}}</p>
      <p v-text="email"></p>
      <div>
      <ul>
          <li v-for="cat in cats" v-bind:key="cat.name">
            {{cat.name | capitalize | kittity}}
          </li>
      </ul>
      </div>
      <v-text-field v-model="newCat" @keyup.enter="addKitty"></v-text-field>
      <v-btn @click="addKitty">+ADD</v-btn>
      
      <v-text-field v-model="email" label="enter email !!"
        v-bind:class="[email.length < 6 ? 'red' : 'green']"
      ></v-text-field>
      <v-btn
        onclick="alert('signed up')"
        :disabled="email.length < 2"
      >
        submit
      </v-btn>
    </div>
    <v-container class="v-example">
      <v-row>
        <v-col sm="11" offset="1">
           <li v-for="question in questions" v-bind:key="question.question">
            {{question.question }}
          </li>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="5" offset="2">
          <QuestionBox
            v-bind:question="questions[index]"
          ></QuestionBox>
        </v-col>
      </v-row>
      <v-btn @click="next">next</v-btn>
      
    </v-container>

    <br>
    
    <div class="pa-4"> 
      <br>
      <h5>KTG IT deparment</h5><h6>COPYRIGHT©2020 KUMHO TIRE ALL RIGHT RESERVED. 1-800-HI-KUMHO</h6> 
    </div>
  </div>
 
</template>

<script>
// @ is an alias to /src
import QuestionBox from './QuestionBox.vue';

export default {
 
 data: () => (
    { 
      greeting: 'Hello',
      count:  0,
      email: '',
      cats: [
      {name: 'kitkat'},
      {name: 'fish'},
      {name:'bosco'},
      ],
      newCat: '',
      questions: [
         {name: 'kitkat'},
      ],
      index: 0,
    }    
 ),
 methods: {
   addKitty() {
    this.cats.push({name: this.newCat})
    this.newCat = '';
   },
   next() {
     this.index++;
   }
 }, 
filters: {
  capitalize(value) {
    return value.toUpperCase();
  },
  kittity(value) {
    return value + 'y'
  }
},

mounted() {
  fetch('https://opentdb.com/api.php?amount=10&category=27&type=multiple',{
    method: 'get'
  })
  .then((response) =>  
    {
        //console.log(response.json());
        return response.json();
    }    
  )
  .then((data) => {
    this.questions = data.results;
    console.log(this.questions);

  })
  },

  name: 'Home',
  components: {
    QuestionBox,
  },
  created() {
    //user is not authorized
    if (localStorage.getItem('token') === null) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
  .red {
    background: 2px solid red;
    
  }
  .green {
    border: 2px solid green;
  }
</style>