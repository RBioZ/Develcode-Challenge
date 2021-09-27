import * as firebase from 'firebase';

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: 'AIzaSyBTUPB6BZrvDfldEbbyPf973SwzrwuRz9Q',
  authDomain: 'develcodecrud.firebaseapp.com',
  databaseURL: 'https://develcodecrud-default-rtdb.firebaseio.com',
  projectId: 'develcodecrud',
  storageBucket: 'develcodecrud.appspot.com',
  messagingSenderId: '1005483803632',
  appId: '1:1005483803632:web:52c870ffcd0b4f66571335',
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
