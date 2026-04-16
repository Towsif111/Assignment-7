
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/Homepage.jsx'
import { FriendsProvider } from './context/FriendsContext.jsx'
import { TimelineProvider } from './context/TimelineContext.jsx'

function App() {
  return (
    <FriendsProvider>
      <TimelineProvider>
        <main className="min-h-screen bg-slate-100">
          <Navbar />
          <div className="mx-auto w-full max-w-6xl">
            <div className="px-4 py-8 sm:px-6 lg:px-8">
              <HomePage />
            </div>
          </div>
        </main>
      </TimelineProvider>
    </FriendsProvider>
  )
}

export default App
