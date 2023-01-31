import { isSameDay } from 'date-fns'

import { event } from '../services/CalendarService/types'

export default function makeEvent(
  title: string,
  isFullDay: boolean,
  start: Date,
  end: Date | undefined,
  colorHue: number,
  description: string = ''
): event {
  let baseEvent = {
    title,
    description,
    colorHue,
    creatorId: '',
  }

  if (isFullDay) {
    const type = 'fullDay'
    return { ...baseEvent, type, start: start.valueOf() }
  }
  let type: 'single' | 'span'

  if (!end || isSameDay(start, end)) {
    type = 'single'
  } else {
    type = 'span'
  }

  return {
    ...baseEvent,
    type: type,
    start: start.valueOf(),
    end: end ? end.valueOf() : null,
  }
}
