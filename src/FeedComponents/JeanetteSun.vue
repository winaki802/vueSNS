<template>
    <v-card rounded outlined>
        <div>
            <v-list-item>
                <v-list-item-avatar>
                    <!--img :src="avatar1" alt="John" -->
                    <!--v-img src="https://cdn.quasar.dev/img/boy-avatar.png"></!--v-img-->
                    <v-img :src=avatar1 alt="John"/>
                </v-list-item-avatar>
                <v-list-item-content class="mt-2">
                    <v-list-item-title class="subtitle questrial">{{params.name}} {{params.dept}}</v-list-item-title>
                    <v-list-item-subtitle class="questrial caption blue--text"> {{params.createdAt}}</v-list-item-subtitle>                    
                </v-list-item-content>

                <v-list-item-action>
                    <div class="text-center">
                        <v-menu
                        open-on-hover
                        bottom
                        left
                        offset-y
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            icon  
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                            v-for="(item, index) in actionItems"
                            :key="index"
                            link
                            @click="selectSection(item)"
                            >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                        </v-menu>
                    </div>                                                       
                </v-list-item-action>
            </v-list-item>
            
        </div>    
         
        <!-- <v-container grid-list-xs fluid style="padding:10px"> -->
            <v-layout v-if ="!params.storageFileURLs.length" wrap>
                
                <v-flex v-for="n in 2" :key="n" xs6>
                    <v-card  flat tile>
                        <v-img
                        :src="`https://picsum.photos/500/300?image=${n *  randomNumber() + 10}`"
                        :lazy-src="`https://picsum.photos/10/6?image=${n * randomNumber() + 10}`"
                        aspect-ratio="4.5"
                        class="grey lighten-2"                        
                        >
                        <template v-slot:placeholder>
                            <v-layout
                            fill-height
                            align-center
                            justify-center
                            ma-0
                            >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                        </template>
                        </v-img>                        
                    </v-card>
                </v-flex>                          
            </v-layout>
            <v-layout v-else wrap>              
                <v-flex v-for="image in params.storageFileURLs" :key="image.key" xs6>
                    <v-card  flat tile>
                        <v-img
                        :src="image"
                        :lazy-src="image"
                        aspect-ratio="1.0"
                        class="grey lighten-2"
                        @click="fnDisplayInfo(image)"
                        >
                        <template v-slot:placeholder>
                            <v-layout
                            fill-height
                            align-center
                            justify-center
                            ma-0
                            >
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-layout>
                        </template>
                        </v-img>                        
                    </v-card>
                </v-flex>                          
            </v-layout>
        <!-- </v-container> -->
        <v-card-text>
            <div class=" questrial font-weight-bold mb-4">{{params.postComment}}</div>
            <v-divider></v-divider>
             <v-layout class="py-4">
                <v-flex class="text-left">
                    <v-layout wrap justify-start>
                        <div class="questrial mr-3 font-weight-bold ">
                        Category :  
                    </div> 
                    <div class="questrial ml-2 font-weight-bold mr-2">
                        {{params.category}}
                    </div>
                </v-layout>
                </v-flex>

                <v-flex class="text-right">
                    <v-layout wrap justify-end>
                        <div class="questrial mr-3 font-weight-bold ">
                        2 Comments 
                        <v-icon v-if="false" @click="true" small>mdi-chevron-down</v-icon>
                        <v-icon  @click="true" small>mdi-chevron-up</v-icon> 
                    </div> 
                    <div class="questrial ml-2 font-weight-bold mr-2">
                        Hits
                    </div>
                </v-layout>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            
        </v-card-text>
         <v-list-item style="align-items:normal">
                <v-list-item-avatar>
                    <img :src="avatar1" alt="John">                   
                </v-list-item-avatar>
                <v-list-item-content >
                    <div class="questrial font-weight-bold" style="font-size: 14px">Service Guardians</div>
                    <v-list-item-subtitle class="questrial body1 grey--text text--darken-1 my-2">Please! Comment Here any Help</v-list-item-subtitle>
                    <v-layout>
                    <v-flex xs6>
                        <v-layout row >
                            <div class="questrial caption indigo--text font-weight-bold ml-1 mr-3">Hit</div>
                            <div class="questrial caption indigo--text font-weight-bold mr-3">Translate</div>
                            <div class="questrial grey--text caption font-weight-bold ml-3">All</div>
                        </v-layout>
                        
                    </v-flex>
                    
                </v-layout>
                </v-list-item-content>
                
            </v-list-item>
            
            <v-list-item v-for="(item, index) in params.postReplys" :key="index">
                <v-list-item-avatar>
                    <img :src=getImgUrl(index) alt="John">    
                </v-list-item-avatar>
                <v-list-item-content>
                    <div class="questrial font-weight-bold" style="font-size: 14px">{{item.replyname}}</div>
                    <div class="questrial font-weight-normal mb-4">{{item.replyComment}}</div>
                    <!--v-list-item-subtitle class="questrial body1 font-weight-medium grey--text text--darken-1 my-2">{{item.replyComment}}</!--v-list-item-subtitle-->
                    <v-layout >
                    <v-flex  cols="12" >
                        <v-layout class="d-flex flex-row " row>
                            <!-- <v-flex xs12> -->
                                <div class="questrial caption indigo--text font-weight-bold ml-1 mr-3">Hit</div>
                                <div class="questrial caption indigo--text font-weight-bold mr-3">Translate</div>
                                <div class="questrial caption grey--text font-weight-bold mr-3"> {{item.createdAt}}</div>
                            <!--v-list-item-subtitle class="questrial body1 font-weight-medium grey--text text--darken-1 my-2">{{item.createdAt}}</!--v-list-item-subtitle-->
                        </v-layout>
                    </v-flex>
                </v-layout>
                </v-list-item-content>
                
            </v-list-item>
            <div class="px-3">
                <v-layout>
                    <v-flex xs12>
                        <v-text-field 
                            @click="$router.push({ name: 'PostReply',query: {itag: params.itag, docid:params.docid, name:'PostReply'}})"
                            class="questrial" height="45px" background-color="grey lighten-3" append-icon="mdi-pencil" placeholder="Write a comment..." rounded></v-text-field>
                    </v-flex>
                </v-layout>
            </div>
    </v-card>
</template>

<script>
//import Emojis from '../components/Emoji/Emojis'

export default {
    components: {
        //Emojis
    },
    props: ['params'],

    data(){
        return{

            actionItems: [
                    { title: 'Delete Item' },
                    { title: 'Reserved' },
                    ],
            oPictures: [],
            avatar1: require('../assets/avatars/16.png'),
            avatar2: require('../assets/avatars/17.png'),
            avatar3: require('../assets/avatars/18.png'),
            pics: [
                { pname : require('../assets/avatars/16.png') },
                { pname : require('../assets/avatars/17.png') },
                { pname : require('../assets/avatars/18.png') },
            ],
            getImageflag : false,
            lorem: `Hello, we got a problem about MES WAS port 8080, very slow and almost hung-up, we try to restart many time but still same, I think proberbly HDD disk Fail. `,
            selectedItemKey : '',
        }
    },
    
    computed: {
       

    },
    methods: {
        
        getImgUrl(index) {
            return require('../assets/avatars/'+ (index + 10) + '.png');
        },     
        
        randomNumber()  {            

            let rn = 0;
            rn = Math.ceil(Math.random() * 180);
            //console.log("rn1 :" + rn)
            return rn;
        },
        randomNumber2()  {            

            let rn = 0;
            rn = (Math.ceil(Math.random() * 100) % 2) + 1;
            //console.log('rn2 :' + rn);
           return rn;
        },

        selectSection(item) {
            switch (item.title) {
                case 'Delete Item':
                    this.selectedItemKey = this.params['.key'];
                    this.$emit('delete-item', this.selectedItemKey);   
                    //this.$emit('delete-item', item['.key']);   
                    //oTodosinDB.child(item['.key']).remove();
                break
                case 'Update Comment':
                console.log('Profile')
                break
                case 'Add Pictureu':
                console.log('Logout')
            }
        },

        // 라우터를 이용해서 세부페이지로 이동할 때 사진의 ID 전달
        fnDisplayInfo(image) {
            this.$router.push({
            name: 'ImageDetail',
            params: {
                imageURL: image
            }
        })
      }

    },
}
</script>

<style>

</style>
