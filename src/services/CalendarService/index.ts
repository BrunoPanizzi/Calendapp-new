import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore'

import { db, Auth } from '../../../firebase'
import { calendar, event } from './types'

async function addCalendar({ title }: { title: string }) {
  const newCalendar: calendar = {
    title,
    events: [],
    creator: Auth.currentUser!.uid,
  }
  return addDoc(collection(db, 'calendars'), newCalendar)
}

function getCalendars(uid: string) {
  return query(collection(db, 'calendars'), where('creator', '==', uid))
}

function getCalendar(id: string) {
  return doc(db, `calendars/${id}`)
}

function addEvent(calendarId: string, eventDetails: event) {
  const calendarRef = doc(db, `calendars/${calendarId}`)
  return updateDoc(calendarRef, {
    events: arrayUnion({
      ...eventDetails,
      creatorId: Auth.currentUser!.uid,
    }),
  })
}
function deleteEvent(calendarId: string, eventDetails: event) {
  const calendarRef = doc(db, `calendars/${calendarId}`)
  const thing = {
    ...eventDetails,
    creatorId: Auth.currentUser!.uid,
  }
  console.log(thing)
  return updateDoc(calendarRef, {
    events: arrayRemove(thing),
  })
}

function deleteCalendar(calendarId: string) {
  return deleteDoc(doc(db, `calendars/${calendarId}`))
}

export default {
  addCalendar,
  getCalendar,
  getCalendars,
  addEvent,
  deleteEvent,
  deleteCalendar,
}
