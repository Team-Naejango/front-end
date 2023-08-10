import { DataTypes } from '@/app/components/molecule/tab/RadioPicker'

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

export {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  POINTS,
}
