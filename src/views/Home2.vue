<template>
  <div>
    <div></div>
    <v-container fill-height style=" max-width:1900px; ">
      <v-layout align-start row wrap>
        <v-flex xs18>
          <v-card>
            <v-list shaped>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="rule in rules" :key="rule.rule">
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="rule.rule">
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    rules: [Object],
  },
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Real-Time", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),
};
</script>
