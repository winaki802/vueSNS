<template>
    <div>
    <v-container grid-list-md>
        <v-layout class="justify-center" wrap>
            <v-flex xs12 sm6>
                <v-layout wrap column>
                    <!-- make a post -->
                    <v-flex xs12>
                        <v-card rounded outlined>
                            <v-card-title>
                                <v-layout>
                                    <v-btn text class="questrial font-weight-bold text-none">Make Post</v-btn>
                                </v-layout>
                            </v-card-title>
                            <div class="px-3">
                                <v-layout>
                                    <v-flex xs12>
                                        <v-text-field  @click="$router.push({ name: 'PostItem' })" class="questrial no-top-padding" background-color="grey lighten-3" height="44px" append-icon="mdi-camera" rounded placeholder="What do you want to know on your mind, guys?">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-card>
                    </v-flex>
                    <v-btn @click="displaylog">reverse</v-btn>
                    <!-- Posted item #1 -->
                    <v-flex v-for ="item in oPostLists"  :key="item.key" d-inline-flex xs6>
                        <JeanetteSun :params="item" @delete-item="fnRemoveItem"/>      
                    </v-flex>                    
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>

<script>
import { mapState } from "vuex";
//import moment from "moment";
import JeanetteSun from '../FeedComponents/JeanetteSun';

// 파이어베이스 DB 가져옴
import { oPostingFDB } from '@/datasources/firebase'

//https://brosns-881d0-default-rtdb.firebaseio.com/  goolge firebase db 설정
export default {

    components: {
        JeanetteSun
    },

    data: () => ({
        dialogBBS: false,
        dialogTitle: "Make New Posting",
        CategoryName: "Servcie Category",
        systemCategory: [
            { name: "MES", id:  1, align: "start", },
            { name: "RFID LTS", id:  2, align: "start", },
            { name: "POP", id:  3, align: "start", },
            { name: "WMS", id:  4, align: "start", },
            { name: "FEMS", id:  5, align: "start", },
            { name: "GMOS", id:  6, align: "start", },
            { name: "ERP", id:  7, align: "start", },
            { name: "GROUPWARE", id:  8, align: "start", },
            { name: "NETWORK", id:  9, align: "start", },
            { name: "SERVER", id:  10, align: "start", },
            { name: "DATABASE", id:  11, align: "start", },
            { name: "OA", id:  12, align: "start", },
            ],          
            
        oPostLists: [],
    }),

    // 파이어베이스를 쉽게 사용하도록 oTodos 변수로 변경
    firebase: {
      oPostLists: oPostingFDB
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Scrap Item" : "Edit Item";        
        },

        OutformTitle() {
            return this.selectedRows.length > 0 ? "ITEM OUT" : "ITEMS NOT SELECTED";        
        },

        ...mapState(["isLogin", "userInfo"]),
    },

    methods: {
        displaylog() {
            this.oPostLists.reverse();
        },
        // 전달된 할 일을 DB에서 제거
        fnRemoveItem(selectedItemKey) {    
            let pKey = selectedItemKey;      
            //console.log("param: " + selectedItemKey) 
            oPostingFDB.child(pKey).remove();
        },
    },

}
</script>

<style>
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");
.search { position: relative; }
.search input { text-indent: 30px;}
.search .fa-search { 
  position: absolute;
  top: 24px;
  left: 7px;
  font-size: 15px;
}
.no-top-padding.v-text-field{
    padding-top: 0!important
}

.v-text-field .v-input__append-inner{
    padding-top: 5px;
}

.my-custom-dialog {
    align-self: flex-end;
  }


</style>
