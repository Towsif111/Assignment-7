import { createContext, useContext, useState } from 'react'

const TimelineContext = createContext({ entries: [] })

const now = new Date()
const y = now.getFullYear()
const m = String(now.getMonth() + 1).padStart(2, '0')

const mockEntries = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  date: `${y}-${m}-${String((index % 28) + 1).padStart(2, '0')}`,
}))

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(mockEntries)

  function addInteraction(type, friendName) {
    const today = new Date().toISOString().slice(0, 10)
    const newEntry = {
      id: Date.now(),
      date: today,
      type,
      friendName,
    }

    setEntries((prevEntries) => [newEntry, ...prevEntries])
  }

  return <TimelineContext.Provider value={{ entries, addInteraction }}>{children}</TimelineContext.Provider>
}

export function useTimeline() {
  return useContext(TimelineContext)
}