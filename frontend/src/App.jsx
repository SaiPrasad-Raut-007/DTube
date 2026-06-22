import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
  <div>
      <Header />
      <Sidebar />

      <main className="app-layout">
          <Home />
      </main>
  </div>
  )
}

export default App
