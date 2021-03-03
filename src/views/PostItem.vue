<template>
    <div >
    <v-container grid-list-md>
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
                           
                            <v-flex>
                            <v-card  flat tile >
                                <v-divider></v-divider>
                                <v-card-subtitle>
                                    <span >{{ CategoryName }}</span>
                                </v-card-subtitle> 
                                <v-tabs
                                    v-model="tab"
                                    background-color="transperant"
                                    color="basil"
                                    grow
                                    >
                                    <v-tab
                                        v-for="(item, index) in systemCategory"
                                        :key="index"
                                    >
                                        {{ item.name }}
                                    </v-tab>
                                </v-tabs>                                                              
                            </v-card>
                            </v-flex>
                            <v-card-text>
                                <v-container fluid >
                                    <v-textarea
                                    clearable
                                    counter
                                    clear-icon="mdi-close-circle"
                                    label="Text"
                                    value="This is clearable text."
                                     v-model="svrRequestText"
                                    ></v-textarea>
                                </v-container>
                            </v-card-text>
                            <v-card-text>
                                <v-file-input
                                    v-model="files"
                                    counter
                                    label="Picture"
                                    multiple
                                    placeholder="Select Pictue files"
                                    prepend-icon="mdi-camera"
                                    outlined
                                    @change="addFiles2"
                                    accept="image/*"
                                    :show-size="100000"
                                >
                                    <template v-slot:selection="{ index, text }">
                                    <v-chip
                                        v-if="index < 2"
                                        color="Indigo accent-4"
                                        dark
                                        label
                                        small
                                    >
                                        {{ text }}
                                    </v-chip>

                                    <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2"
                                    >
                                        +{{ files.length - 2 }} File(s)
                                    </span>
                                    </template>
                                </v-file-input>
                                <v-row>                            

                                <div class="parent-component">
                                
                                <v-row>
                                <v-col sm="6" v-for="(file,f) in files" :key="f">                                   
                                     <div >
                                        {{file.name}}
                                        <v-img  :ref="'file'" src="//placehold.it/200/99cc77" width="300px"  :title="'file' + f" />
                                   </div>
                                  
                                </v-col>
                                </v-row>
                               
                                </div>
                            </v-row>
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
    // 파이어베이스 DB 가져옴
    import { oStorage, oPostingFDB, messagesCollection, firestore, messageQuery} from '@/datasources/firebase'

export default {

    data: () => ({
        dialogBBS: false,

        dialogTitle: "Make New Posting",

        svrRequestText: "You can type in here please..!!",

        CategoryName: "Servcie Category",
        
        tab: null,

        systemCategory: [
            { name: "MES",      id:  1, align: "start", },
            { name: "RFID LTS", id:  2, align: "start", },
            { name: "POP",      id:  3, align: "start", },
            { name: "WMS",      id:  4, align: "start", },
            { name: "FEMS",     id:  5, align: "start", },
            { name: "GMOS",     id:  6, align: "start", },
            { name: "ERP",      id:  7, align: "start", },
            { name: "GROUPWARE",id:  8, align: "start", },
            { name: "NETWORK",  id:  9, align: "start", },
            { name: "SERVER",   id:  10, align: "start", },
            { name: "DATABASE", id:  11, align: "start", },
            { name: "OA",       id:  12, align: "start", },
            ],          
        fileDownloadURL: [],
        aPictures: 
            [{
                'url': '',
            },
        ],
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

            console.log("tab : " + this.tab);
            console.log("svrRequestText : " + this.svrRequestText);

            this.$router.push("/Feed");
        },
        // 완료, 수정모드 상태값을 DB에 저장 
      fnSubmitTodo() {

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
                                pstdat: psdate, 
                                userid: this.userInfo.userid,
                                name: this.userInfo.name,
                                category: this.systemCategory[this.tab].name,
                                postComment: this.svrRequestText,
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
                                postComment: this.svrRequestText,
                                storageFileURLs: this.storageFileURLs,
                                storageFileNames: this.storageFileNames,
                            //text: filter.clean(text),
                            //createdAt: oPostingFDB.FieldValue.serverTimestamp(),
                            }).then(r => {
                                console.log(r);
                            }).then(e => {
                                console.log(e);
                            })


                        this.svrRequestText = ''
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

            messagesCollection.add({
                pstdat: psdate, 
                userid: this.userInfo.userid,
                name: this.userInfo.name,
                category: this.systemCategory[this.tab].name,
                postComment: this.svrRequestText,
                storageFileURLs: [],
                storageFileNames: [],
            //text: filter.clean(text),
            //createdAt: oPostingFDB.FieldValue.serverTimestamp(),
            }).then(r => {
                console.log(r);
            }).then(e => {
                console.log(e);
            })
            this.svrRequestText = ''
            this.$router.push("/Feed");
        }       
      },

        preview_image() 
        {
            console.log("preview :" );
            console.log(this.files);
            this.url = URL.createObjectURL(this.files.file);
        },

        clickpdf() {

            //const obj_url = window.URL.createObjectURL(blob);
            const obj_url = "http://www.orimi.com/pdf-test.pdf";
            const iframe = document.getElementById('viewer');
            iframe.setAttribute('src', obj_url);
            window.URL.revokeObjectURL(obj_url);

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

                    /*
                    const nID = new Date().toISOString()
                    
                    let uploadTask = oStorage.ref('images').child('pic' + nID).put(file);
                    console.log("winaki2");
                    uploadTask.on('state_changed', snapshot => {
                        // state_changed 이벤트를 통해서 얼만큼의 바이트가 업로드 중인지 콘솔에 표시
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('업로드: ' + progress + '% 완료', snapshot.state);
                    }, error => {
                        console.log(error)
                        // 오류 발생 시 콘솔에 표시
                    }, () => {
                        // 성공적으로 업로드 완료 후 파이어베이스 DB에 정보 저장
                        uploadTask.snapshot.ref.getDownloadURL().then( downloadURL => {
                        console.log('업로드URL:', downloadURL);     
                        //this.storageFileURLs.push(downloadURL);
                        });
                    });
                    */
                }

                //this.readers[f].readAsDataURL(this.files[f]);
                this.readers[f].readAsDataURL(this.files[f]);
    
            })
        },

        addFiles() {
        //
            console.log('files', this.files);
            this.files.forEach((file, f) => {
                console.log("the files");
                this.readers[f] = new FileReader();
                console.log("winaki");
                this.readers[f].onload = function (e) {
                    let fileData = this.readers[f].result
                    //let imgRef = this.$refs.file[f]
                    //imgRef.src = fileData
                    console.log(e.target.result)
                    console.log(fileData);
                                
                    // send to server here...
                    // 파이어베이스 스토리지에 이미지 파일 저장
                    /*
                    let uploadTask = oStorage.ref('images').child('pic' + file.name).put(fileData);
                    console.log("winaki2");
                    uploadTask.on('state_changed', function (snapshot) {
                        // state_changed 이벤트를 통해서 얼만큼의 바이트가 업로드 중인지 콘솔에 표시
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('업로드: ' + progress + '% 완료', snapshot.state);
                    }, function (error) {
                        console.log(error)
                        // 오류 발생 시 콘솔에 표시
                    }, function () {
                        // 성공적으로 업로드 완료 후 파이어베이스 DB에 정보 저장
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('업로드URL:', downloadURL);                    
                        this.readers[f].readAsDataURL(this.files[f]);                   
                        });
                    });                
                */
                };
                
            })
        }
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
