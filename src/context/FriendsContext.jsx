import { createContext, useContext, useEffect, useState } from 'react'

const FriendsContext = createContext({ friends: [], loading: true, error: '' })

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadFriends() {
      try {
        const response = await fetch('/Friends.json')
        if (!response.ok) {
          throw new Error('Failed to load friends data.')
        }

        const data = await response.json()
        if (!isMounted) {
          return
        }

        setFriends(Array.isArray(data) ? data : [])
      } catch (err) {
        if (!isMounted) {
          return
        }
        setError(err instanceof Error ? err.message : 'Something went wrong while loading friends.')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadFriends()

    return () => {
      isMounted = false
    }
  }, [])

  function getFriendById(id) {
    const numericId = Number(id)
    return friends.find((friend) => friend.id === numericId)
  }

  return (
    <FriendsContext.Provider value={{ friends, loading, error, getFriendById }}>
      {children}
    </FriendsContext.Provider>
  )
}

export function useFriends() {
  return useContext(FriendsContext)
}