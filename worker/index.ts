/// <reference lib="webworker" />

// eslint-disable-next-line no-undef
export declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', event => {
  console.log('install', event)
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  console.log('activate', event)
})

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
