import "./App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";

import HomePage from "./pages/Home/Home";
import ChannelPage from "./pages/Channel/Channel";
import VideoPlayerPage from "./pages/VideoPlayer/VideoPlayerPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import SubscriptionsContainerPage from "./pages/Subscription/Subscription";
import SearchResultPage from "./pages/SearchResult/SearchResult";
import LibraryPage from "./pages/Library/Library";
import SettingsPage from "./pages/Settings/Settings";
import StudioPage from "./pages/StudioPage/StudioPage";
import PlaylistPage from "./pages/PlaylistDetails/PlaylistDetails";
import TrendingPage from "./pages/Trending/TrendingPage";
import ForgetPasswordPage from "./pages/AuthPage/ForgetPasswordPage";
import RestPasswordPage from "./pages/AuthPage/RestPasswordPage";

function App() {
  const [sidebarActive, setSidebarActive] = useState(true);

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password/:token" element={<RestPasswordPage />} />

        <Route
          element={
            <MainLayout
              sidebarActive={sidebarActive}
              setSidebarActive={setSidebarActive}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/trending" element={<TrendingPage />} />

          <Route path="/watch/:id" element={<VideoPlayerPage />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route
            path="/subscriptions"
            element={<SubscriptionsContainerPage />}
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/search" element={<SearchResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const MainLayout = ({ sidebarActive, setSidebarActive }) => {
  return (
    <>
      <Header
        sidebarActive={sidebarActive}
        setSidebarActive={setSidebarActive}
      />
      <Sidebar sidebarActive={sidebarActive} />

      <main className={`app-layout ${!sidebarActive ? "collapsed" : ""}`}>
        <Outlet />
      </main>
    </>
  );
};

export default App;
