import axios from 'axios'

// async function registerServiceWorker() {
//   if (!('serviceWorker' in navigator)) return
//
//   // 이미 등록되어있는 정보 가져오기
//   let registration = await navigator.serviceWorker.getRegistration()
//   if (!registration) {
//     // 없으면 서비스 워커 등록
//     registration = await navigator.serviceWorker.register('/service-worker.js')
//   }
// }
//
// // 서버에게 VAPID 공개키 요청
// const getVapidPublicKey = () => {
//   return axios.get('/web-push/public-key')
// }
//
// const vapid = getVapidPublicKey() // public key 가져오기
//
// // 알림 권한 상태
// const subscribe = () => {
//   if (!('Notification' in window)) {
//     // 브라우저가 Notification API를 지원하는지 확인한다.
//     alert('알림을 지원하지 않는 데스크탑 브라우저입니다')
//     return
//   }
//
//   if (Notification.permission === 'granted') {
//     // 이미 알림 권한이 허가됐는지 확인한다.
//     // 그렇다면, 알림을 표시한다.
//     const notification = new Notification('안녕하세요!')
//     return
//   }
//
//   // 알림 권한이 거부된 상태는 아니라면
//   if (Notification.permission !== 'denied') {
//     // 사용자에게 알림 권한 승인을 요청한다
//     Notification.requestPermission().then(permission => {
//       // 사용자가 승인하면, 알림을 표시한다
//       if (permission === 'granted') {
//         const notification = new Notification('알림이 구독되었습니다')
//       }
//     })
//   }
// }

// window.self.addEventListener('push', event => {
//   console.log('[Service Worker] Push Received.', event.data.text())
//   const { title, body } = event.data.json()
//   event.waitUntil(self.registration.showNotification(title, { body }))
// })
//
// window.self.addEventListener('notificationclick', event => {
//   console.log('[Service Worker] notificationclick')
//   clients.openWindow(event.notification.data.link)
// })
//
// window.self.addEventListener('install', () => {
//   console.log('[Service Worker] install')
//   self.skipWaiting()
// })
