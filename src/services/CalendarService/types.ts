export type calendar = {
  creator: string
  events: event[]
  title: string
}
export type event =
  | {
      type: 'single' | 'span'
      title: string
      start: number
      end: number | null
      description: string
      creatorId: string
      colorHue: number
    }
  | {
      type: 'fullDay'
      title: string
      description: string
      start: number
      end?: null
      creatorId: string
      colorHue: number
    }
