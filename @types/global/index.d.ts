declare global {
  interface Window {
    kakao: any
    daum: any
  }
  // eslint-disable-next-line no-undef
  const self: ServiceWorkerGlobalScope
}
