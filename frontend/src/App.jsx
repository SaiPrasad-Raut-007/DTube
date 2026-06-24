import './App.css'

import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'

// Pages
import HomePage from './pages/Home/Home'
import ChannelPage from './pages/Channel/Channel'
import VideoPlayerPage from './pages/VideoPlayer/VideoPlayer'
import AuthPage from './pages/AuthPage/AuthPage'
import SubscriptionsContainerPage from './pages/Subscription/Subscription'
import SearchResultPage from './pages/SearchResult/SearchResult'
import PlaylistDetails from './pages/PlaylistDetails/PlaylistDetails'
import LibraryPage from './pages/Library/Library'
import SettingsPage from './pages/Settings/Settings';

function App() {
  const [sidebarActive, setSidebarActive] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthPage />} />

        <Route element={<MainLayout sidebarActive={sidebarActive} setSidebarActive={setSidebarActive} />}>
          <Route index element={<HomePage />} />

          <Route path='/watch' element={<VideoPlayerPage />} />
          <Route path='/channel' element={<ChannelPage />} />
          <Route path='/playlist' element={<PlaylistDetails />} />
          <Route path='/library' element={<LibraryPage />} />
          <Route path='/results' element={<SearchResultPage />} />
          <Route path='/subscriptions' element={<SubscriptionsContainerPage />} />
          <Route path='/settings' element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const MainLayout = ({sidebarActive, setSidebarActive}) => {
  return (
    <>
      <Header sidebarActive={sidebarActive} setSidebarActive={setSidebarActive}/>
      <Sidebar sidebarActive={sidebarActive}/>

      <main className={`app-layout ${!sidebarActive ? 'collapsed' : ''}`}>
        <Outlet />
      </main>
    </>
  )
}

export default App
