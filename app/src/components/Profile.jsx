import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateSong from '../components/CreateSong';
import logic from '../logic';
import SongList from './SongList';
import { useContext } from '../context.js';

function Profile({ currentSong, onSongSelected }) {
  const { showFeedback } = useContext();
  const [view, setView] = useState(null);
  const [user, setUser] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(false);

  useEffect(() => {
    logic
      .retrieveUser()
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        alert(error);
      });
  }, []);

  const clearView = () => setView(null);

  const handleAvatarChange = event => {
    event.preventDefault();
    const avatar = event.target.avatarInput.value;
    logic
      .updateUserAvatar(user.username, avatar)
      .then(() => {
        return logic.retrieveUser();
      })
      .then(updatedUserData => {
        setUser(updatedUserData);
      })
      .catch(error => {
        showFeedback(error);
      });
  };

  const handleCreateSongClick = () => setView('create-song');

  const handleCancelCreateSongClick = () => clearView();

  const handleSongCreated = () => {
    clearView();
  };

  return (
    <section className="h-full bg-[#6E8BB3] flex flex-col justify-start mt-4 mx-4">
      <div className="sticky top-[80px] z-30 w-full bg-[#6E8BB3] flex justify-between items-start p-4">
        <Link to="/">
          <img src="../../public/home.png" alt="home" className="w-8 h-8" />
        </Link>

        <div className="mt-2 flex flex-col items-center">
          {user && (
            <img
              src={user.avatar ? user.avatar : '/Avatarsimbol.png'}
              alt="profile pic"
              className="w-20 h-20 rounded-full bg-white cursor-pointer"
              onClick={() => setChangeAvatar(!changeAvatar)}
            />
          )}

          {changeAvatar && (
            <form className="mt-4" onSubmit={handleAvatarChange}>
              <input
                id="avatarInput"
                type="url"
                className="p-1 rounded-md w-full"
              />
              <button
                type="submit"
                className="mt-4 w-full bg-[#1B1F47] text-white font-semibold p-2 rounded-md"
              >
                New avatar
              </button>
            </form>
          )}

          {user && (
            <h1 className="text-white font-bold text-xl mt-2">
              Hola, {user.username}
            </h1>
          )}
        </div>

        <button className="w-8 h-8" onClick={handleCreateSongClick}>
          <img src="../../public/addMusic.png" alt="add music" />
        </button>
      </div>

      <SongList
        userFavorites={true}
        currentSong={currentSong}
        onSongSelected={onSongSelected}
      />

      {view === 'create-song' && (
        <CreateSong
          onCancelClick={handleCancelCreateSongClick}
          onSongCreated={handleSongCreated}
        />
      )}
    </section>
  );
}

export default Profile;
