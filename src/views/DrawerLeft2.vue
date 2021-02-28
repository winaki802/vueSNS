<template>
    <!-- floating clipped app permanent --> 
    <v-navigation-drawer color="Lighen-5"  v-model="drawer"  floating clipped app permanent >
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
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
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
 </template>

<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'My profile', icon: 'mdi-folder' },
        { text: 'History', icon: 'mdi-account-multiple' },
        { text: 'One-Point Lession', icon: 'mdi-star' },
        { text: 'Trouble-Shooting Guide', icon: 'mdi-history' },
        { text: 'System Catagory', icon: 'mdi-check-circle' },
        { text: 'Global Serivce Contact', icon: 'mdi-upload' },
        { text: 'Local System Configuration', icon: 'mdi-cloud-upload' },
      ],
    }),
  }
</script>