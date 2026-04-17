
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/Homepage.jsx'
import FriendDetailsPage from './pages/FriendDetailsPage.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
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
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/friends/:id" element={<FriendDetailsPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
          <Footer />
        </main>
      </TimelineProvider>
    </FriendsProvider>
  )
}

export default App
