// import { initializeApp } from '@firebase/app'
// import { getMessaging } from '@firebase/messaging'
//
// importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
// importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')
//
// // 이곳에 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
// const firebaseApp = initializeApp({
//   apiKey: 'AIzaSyAxyOdpGIONpW9y2xwnskMxvHotpystoK0',
//   authDomain: 'naejango-9f387.firebaseapp.com',
//   projectId: 'naejango-9f387',
//   storageBucket: 'naejango-9f387.appspot.com',
//   messagingSenderId: '544393338037',
//   appId: '1:544393338037:web:0da3309952fdf3547172fc',
// })
//
// const messaging = getMessaging(firebaseApp)

// import firebase from '@firebase/app'

importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js')

const firebaseApp = {
  apiKey: 'AIzaSyAxyOdpGIONpW9y2xwnskMxvHotpystoK0',
  authDomain: 'naejango-9f387.firebaseapp.com',
  projectId: 'naejango-9f387',
  storageBucket: 'naejango-9f387.appspot.com',
  messagingSenderId: '544393338037',
  appId: '1:544393338037:web:0da3309952fdf3547172fc',
}

// Initialize Firebase
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseApp)
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.', event.data?.json())
  // eslint-disable-next-line no-restricted-globals
  event.waitUntil(self.registration.showNotification('232323', { body: 'ewewe' }))
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', e => {
  // eslint-disable-next-line no-restricted-globals
  self.clients.openWindow(e.notification.data)
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', e => {
  navigator.serviceWorker.controller?.postMessage({ command: 'log', message: 'hello world' })
  console.log('message:', e.data)
})
