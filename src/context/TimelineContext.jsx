import { createContext, useEffect, useContext, useState } from 'react'

const TimelineContext = createContext({ entries: [] })
const storageKey = 'keenkeeper.timelineEntries'

function loadStoredEntries() {
  try {
    const savedEntries = window.localStorage.getItem(storageKey)

    if (!savedEntries) {
      return []
    }

    const parsedEntries = JSON.parse(savedEntries)
    return Array.isArray(parsedEntries) ? parsedEntries : []
  } catch {
    return []
  }
}

export function TimelineProvider({ children }) {
  const [entries, setEntries] = useState(loadStoredEntries)

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(entries))
    } catch {
      // Ignore storage write failures.
    }
  }, [entries])

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