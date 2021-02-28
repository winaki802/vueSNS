<template>
  <div class="Home">
    <input v-model="greeting" />
    <h5>
      폐기물관리법 [시행 2020. 12. 4.] [법률 제16699호, 2019. 12. 3., 타법개정]
    </h5>
    <v-btn>winaki</v-btn>
    <h3>winaki</h3>
    <div v-if="count === 1">
      Green
    </div>
    <div v-else>
      blue
      <v-input v-model="email"></v-input>
      <h2>{{ email }}</h2>
      <p v-once>{{ email }}</p>
      <p v-text="email"></p>
      <div>
        <ul>
          <li v-for="cat in cats" v-bind:key="cat.name">
            {{ cat.name | capitalize | kittity }}
          </li>
        </ul>
      </div>
      <v-text-field v-model="newCat" @keyup.enter="addKitty"></v-text-field>
      <v-btn @click="addKitty">+ADD</v-btn>

      <v-text-field
        v-model="email"
        label="enter email !!"
        v-bind:class="[email.length < 6 ? 'red' : 'green']"
      ></v-text-field>
      <v-btn onclick="alert('signed up')" :disabled="email.length < 2">
        submit
      </v-btn>
    </div>
    <v-container class="v-1">
      <v-row>
        <v-col sm="11" offset="1">
          <li v-for="question in questions" v-bind:key="question.question">
            {{ question.question }}
          </li>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="11" offset="1">
          <li
            v-for="scrapNotice in scrapNotices"
            v-bind:key="scrapNotice.cat_title"
          >
            {{ scrapNotice.cat_title }}
            <Home2 v-bind:rules="scrapNotice.rules"></Home2>
          </li>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="5" offset="2">
          <QuestionBox v-bind:question="questions[index]"></QuestionBox>
        </v-col>
      </v-row>
      <v-btn @click="next">next</v-btn>
    </v-container>

    <br />

    <div class="pa-4">
      <br />
      <h5>KTG IT deparment</h5>
      <h6>COPYRIGHT©2020 KUMHO TIRE ALL RIGHT RESERVED. 1-800-HI-KUMHO</h6>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionBox from "./QuestionBox.vue";
import Home2 from "./Home2.vue";

export default {
  data: () => ({
    greeting: "Hello",
    count: 0,
    email: "",
    cats: [{ name: "kitkat", type: "a" }, { name: "fish" }, { name: "bosco" }],
    newCat: "",
    questions: [{ name: "kitkat" }],
    index: 0,
    scrapNotices: [
      {
        cat_title: "제1조(정의)",
        rules: [
          {
            rule:
              "이 법은 폐기물의 발생을 최대한 억제하고 발생한 폐기물을 친환경적으로 처리함으로써 환경보전과 국민생활의 질적 향상에 이바지하는 것을 목적으로 한다.",
          },
          { rule: "x2" },
          { rule: "x3" },
        ],
      },
      {
        cat_title: "제2조(목적)",
        rules: [
          {
            rule:
              "1. 폐기물 이란 쓰레기, 연소재(燃燒滓), 오니(汚泥), 폐유(廢油), 폐산(廢酸), 폐알칼리 및 동물의 사체(死體) 등으로서 사람의 생활이나 사업활동에 필요하지 아니하게 된 물질을 말한다.",
          },
          {
            rule:
              "3. 사업장폐기물 이란 「대기환경보전법」, 「물환경보전법」 또는 「소음ㆍ진동관리법」에 따라 배출시설을 설치ㆍ운영하는 사업장이나 그 밖에 대통령령으로 정하는 사업장에서 발생하는 폐기물을 말한다",
          },
          {
            rule:
              "6. 처분이란 폐기물의 소각(燒却)ㆍ중화(中和)ㆍ파쇄(破碎)ㆍ고형화(固形化) 등의 중간처분과 매립하거나 해역(海域)으로 배출하는 등의 최종처분을 말한다.",
          },
        ],
      },
      {
        cat_title: "제3조(적용 범위)",
        rules: [
          {
            rule:
              "1.「원자력안전법」에 따른 방사성 물질과 이로 인하여 오염된 물질.",
          },
          { rule: "2. 용기에 들어 있지 아니한 기체상태의 물질" },
          {
            rule:
              "3. 「물환경보전법」에 따른 수질 오염 방지시설에 유입되거나 공공 수역(水域)으로 배출되는 폐수",
          },
        ],
      },
      {
        cat_title: "제3조(폐기물 관리의 기본원칙)",
        rules: [
          {
            rule:
              "1. 사업자는 제품의 생산방식 등을 개선하여 폐기물의 발생을 최대한 억제하고, 발생한 폐기물을 스스로 재활용함으로써 폐기물의 배출을 최소화하여야 한다.",
          },
          {
            rule:
              "2. 누구든지 폐기물을 배출하는 경우에는 주변 환경이나 주민의 건강에 위해를 끼치지 아니하도록 사전에 적절한 조치를 하여야 한다",
          },
          {
            rule:
              "3. 폐기물로 인하여 환경오염을 일으킨 자는 오염된 환경을 복원할 책임을 지며, 오염으로 인한 피해의 구제에 드는 비용을 부담하여야 한다.",
          },
          {
            rule:
              "5. 폐기물은 소각, 매립 등의 처분을 하기보다는 우선적으로 재활용함으로써 자원생산성의 향상에 이바지하도록 하여야 한다.",
          },
          {
            rule:
              "6. 폐기물은 그 처리과정에서 양과 유해성(有害性)을 줄이도록 하는 등 환경보전과 국민건강보호에 적합하게 처리되어야 한다.",
          },
        ],
      },
      {
        cat_title: "제8조(폐기물의 투기금지)",
        rules: [
          {
            rule:
              "1. 누구든지 특별자치시장, 특별자치도지사, 시장ㆍ군수ㆍ구청장이나 공원ㆍ도로 등 시설의 관리자가 폐기물의 수집을 위하여 마련한 장소나 설비 외의 장소에 폐기물을 버려서는 아니 된다.",
          },
          {
            rule:
              "2. 누구든지 이 법에 따라 허가 또는 승인을 받거나 신고한 폐기물처리시설이 아닌 곳에서 폐기물을 매립하거나 소각하여서는 아니 된다. 다만, 제14조제1항 단서에 따른 지역에서 해당 특별자치시, 특별자치도, 시ㆍ군ㆍ구의 조례로 정하는 바에 따라 소각하는 경우에는 그러하지 아니하다.",
          },
          {
            rule:
              "3. 특별자치시장, 특별자치도지사, 시장ㆍ군수ㆍ구청장은 토지나 건물의 소유자ㆍ점유자 또는 관리자가 제7조제2항에 따라 청결을 유지하지 아니하면 해당 지방자치단체의 조례에 따라 필요한 조치를 명할 수 있다.",
          },
        ],
      },
    ],
  }),

  methods: {
    addKitty() {
      this.cats.push({ name: this.newCat });
      this.newCat = "";
    },
    next() {
      this.index++;
    },
  },
  filters: {
    capitalize(value) {
      return value.toUpperCase();
    },
    kittity(value) {
      return value + "y";
    },
  },

  mounted() {
    fetch("https://opentdb.com/api.php?amount=10&category=27&type=multiple", {
      method: "get",
    })
      .then((response) => {
        //console.log(response.json());
        return response.json();
      })
      .then((data) => {
        this.questions = data.results;
        console.log(this.questions);
      });
  },

  name: "Home",
  components: {
    QuestionBox,
    Home2,
  },
  created() {
    //user is not authorized
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.red {
  background: 2px solid red;
}
.green {
  border: 2px solid green;
}
</style>
