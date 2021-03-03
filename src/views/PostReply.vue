<template>
    <div>
    <v-container  grid-list-md>
        <v-layout class="justify-center" wrap>
            <v-flex xs12 sm6>
                <v-layout wrap column>
                    <!-- Posted item #1 -->
                    <v-flex d-inline-flex xs6>
                       
                        <v-card style="width: 100%" color="basil"> 
                           <v-chip
                            class="ma-2"
                            color="primary"
                            label
                            >
                            <v-icon left>
                                mdi-tag-outline
                            </v-icon>
                            <span >{{ dialogTitle }}</span>
                            </v-chip>
                            <v-list>
                                <v-list-item link>
                                    <v-list-item-avatar>
                                        <v-img src="https://cdn.quasar.dev/img/boy-avatar.png"></v-img>
                                    </v-list-item-avatar>
                                <v-list-item-content>
                                        <v-list-item-title v-if="isLogin" class="title">                        
                                            {{ userInfo.name }}
                                        </v-list-item-title>
                                        <v-list-item-subtitle v-if="isLogin">{{userInfo.email}} / {{userInfo.dept}} </v-list-item-subtitle>
                                    </v-list-item-content>                

                                </v-list-item>
                            </v-list>                            
                            <v-card-text>
                                <v-container fluid >
                                    <v-textarea
                                    clearable
                                    counter
                                    clear-icon="mdi-close-circle"
                                    label="Text"
                                    value="This is clearable text."
                                     v-model="postReplyText"
                                    ></v-textarea>
                                </v-container>
                            </v-card-text>
                            
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close()">
                                Cancel
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="fnSubmitTodo()">
                                Save
                                </v-btn>
                            </v-card-actions>
                            </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import moment from "moment";

    // 파이어베이스 앱 객체 모듈 가져오기
    import firebase from 'firebase/app'
    // 파이어베이스 패키지 모듈 가져오기
    import 'firebase/firebase-database';
    import 'firebase/storage';
    import 'firebase/firestore'

    // 파이어베이스 DB 가져옴
    import { oStorage, oPostingFDB, messagesCollection, firestore, messageQuery} from '@/datasources/firebase'

export default {

    data: () => ({
        dialogBBS: false,
        dialogTitle: "Make Reply",
        postReplyText: "You can type in here please..!!",
        fileDownloadURL: [],
        files: [],
        readers: [],
        oPostLists: [], // 할일 데이터 목록 저장 변수
        storageFileURLs: [],
        storageFileNames: [],
        insertIdx: 0,
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
        close () {
            console.log("postReplyText : " + this.postReplyText);
            this.$router.push("/Feed");
        },
        // 완료, 수정모드 상태값을 DB에 저장
      
        fnSubmitTodo() 
        {
            //upload images to firestorage 
            const nID = new Date().toISOString();
            if (this.files.length > 0) {
                this.files.forEach((file, f) => {                          
                    let uploadTask = oStorage.ref('images').child('pic' + nID + file.name).put(file);
                    uploadTask.on('state_changed', snapshot => {
                        // state_changed 이벤트를 통해서 얼만큼의 바이트가 업로드 중인지 콘솔에 표시
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('업로드: ' + progress + '% 완료', snapshot.state);
                    }, error => {
                        console.log(error)
                        // 오류 발생 시 콘솔에 표시
                    }, () => {
                        // -> 성공적으로 업로드 완료 후 파이어베이스 DB에 정보 저장
                        uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
                        console.log('업로드URL:', downloadURL);     
                        this.storageFileURLs.push(downloadURL);

                    if (this.files.length <= this.storageFileURLs.length) {
                            let cDate = new Date().toString();        
                            let psdate = moment(cDate.toString()).format("YYYYMMDDHHmmss");
                            
                            //let tfiles = new [];
                            this.files.forEach((file,idx) => {
                                this.storageFileNames[idx] = file.name;
                            });

                            //fire database upload
                            let PostingInfo = {
                                    replydat: psdate, 
                                    replyuserid: this.userInfo.userid,
                                    replyname: this.userInfo.name,
                                    replyComment: this.postReplyText,
                                    storageFileURLs: this.storageFileURLs,
                                    storageFileNames: this.storageFileNames,
                            };

                            oPostingFDB.push({
                            //todo_title: this.svrRequestText,
                            //b_completed: false,
                            //b_edit: false,
                            PostingInfo
                            });

                            
                            messagesCollection.add({
                                    pstdat: psdate, 
                                    userid: this.userInfo.userid,
                                    name: this.userInfo.name,
                                    category: this.systemCategory[this.tab].name,
                                    postComment: this.postReplyText,
                                    storageFileURLs: this.storageFileURLs,
                                    storageFileNames: this.storageFileNames,
                                //text: filter.clean(text),
                                //createdAt: oPostingFDB.FieldValue.serverTimestamp(),
                                }).then(r => {
                                    console.log(r);
                                }).then(e => {
                                    console.log(e);
                                })


                            this.postReplyText = ''
                            this.storageFileURLs.splice (0, this.storageFileURLs.length);
                            this.storageFileNames.splice(0, this.storageFileNames.length);
                            this.files.splice(0,this.files.length);
                            this.$router.push("/Feed");
                        }
                    });
                    
                    });
                    
                });   
            } else {
                console.log("no files")
                let cDate = new Date().toString();        
                let psdate = moment(cDate.toString()).format("YYYYMMDDHHmmss");            
                let docid = this.$route.query.docid;

                let postReplys = [{
                    replydat: psdate, 
                    replyuserid: this.userInfo.userid,
                    replyname: this.userInfo.name,
                    replyComment: this.postReplyText,
                    storageFileURLs: this.storageFileURLs,
                    storageFileNames: this.storageFileNames,
                }];

                console.log(postReplys);
                messagesCollection.doc(docid).update({
                    postReplys: firebase.firestore.FieldValue.arrayUnion(...postReplys)
                }).then(r => {
                    console.log(r);
                }).then(e => {
                    console.log(e);
                });
                this.postReplyText = ''
                this.$router.push("/Feed");
            }       
        },
        
        addFiles2(){
            this.apictures = "";
            this.files.forEach((file, f) => {
                this.readers[f] = new FileReader();
                this.readers[f].onloadend = (e) => {

                    let fileData = this.readers[f].result
                    let imgRef = this.$refs.file[f]
                    imgRef.src = fileData

                    // send to server here...

                
                }

                //this.readers[f].readAsDataURL(this.files[f]);
                this.readers[f].readAsDataURL(this.files[f]); 
            })
        },

    }
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
