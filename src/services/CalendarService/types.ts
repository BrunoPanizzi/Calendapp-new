export type calendar = {
  creator: string
  events: event[]
  title: string
}
export type event = {
  type: 'single' | 'span'
  title: string
  start: number
  end: number
  description: string
  creatorId: string
  colorHue: number
}
