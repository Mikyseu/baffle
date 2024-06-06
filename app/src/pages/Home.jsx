import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import SongList from '../components/SongList';
import Footer from '../components/Footer';
import Profile from '../components/Profile';
import { Routes, Route } from 'react-router-dom';

function Home({ onUserLoggedOut }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [selectedSongIndex, setSelectedSongIndex] = useState(-1);
  const [songsList, setSongsList] = useState(null);
  const changeCurrentSong = selectedSong => {
    setCurrentSong(selectedSong);
  };

  const handleSongsListChange = songsList => {
    setSongsList(songsList);
  };

  const handleSongSelected = (selectedSongIndex, songsList) => {
    setSelectedSongIndex(selectedSongIndex);
    setSongsList(songsList);
  };

  return (
    <>
      <main className="min-h-screen bg-[#6E8BB3]">
        <Header onUserLoggedOut={onUserLoggedOut} />
        <Routes>
          <Route
            path="/"
            element={
              <SongList
                currentSong={changeCurrentSong}
                songsList={handleSongsListChange}
                onSongSelected={handleSongSelected}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                currentSong={changeCurrentSong}
                songsList={songsList}
                onSongSelected={handleSongSelected}
              />
            }
          />
        </Routes>

        <Footer
          song={currentSong}
          songsList={songsList}
          songIndex={selectedSongIndex}
        />
      </main>
    </>
  );
}

export default Home;
