import { createContext, useContext } from 'react'

const TimelineContext = createContext({ entries: [] })

const now = new Date()
const y = now.getFullYear()
const m = String(now.getMonth() + 1).padStart(2, '0')

const mockEntries = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  date: `${y}-${m}-${String((index % 28) + 1).padStart(2, '0')}`,
}))

export function TimelineProvider({ children }) {
  return <TimelineContext.Provider value={{ entries: mockEntries }}>{children}</TimelineContext.Provider>
}

export function useTimeline() {
  return useContext(TimelineContext)
}