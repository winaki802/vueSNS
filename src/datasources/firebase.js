// 파이어베이스 앱 객체 모듈 가져오기
import firebase from 'firebase/app'
// 파이어베이스 패키지 모듈 가져오기
import 'firebase/firebase-database';
import 'firebase/storage';
import 'firebase/firestore'
import Filter from 'bad-words'

// 파이어베이스 DB를 초기화
const oFirebase = firebase.initializeApp({
   apiKey: "AIzaSyA87863VMJp5pm4hIXMw4a8ZQjpY0U4LBI",
  authDomain: "to-do-list-d6b07.firebaseapp.com",
  databaseURL: "https://to-do-list-d6b07-default-rtdb.firebaseio.com",
  projectId: "to-do-list-d6b07",
  storageBucket: "to-do-list-d6b07.appspot.com",
  messagingSenderId: "670983039653",
  appId: "1:670983039653:web:5f5e93b984e247f0cefb4c"
});



// 파이어베이스 DB객체 연결 
const oDB = oFirebase.database();
//const db = oFirebase.firestore();

// 파이어베이스 DB객체 중에서 pictures 항목을 다른 곳에서 사용하도록 공개
export const oPostingFDB = oDB.ref('Posting')

// 파이어베이스 스토리지 객체 공개
export const oStorage = oFirebase.storage();

export const firestore = firebase.firestore();
export const messagesCollection = firestore.collection('Posting')
export const messagesQuery = messagesCollection.orderBy('pstdat','desc').limit(100)
export const filter = new Filter()
export const firebasec = firebase;

export const messages = [];
const unsubscribe = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      //.reverse()
})