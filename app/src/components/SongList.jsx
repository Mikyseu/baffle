import React, { useState, useEffect } from 'react';
import logic from '../logic';
import { useContext } from '../context.js';
import { logger } from '../utils';

function SongList({ currentSong, userFavorites, onSongSelected }) {
  const { showFeedback } = useContext();

  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [songFavId, setSongFavId] = useState(null);
  const [favBoolean, setFavBoolean] = useState(false);

  useEffect(() => {
    try {
      logic
        .retrieveSongs(userFavorites)
        .then(songs => {
          setSongs(songs);
          setFilteredSongs(songs);
        })
        .catch(error => showFeedback(error));
    } catch (error) {
      showFeedback(error);
    }
  }, [userFavorites]);

  useEffect(() => {
    try {
      if (favBoolean) {
        logic.addFavorite(songFavId);
      } else {
        logic.removeFavorite(songFavId);
      }
    } catch (error) {
      showFeedback(error);
    }
  }, [favBoolean, songFavId]);

  const handleSelectedSong = song => {
    currentSong(song);
    logger.debug('selectedSong -> handleSelectedSong');
  };

  const handleSearch = term => {
    setSearchTerm(term);
    const filtered = songs.filter(song =>
      song.title.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredSongs(filtered);

    logger.debug('search -> handleSearch');
  };

  const handlePlayFirstSong = () => {
    if (filteredSongs.length > 0) {
      onSongSelected(0, songs);
    }
    logger.debug('firstSong -> handlePlayFirstSong');
  };

  const handleFav = id => {
    const isFavorite = !songs.find(song => song.id === id).favorite;
    setSongFavId(id);
    setFavBoolean(isFavorite);
    const updatedSongs = songs.map(song => {
      if (song.id === id) {
        return { ...song, favorite: isFavorite };
      } else {
        return song;
      }
    });
    setSongs(updatedSongs);

    setFilteredSongs(
      updatedSongs.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    logger.debug('favoriteSong -> handleFav');
  };

  const handleSelectedSongIndex = song => {
    const selectedSongIndex = songs.indexOf(song);
    onSongSelected(selectedSongIndex, songs);
  };

  return (
    <div className="pt-[80px] pb-[140px] max-w-screen-lg pl-4">
      <div className="sticky pb-4 top-[80px] z-10 flex items-center mb-4 w-full  bg-[#6E8BB3]">
        <input
          type="text"
          placeholder="Search song..."
          onChange={e => handleSearch(e.target.value)}
          className="px-4 py-2 rounded-md pr-10 w-full mt-4"
        />
        <button
          onClick={handlePlayFirstSong}
          className="ml-auto px-2 py-2 mt-4 w-20"
        >
          <img src="../../public/play List.png" alt="play list" />
        </button>
      </div>

      <ul className="sticky top-[200px] mb-[140px] overflow-y-auto">
        {filteredSongs.map((song, index) => {
          return (
            <li
              key={song.id}
              className={`flex justify-between items-center py-1 `}
            >
              <div className="flex items-center">
                <img
                  src={`https://cdn1.suno.ai/image_${song.sunoId}.png`}
                  alt="song cover"
                  className="w-6 h-6 ml-2 mr-2"
                />
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    handleSelectedSong(song);
                    handleSelectedSongIndex(song);
                  }}
                  className="text-white font-semibold ml-2"
                >
                  {song.title}
                </a>
              </div>
              <button onClick={() => handleFav(song.id)}>
                <img
                  src={
                    song.favorite
                      ? '../public/heart.png'
                      : '../public/heart-empty.png'
                  }
                  alt="fav"
                  className="w-5 h-5 mr-4"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SongList;
