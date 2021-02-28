<template>
    <v-navigation-drawer right app permanent>
        <v-container>
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-icon>mdi-dots-horizontal</v-icon>
                </v-card-title>
                <v-divider>
                </v-divider>
                <v-list-item>
                    <v-text-field height="50px" solo flat placeholder="Search" append-icon="search" ></v-text-field>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <div class="questrial caption font-weight-bold blue--text"> FRIENDS</div>                    
                    </v-list-item-content>
                    <v-list-item-action>
                        <div class="quetrial caption font-weight-bold grey--text">ADD</div>    
                    </v-list-item-action> 
                </v-list-item>
                <template v-for="friend in friends">
                   <ChatUser :user="friend" :key="friend.name"></ChatUser>/>
                   
                </template>
            </v-card>
        </v-container>

    </v-navigation-drawer>
</template>

<script>

import ChatUser from '../components/ChatUser';

export default {

    components: {
        ChatUser
    },

    data: () => ({

      friends: [
          { name: 'Hojun Shin', avatar: require('../assets/avatars/1.png'), online: true},
          { name: 'YunTea Jin', avatar: require('../assets/avatars/2.png'), online: true},
      ],
      colleagues: [
          { name: 'Small Kaydence', avatar: require('../assets/avatars/6.png'), online: true},
          { name: 'Valenzuela Rudy', avatar: require('../assets/avatars/7.png'), online: true},
          { name: 'Harris Marin', avatar: require('../assets/avatars/8.png'), online: true},
          { name: 'Bailey Kirsten', avatar: require('../assets/avatars/9.png'), online: true},
          { name: 'Rice Wade', avatar: require('../assets/avatars/10.png'), online: true},
      ],
      clubs: [
          { name: 'Chang Zander', avatar: require('../assets/avatars/11.png'), online: true},
          { name: 'Calhoun Kayla', avatar: require('../assets/avatars/12.png'), online: true},
          { name: 'Kramer Riley', avatar: require('../assets/avatars/13.png'), online: true},
          { name: 'Valentine Maci', avatar: require('../assets/avatars/14.png'), online: true},
          { name: 'malone Terrance', avatar: require('../assets/avatars/15.png'), online: true},


      ]  
    }),
}
</script>

<style>
.active-list-item .v-list-item--dense .v-list-item__title, .v-list-item--dense .v-list-item__subtitle, .v-list--dense .v-list-item .v-list-item__title, .v-list--dense .v-list-item .v-list-item__subtitle {
    font-family: 'Questrial';
    font-weight: 'bold';
}