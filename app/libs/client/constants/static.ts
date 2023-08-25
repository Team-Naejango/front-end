'use client'

import { StaticImageData } from 'next/image'
import { DataTypes } from '@/app/components/molecule/tab/RadioPicker'

import event1 from '@/app/assets/image/event_trip_02.png'
import event2 from '@/app/assets/image/event_trip_03.png'
import event3 from '@/app/assets/image/event_basket.png'
import event4 from '@/app/assets/image/event_trip_04.png'
import boxImg from '@/app/assets/image/box.png'

// 파이어베이스 키
const FIREBASE_API_KEY = 'AIzaSyAxyOdpGIONpW9y2xwnskMxvHotpystoK0'
const FIREBASE_AUTH_DOMAIN = 'naejango-9f387.firebaseapp.com'
const FIREBASE_PROJECT_ID = 'naejango-9f387'
const FIREBASE_STORAGE_BUCKET = 'naejango-9f387.appspot.com'
const FIREBASE_MESSAGING_SENDER_ID = '544393338037'
const FIREBASE_APP_ID = '1:544393338037:web:0da3309952fdf3547172fc'

// 포인트 충전
const POINTS: DataTypes[] = [
  {
    label: '10,000원',
    value: 50,
  },
  {
    label: '14,000원',
    value: 70,
  },
  {
    label: '100,000원',
    value: 100,
  },
  {
    label: '999,999,999원',
    value: 999,
  },
  {
    label: '0원',
    value: 10000,
  },
]

// 카테고리 타입
const CATEGORIES: { name: string }[] = [
  { name: '전체' },
  { name: '의류' },
  { name: '가구' },
  { name: '생필품' },
  { name: '디지털기기' },
]

// 창고 목록
const STORAGES: { id: number; name: string }[] = [
  { id: 1, name: '창고1' },
  { id: 2, name: '창고2' },
  { id: 3, name: '창고3' },
  { id: 4, name: '창고4' },
  { id: 5, name: '창고5' },
]

// 판매 상태
const KEEP_TYPES: { name: string }[] = [{ name: 'BUY' }, { name: 'SELL' }]

// 이벤트 정보
const HOMEIMAGES = [
  {
    src: event1,
    blurUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAIWAl8DASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECBAP/xAAWEAEBAQAAAAAAAAAAAAAAAAAAEQH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDgAARUAAUEVAAFEAVEAARUUEVFAARAFAAEVFAAAAFFRUBUUUVFQFRUUVFQFRUUVFQFQBQEUVFQAAFRQAEUAAAAABAFAAAEAAAAVAAUABAFc0AAAUEVAAFEAVEAARUUEVFQABAFAAEABQAABRUEFVAVVRUBUEVVQQVUEVVQQUAFARRUEFAAABRBFUQBRAFBAAFAABAAAAAUABAAGQFYAFAABAAAVEAUQAEAUEVFQBAAFBFQAABUAUAUAQUAVQEFARVAQUBFURQURUBUEVQEBUAUAABAAFAAAFAABAAAAAUABAAAAGQFYAFAAEAABFQAUQBRABEAUEBQABAAAAAAFQFUABUVAVFRRUVAVBFVUEFVAVQEFEVFFQQUAAAFEAUQQUQVVEBFQAAAAAARQAAAAABAGmAABFQABUEAAEUAFEAEQBRAFBFQABQBAURQAEBUBVAQUBFURQURUVRFQURUUVBBQEFEUUAQUQBRAFEUAQBRFABAUQBUBQAAAAEAUQAAaYAQAAAEVAABAUEVFBFRUAQABRAAARQAAABRAFEVFFQQVUBVAQURUVRFQURUUVBBQEFEUUVBBRAFEUAAAAAAAQBRBRRAFQAAAAFAAAQVzAAAAEBQBFAAEAVBAUEVAEVFAEVAAAAUBAURQAAUQRVVBBQEVRFRVEVBRBBVQRVEUFEEVRFQUQBRAFEAUQBRAFEAUQUUQBRAFEFFEAAAAFcwEBUBQAAQFBFQQBFAEUAFBAEEBQBAAFABAAFFQBRBFVUEFEVFUQBoQZVVQBRFRVEEFEVBRAVRBBoQBRAFEAUQBRBRRAFEBFEFFEAAAAAAFYAAAFBAAAVBAUEABFRQRUVAEUAAQBQEAVAAAAARVEAURUVRBBVQRVEVFUQQVUEFEEVoQQUQBVQQUQBRAVQBBUFFEAUQBRBRRAFEAAAAFFAGABQQAAFQQAARQAUQARAFEAUEAAEUAAEAAAAABUEVRBFURUFEEVVQQUQRWhBBVZVFUQBVZVBRAFEVBRAFEFFEAUQBQFAAAAABQAEAAaQFZABAABAUAQABQQFQRUUEVAEVFAEVAEBUAAQUAEUAAEEVVQBRBFUQQaEEVRFQUQRVVlUFEEVoQQUQBoZUFEAUQBVZUFEAUQVFEAUQUUAAAAAGhBWFEAVAABFFQFBFQQBFAEUARQAEQBRAAQBQEAAABBFUQBRBFUQQVWVRVEEVVZVBRBFVWRBoQQVayINCAqqyoKIAoigogIogoogCgKKIAogCiCiiANgDACAogoAACCoAAgCggKCAqCAoIACAoIACAAIAqAAIIqiAKIIrQyqKoggohWVaGVqCiCK0MqgogDQggqsgNCFBVZoDQgooigogoogIoigAKAAAANgDIAACKKgCAIoqAoIAAIqAIoIqKCKgggKCAAgKCAAIIqoAAgiqIIKIIqrWRFaoggtEEVoZVBVZKitUSiCrWQGqIINCAKIqiiAiiKCiCiiKAqCiiAKIAogI9RARRBQAEARQAAQFAEVAEABFAEVAEUEABBFFQQAEABAUQQBAVRKVBaVBFUSlRVEpUVoZq1kWlSlRWqM1UFVkQaKlAapWVFWrWVEUqANCALVZVRRAFVlVRRAFEAUBRRAHqIDKiAKgAAKCAACKACogAICKAIqAIoIACCKgCAIACCAqFSgpUSitVEpUFpUpUVaJSoqrWaVlWqVmrUVarNKg0VmrWVapWaoKrKoKrNKDQlKDQgDQlFRVZqgogo0IAoigogoogIogD2AEAQFEAAFAEAAVBAUEBQQBBAUQEUEAQQRQQRUBABBAKVAClQQWpRBVpUEVaVmlRWqVmrWVapWaVFaq1mlZGqVmrUVqlZq1BqjKoNDNWg0M1QaEAaEFFVlQVWVVFEAVUFFEAURQAAewAgAACAqAoAioqAAgKAIoIqCCAogIqCAoiKgiIuoqCCAIqAIAogCiAigggCCKpUEFpUEGqVmlZVulZpUVulZq1kapWatFaVmlQaVmqCqzVUVWVEVUFFVlQURVFEAURRFEAUQUdAggAAAKAgAAqCAACKAIqCKgCAogIqCCKCGoIIIqAIACCiAKIIKAiKCCAICqiDIogitDKoilQZGqtZKg3Ss1ag1VrNKitjK0GlZqqKrKg0IKNCAiqgooigogCiKoAA6BBBRAABQBAVAVAQABFAEVBFQBAUQE1UEEVBNEVBABAQURUFEAVAQUQRFAQUEEFQGVARBRBkaEEGhBlGhARqrWVQaq1lVGlZUFVlQaEFGhAGhFUUQBQAUQUUQB0gIAICiCgAAgKgCAAigCKgCAIqKCCKggiomoqCCAoIAqIqCiCCiANIioiiKiAAigCAgMgAyACKogyjSsqiKqCo0rKiNKyqqqooKrKqKqAKqCiqyoKIAoCoogDpARQAAEUVAABFQAAQFBAEQEUEVFDUNRUNZXU1UQEEEVBRAFQEFEEFEEFAQUARQBkEVEABkARmqAMgqKCiKiKrKiNCKIqsqqNKyqq0IqiqyoKAooigogCgAAA6kAAAABQEAAFQQAEBQQAQEVBFRQQQRE1UVBAUQEFEVAQEGhBBRAFEBAARQBkQBAAZqiAyACAACqiogqKIoioKuIqoqoqiiKoqoKKqAKAooigAAAA6gAAQFEFAABAABFQBAEVFBAVEBAENRURFRUEABBFURUFQEFEEFEVEUARQBAQGQASgioxVAEAAAAFVFRBUUQVFQVUUQVFUVUVVFRVQVFUFQBQAAAUQUdQAAAACggAAgAIoAggCKCKiiAgggioahqKgioKIAqAgoggoioKgCKAIAIgAMgAzVQBkAAAAFABQRBQEUFQFRUBQVVVFVBUVQAUUABUFFEUAAHUIKiiAACgCAAAICggAICogIAgioIrIggKICAIqKqAgoioKgIigCKAIIAgAMgiozVAEAABQABUQBQFFQAVABRQFAVFVBUVQAUUAABQAAVAHUA0yAAAgACggAIqAIqKCACAioIqAiaqKiIqKiAgoioKIAqIqCiKgACKIDIAIADNVAGQAAUABREBVBFFRQFQAUAFQAAFRQAVoAAURVABQAAAB1ANsggAAACKAAiAAgCiIqAICoiKgIi6ioiKgCACAgoioKIAqACiKiAAyACKIDICiAAIKKgAqKCgCgiigACoAACggAAKiqACgqKoAAAKAAOpAdGAAAAEAARUUEVAEVBBAURFQBBFQRU0EQRUEVBRAFQEABEUAFQBAAZABmqAIAKiAoKKKgAqKAoAKgigAKAAIoAAKAAAAKAAKIKKIqoAA6QHVgAAQAAQABRAAQAERUEEBREVARFRURFQBABEVBRFQURUABEUAQAGVAGQBUQUUUBUBQRRQABUAFFRQQAAAUEUAAAAAAAAAAFAAFEUHSCO7mqAAAAioAioACKCKgCACIqKggAiLrICKioiKgCAKgCKgAoiogAMgAgArIKAqgqAqKiigAoIAKKAIAKCKAAAAAAKioAoAAAAAAAAAA6QHocgAAABFQBFQBFQBFRRAQBFQREVFBlU0ERUEEAVAQURUAARUAQAGQAQUFRRQQUFRQFABUAFFAEAFAAAAAFEUAAAARQEAUAAAAAAAAdID0OQAAAAioAioAioAgKIioAioCIqKiIqAmouoCAAiKgoiogAgoAyACAqKyCooqgqAqKiioqAoCioqAACgAAAKCKAAAAAAAAAAAAgCgAAADpAehyAAAAQABAAQAQBREABABEAREBRNQARAAQBRAQEAUAZABAUGQUBVUEBQRRQQUAUUEAAFAAABQEAAUAAAAAAAAABAFAAAAH/9k=',
    title: '내잔부 단독 특가\n열기구 여행 오픈',
    position: false,
    ing: true,
  },
  {
    src: event2,
    blurUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAIWAl8DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAFRABAQAAAAAAAAAAAAAAAAAAAAH/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD4oDoyACgAAACKgoAAAKACgAKAigAAACooAACooCooAAigAoAgqKAAIoACoqoAAKigCKIAAAAAAAAAKAAAAAAAAAAoAAADzAIAAAAAAAAoigqCoACoqCgAAoAAAAqKAACgAKigACKACgCCooAAigAKiqgAAAAqAigAAAAAAAAAAKAAAAAAAAoAAADzAIAAAAAAoAAAKIogACiKAACgAAACooAACooAAKAIoAKIogqKAAIoigAAoiqgAAAIKgCgAAAAAAAAAAAAAICiiKKAgKIA84DIAAACgAAAAAoAAAKACgAAAAAoqAKACiKIAAoAKIogACgCKIoCoCKAAAIoiqAAAAgACiAKIAogAACiAAAAAoAAAAADABARQVBQEFQAVBQAAAUAAARQAAAUAAVFAAAVFAAEURQFRRABRRFEFQBQBBUAUAQABRAFEVUAAAAAAAAAAAAABQAAAAAAAGADKgAAAAAoAAigqCoAAKAAACgAAAKAAAAACgAKiiAAKIogqAKAqCoAoAgqAKICKAAAAqAiiCiiAKICqAAAACAoigAAAAAAwFGVQFBBQVAAABQBAAFEUBBUFAAAAABVEUAAAARRFAABRBUUAFEUQAEURQABFEFFAEFQBRAFAAAAAAAAAAAAAAAAAAAFAAZAMqAAAAAAgoKgoCACgAoAAigqCiCAKAAKIoAAAAKIogACiKIACKIqgAIKgCiKIAAogqKIoAAAAAAKIAogCiAKIAoAoCAogCiAMwGFAAABQAAAAAVBQEAFAAABQAEAFAAFQBRFAAEFQBRBUUABUBFEUQABRBUUAQABRAFAEAFAAFEAUQBQEAAAAUAAAAAAABwAy0IoCKAIKgACKAAACoKAgAoAAAKgAAAAAAACoAogqKAAAIogIoCgAIogIoACoKiiAKIoAAgqAKIAoigACgAAAKIAogAAAADkBhoAAAARQVBUAAFAEAAVAAABQAEAAAFAAABABQAAAEFQUURRAAQAEUQUURRAARRAFEAUBQVAFEAURQAEAAFEAUQBRAFEBVEAQBhQAAAUAAAFQAAAUAQQAUAARUFAAAAAABBRUABUBBUAUQVFEBFAUABFEBFEBFEVQAEUQBRFAABRAFEUAABUAUQFUQBRAFAAABAGGgAAAABFAAQVAABQAVAAAEVAAAAAQAAABQBAUQBRBUUQEUQBRBUUAQVBUUQBRARQAFQEUQUUABUAUQBQEBUBVEAUAAAAAAAFRUYaAAAAABQBBBUFAAAQUAARUFAEBFQUAABAAFAAAQEUQUUQEUQVFEBFEFFEBFAEUQVFEAURQUQEURQFQBRAFAFFQBRAFEUABAAFAAUBhQAUAAAAAFQAABFEVAABUAAARUAAEAAABBQAAEAUQVFEAUQVFEBFEFRRARRBUUAFEBFEAUAFEFFAQUQBRAFVAFEAUAUAAAAAB0Aw0AAAAAAIqIoAAAKgCAioKACoAAgIAIKAACAAIoogIqAoACACoAKgAIAKKICKICKIqoKgCiAKqAKIAqoAogCgAogKoggoAAAAAOwGGgAAABAFAAAEUQAAQUAQEAURUABEUAAQAEAAEBRBQBBFEFRRBRRBUUQEUQVFEBFAVFEAURRFEFFEUFEAURUFEAURRVEAUQBQAAAAAaCDDSiAAAAAoAgIAoCAqAiiAACIoCCgIgAiACCqgAIAAIqKIAALqACoAiooCoAKiiCoogIoiqKICKIoKIAoAKIAqoCqIAqoAogCiCCgCgANAGVAAAEUBAVAABBVQEAQFARFARABBQEQABUAAQAARQBBFQAARUUQEUQUUQVlRBUUQVFVBRRARVcqIogoqoAoigKgCgCqIAoioKIAogCgCgANRBhVEAABQAAQAARQQABEUAFQEQARFARBUBVEABAUBAAEVFQABARUAAEVFEBFEVUUQVFEFRVQVFEAVUBFEVRRAFVAFEVFUQBRFBRAFEBVEUAAGoDCgICiAqoAAACAigIACIqoCKIIgAIqAKCAKICggACCgCCACgICAAgIAogIogqKIqoogqKIogqCooAKIoKIAoCiiKiioAoigKgCiAqiKAADUBhQAAAUEAAAARFAQFQRFVBEVUEQABRAAQFBAFEBQQABBUAQFQFQBBFEBFEBFEAUQGVAaFEBFVBUURQUQUVUAURQURQFQFURUAABUBVEAUQBsAyoAAAigIAAACIoCAqCIoCIoCIAIKqCKKgiioIKqCKKgAICoCAAIIogIogqAAgAIKgIoiqiiCooAKIqoKgCqgKoACooAAqiAKAAqAKICqIA3EGFVAAAABEVUAAEFARBUERQERQEABBQEUAQAEUAQAQUAQAEUUQEVAEABAAQAEFQEURWkFQEVUFRRFBRBRVQBQBVEUAAFEUUAQUQBRAFEAbiDDSiAAAAIKAACCACCgIigIgAiKCCgICggoIACCKKgiioAAgqKgAACAAyACAAiiAigNIogIoCiiKIoigKgKoAKIooqAKIoAAqiAKIAogDcQYaVAAAABEAAUQAARFAQAERRARRAAQRVVBFAEAEFAQUBAAAQEBFEFRRBEUAQAVlRFVABUURRBUFFVAFEUFEUBUBVEUBUBVEUAAFEBVEAUQBugObQAAAAIAACiAgAgoIICAKIIgAgoCKCAqiCACCgCKKgACAiiAiiAiiAyoAgqCsqAqCoKiiKqKIAqoAoAKIoCoCqAKogCgCioAogCiAqiANxBzVRAAAUEEAABAFEABARRBBQEQEAUQRQEFUQQFQFAQEAAARUABFEBFEBlQFRRFVkAVlRARQFRRFAVAFVAVQBVEUAAVRFFAAUQFUQBQAAQG4g5NKIAAACAoAAgCiAgIAqAgCAiiCCiCKAIKAigAIACAgoACCAIKgIoiqyKgrNURVZAFRQBBUVQAEURQFQFVUBVAFURQABRUBVEAURRQAAAGwg5NKIAAAAgoAAgICAKIAICCiCIoggoCKCAAAAAqCAAAIIAgAqAgqKArNFRVZAUZAUABUUAAAQVBRQAFRRRUBVAFFQRVEUAAUAAAAABsA5NgACAAAAgCiKgCKgogAgIiiCCiCCiAAAACKioAgAAgCAIqAAgA0zQBWVVFEFRVQVFEAAUAABUAAUAAAFAFFQFURRQAUVAFEBVEAUQBuIOTYAAAgIACKgoCAAgoioCAgoggoggAAoAIgAgAAgCACoIAgCKgA0yoAiqiqgqKIKiiAAKAoACAKAAoAAACqAAANKIIKAKACgAAANgHJsAAQAAAQAURUARUQQEFEVBURUFRFQAABFQAAQBBAAAEVABUEVFZAFRQFRVRRBUUQVFEAAUBQAEFRQAFAAAABUUUAFABRUUUBAUAUABsA4tgAIAAACAAIAqAAiAiiAKlQFVEBAABAAABBAEAAEBUAFZQBUAFRQFRVAQUBBQEAFFAEAAFAABQAAAAUBQAUAFABVQAUAUQAf//Z',
    title: '세계에 취하다,\nON THE TRIP!',
    position: false,
    ing: true,
  },
  {
    src: event3,
    blurUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAIWAl8DASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAECAwYFBP/EABgQAQEBAQEAAAAAAAAAAAAAAAARAQIS/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQES/9oADAMBAAIRAxEAPwD64D1vAAAoigAAAAAAAIoAAAAAgIqAIqCiKiAgAiKgqJqs6gmpq6miprOrqaCazrWs6is6mrqaKzrOtazoM6mrqais6zrWs6Kms61rOgms6upoqai6gIioKgAIACiKAqKIKigoAKACqiiCoAoAAAPRAOzzgAAACoAogCgIAAoAAAAAgIACAKgCCIqAiKgqJq6moImqzoqamrrIqamrrOoJrOtazoqazrWs6DOs61rOoqazrWs6KzqaupoM6mrqaKzqLqAgIKIqAAAKgCqgIqoAqooCooKAIoAKIoAAPQgOzzgACoAogCiAKAigAAAAAACAgCiAAgICCCiCAazqpqCJq6zoprK6moqazq6mgzqaus6Kms61rOgms6us6iprOtazoqazrWs6Cazq6mioioCIAqAACAKIoCooCooiiKCqgCqgIqoAoAAAPQgOzzgAoqAKIAoggogCgAAAAiCiAAIKqCIKggCAKIIgiKgqamiaCJqs6ims6us6CamrrOiprOrqaKms6us6gmpq6zoqazq6mgms6upoqIqaCIAogACAKIoCoA0IoiiKCqgCqgCqgIoigAA9CIOzgogCiAKIIKIoKIAogCiCCiAAgKqCAoggIIKqCAIIgJogprOrrIpqaamoJqaamipqaamgms6us6ipqaus6Cazq6miprOrqaKmsrqaCahqCiCAqCAogCiAKqAKrKg0ICNCKCiKCiANCAiiAPQiDq4KIAohQUQBRAFVmgNDKoqiFBUQBRKAolSoKggqoIColKgIIKJogCaM6imoamgmppqaKmppqagms6us6Kazq6zoqamrrOgmppqaKiaamoCCCiCAIAAgCiANCANCCjSsqgqsqqKrKgqsqCiAKIA9CMjq4NDNKDQzVoKJQFpUpQUSlQUqUoLRKUFpUpQWlZpUVaJSgUQoLUqVKgtQSirUqVKC1ESopupum6gCabrOimppqbqCammpoqazq6zoGs6us6KazpqaKmppqagmppqaKIagCCCggAIAolAaEBGhmrQaEAaVmlBpWSiNCUBqlSlBaJSg9BSs0rs4NUrNKDVKzVqC0qUBaVKUFpUpQWlQoLSpSoq0qUoLSpUoLSpUoNVKlKgtRKUUpUqUFqVKlRVqbqVKC1N1Km6KbqbpupugbrO6bqVFN1ndN1N0DWd01NFNZ3TdTdQTU01ndFNTTWd0U1NNTdA1kSiqlSoCoJQUSlBSpQFqs0oNLWaA1VZpRGlrNUGqVmrQVWaUGqVKURatZpQegpWaV1cGqVmlBqlZpQapUpRVpUpQWlSlBaVKVBaVKlBqlZpQaqVKUFpWaVFWlSpQWlSpQWpUpUValSpQWpUqUVd1mlSgVN03WairWd03U3QN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',
    title: '오늘의 이벤트\n모두모아 장바구니',
    position: true,
    ing: true,
  },
  {
    src: event4,
    blurUrl:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAJfAl8DASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBQQD/8QAFhABAQEAAAAAAAAAAAAAAAAAABEB/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APsA9iAAqAAAAgCAAKgCCAIqAIIioiiKgCKiKgCCIqIqAIIioAiogiKgCKgCACACIAAioIIqKAAIAIAKAAAAAAAAAAACKAAAAogCiAKIA7ID0uYgCgAAIgAAIqIoCAAIqAiAioiiKgIAioiogICKgIgIqAICCIqAIqAgAiAAgAIAIgCgACACACgAAIAAAKgCgAACgCAAAAAAAADsAPSwAAAgACAACAIogAICKIqICAioCICKgogIICIoioggAIiogIAIACIqAIqCCKgAIIAKCAAAIIAACgAAAAAAAAAiqIAoigAAAAAA7Ag9LCoAAAAggAAICKAgAIigIgIqIogICAKgIgICKgIgIqAIIgIqAIqAIACAIgAIAIICgCAACAAACgIAogCiKAAAAigAAAAAAAAAOwIPSwogAAgAgKgIoIAAiACCgIgAiKIqIogIICAIqIogIICAICCAgCKgCAAgCCAAgCAgoAgKICAAACgAACAoAAAACKAAogCiAKIAogDsCD0MKIAAACAACKCAAIigIgAgoCIAIiiAgIIgIqCiAggIgIAICAIqAIACAIIACAAICAIoogIqAAAAAoCAKAgAAACgAKIAogCiAKIA64D0MAAAgCiCACCqgIAgKCCACIoIAICKIIgAiAgIoggCKiAggAIAiogIACCKioACAAICAIoqAIAAAgKIAogCiAKIooAAACiAKIAogCiArriD0OaiAKIIAICiAoIIKgIogAIIiqgICCIoCAICAgiKAiAgAIIgIACCAqCAAggCAAiioAgIKAIIogCiAKIAogCiAKICqIAogCiKAAAAKAA6wg7uaiAKIAogKCCCoICiCKCCAICgggCCKIIgqCCgIgIIgAgCAgIIAIACACAIIACAoCAgIAogqKgACAKIAogCiAKAKAAogCiAKIAogKogDrCDu5qIAogCiCKqCAqAgCAqoIgqCIoCIAgKCCAgiKqCIAgAgiACAIICoIACIAgoCAgIAAioqCAogIogoqAAIAogCqyoKICqIAogCiAKICqIIKIA6wg7uaiAKIAoiCqIIKICgggCCKqCAqCIAgigggIIKqCIAggIICoIAgICCAqFQAQAEFQEAVEBFQRRRAFEFRUEBRAFEAVWaCtCAKIAogCiAqiCCiAKIA6wlK7uaiUFUQQVBAWiAKIiKogAIIoIIKggoIIAggIIiqggAggIIgqFQUEBBBKAIACAAlQRRBQEBAQUUSgKiFBRCqilSgKIAogKolAVWVBRBBRAVaIAohQUSlB1hKV2YUSlBRkBRAFERFWiAKIiCiCKCAAgigggCIKqCIKgiAIICCCgggIJQVEpQBEEVKVAVBKqKhUoLUSlUWiVKI1UqUqi0qUoLSs0oNUrNKqKVKUVorNKDVKzVoKVKVBRKUVRAGis0oNUrNKDVKzSg6whXZhSpRBaIUFEoCogKoiVBaIVFVBAVBEFEqIqiJQVBEVUQQBCoCCUVaiCAggKlQQKggKlKlEKVEoLSpUqi0qVKItKzSqLSpUqo1UqUoLSs0qjVKzSg1UqUoNUrNKDVKzSqNUrNKg1Ss1aKtKlKDVKzSg1Ss0orRWaUGqVmlB1xkrq5tFZoDVRAFKlKgolBQQQWiJRVolEAQFCoILUQqKUqUQCpUqC1BBSiCAglQVKlSgtSlSoLUqVKC1KlKC1KlSgtKzSmotSpUqjVSpUqo1UqVKo1Ss1KqNUrNKDVKzSqNUrNSg3SsVaDVKzSitUrNKDdKxSg3Ss0orVKzSg1Ss0oNVaxSit0rFWg69KhXRyUqAKVKlBpKlBVKlKgtKiUFogiqlSlBUKlRVQRBUoiKqUQFqJSopREqCpSpUAqVKgtSpUqKtSpSpoUqVKaLUqVKmi1KlSqi0qVKC1KlSqNVKzUqo1Ss1Ko1SsUq6jVKzSro1Ss0q6NUrNKaNUrJV0apWVNFpUDVapWQ0apUEVatZAapWQGqVkFapWQHZpUHVxWlQoq0qUqC0qVKDVKzSgtKlKirUqFQWlRKKtEKgFSlRSiVKC0SpUFQqVFWpUqVBalKlRSlSpWdFqVKiaLUqVKgqJUqi1KVKoVKlSrgtKzRcFqVBUKICaCCpoIUZ1REDWkQVNVWQNaGVDVKhUXWhAXVEBdaEA1RAVRAFARQAHYpWaV3c2qM0oLSpSgtKlKgtKzSgpUpUVaVEoLSpURVpUogtSpSoq1KlKC1KlSoq1KVKyLUqVKmqtSpUrOi1KlEUqUqVRalSpuqLUqVN1cFqVKihQRUAQQBFZ0EBnQQVNABAAAAAAAAAABUAUQF1oQRdVWVF1RANUQF1RANdcrI6stDJQaKzQFpUpQWlSoitVKlKC0qFRVqVKVBalSlFWpUpUFqVKVlSlSpUFqVKlZtValKjItRCilSlSqFSlSqG6lSihUBQQFQEBkEFZtEEVm0AEAAAAAAAAAAAAAAAAAAAAFQBRAXVEA1VZA11qVB0VaIApWaVBqlZpRVpUAWiIgtKlEVUqUoLSpURVSlSsqtSpSpoUqVKxaq1KlEUKlSqLUqVKotSpUqi1BFAABAVkQBBBFZtBBWdABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHTEG2lEAUQBRAVaMiCiCCpUBVpUqIq0qVKgtKlSs2qtSpRmqCFQEKlVVqVKlUWpUoKICoAgioCoIAggis2iArIAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6Ig20ogCiAKgiKogCiCKCCCogiqiDNUpUoyAiCqggKiCqIIoAAAioACCAIIIrNoiorIAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA94g20ogCiAKgIoIAogigggqCMqCDNUEEUEFBBBQEUAAARUABBAEEBWaIIrNABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHtAbUAFAQFEEFQBQEQVARRAZUQRlQEABBQEUAABBQAEEAQBFQQBmoArIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2AOigAACAAKICAAiiKiAioiiKjNUQEUQFEAFEBQAEAQQAVEBBKIqKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9gDoAAAAoACCogAIoioiiKIIijNVEVGVEVFURUBBUUAAQAQRUVBFQZqAKyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9go6ogoCCgqCogACiKIIKiKIogiKIrIqMWKgqIqCooiNICIoogAiAKiAKzUAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAe0UdmUFBUFAQBAAFQUQQVEURRBEaRFRGkZqsijNisiiDIooyjSAiNIoyKiogCs1ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHuFHdlBQEFEEFBUFRAABBRFRGkRUFRBBRFZFGaMo0jNVEUQRGkBkUUZRpFRlGkVGRRUQVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdAB3YAAABUFAQUQQUFRFEEFEVEUQQVEVEaRBEaRmqyKjFEFQEFQERpFRlGkVGRRURFAQUBEaRRBQVBQEFQAAAAAAAAAAAAAAAAAAAAAAAAAAAAHRFHoYQUBAAAEBFBUFEEFEVEUBBURUFEGRRFRFGRlGkZoiNIwqIoIyKKMo0issioqIKAgoDIoogoCCgqCgMigIRQEFAQUBBQEFAQUBBQEFAQUBBQEFAQUBBQHQFHpYQUFQUBBQEFRFEUBBRBBURUFEERRFRGkQQVEVEaRkRFGbBlGkZERpBERRUZRpFZqAAIoogoCCgIAAigIKCoKAgoCCgIKAgoCCgIKAgoCCgIKAgoCCgIKA94o9bIACCiCCgqCgIAioKIIKgoiiCCoggqIqCiDIqMiI0iURFRiqgqIiI0giIqKlQBWQAEFAQUBBQVBUAAAAAAAAAAAAAAAAAAUEUBBQEFAQUBBQHQAetBFAQUBBRFQFBAEBFBUAQEURUAQQVEVBUQQVEEFRkRGkZoyKjIiNIIiKglQVFZQUUQUBBUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7xR7BBQEFAQVAAEUABBRFQBBBUFEUQQBBBURUFRkQVEERpGREVGaIijKIioqIjSKzUAEAAAAAAABQABFFEFAQUBBQEFAQUBBQEFAQUBBQEFAQUBBQHvBXtEFRAAAAAARUFAQBFEUBAEEFRFEUQQBBAEVEUZERRBkVGaIiowiCoqIioM0AVEFAQVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdAB7gAFAEEFQAAUAQEVEUAARUQAEVAEBFRARURRFRBBUZERRmoyKjFERUEEVFZqAKgAAAAACCgIKAgoCAAAAAAAAAAAAAAAAAAAAAAAA6AD3KAAAIAAIAKAIACCACgCCAIoiogIqICKiKIqICKjIgDNREXUZogCIiKis1AFQAAAAAAAAAAAAAAAAAARQEFAQAAAAAAAAAAAAAH/9k=',
    title: '난 너를 원해 넌 내게 빠져\n헤어 날수 없어 I Got you~',
    position: false,
    ing: false,
  },
]

interface WareHouseProps {
  id: number
  src: StaticImageData
  title: string
}

// 창고 정보
const WAREHOUSEIMAGES: WareHouseProps[] = [
  {
    id: 1,
    src: boxImg,
    title: '창고1',
  },
  {
    id: 2,
    src: boxImg,
    title: '창고2',
  },
  {
    id: 3,
    src: boxImg,
    title: '창고3',
  },
]

export {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  POINTS,
  CATEGORIES,
  STORAGES,
  KEEP_TYPES,
  HOMEIMAGES,
  WAREHOUSEIMAGES,
}
