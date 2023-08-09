/* eslint-disable no-undef, no-restricted-globals */

importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.18.0/firebase-messaging-compat.js')

const FIREBASE_API_KEY = 'AIzaSyAxyOdpGIONpW9y2xwnskMxvHotpystoK0'
const FIREBASE_AUTH_DOMAIN = 'naejango-9f387.firebaseapp.com'
const FIREBASE_PROJECT_ID = 'naejango-9f387'
const FIREBASE_STORAGE_BUCKET = 'naejango-9f387.appspot.com'
const FIREBASE_MESSAGING_SENDER_ID = '544393338037'
const FIREBASE_APP_ID = '1:544393338037:web:0da3309952fdf3547172fc'

const firebaseApp = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
}

firebase.initializeApp(firebaseApp)
const messaging = firebase.messaging()

self.addEventListener('push', event => {
  try {
    const message = event.data?.json()
    event.waitUntil(
      self.registration.showNotification(message.notification.title, {
        body: message.notification.body,
      })
    )
  } catch (error) {
    console.log('알림 생성 중 에러 반환:', error)
  }
})

self.addEventListener('notificationclick', e => {
  self.clients.openWindow(e.notification.data)
})
