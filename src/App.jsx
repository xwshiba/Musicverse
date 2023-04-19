import { useState, useEffect } from 'react';

import './App.css';
import './Forms.css';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchAuthToken,
  fetchNewRelease,
  fetchSearch,
  fetchAlbumTracks,
  fetchUserLibrary,
  fetchSaveAlbum
} from './services';

import Nav from './Nav';
import Status from './Status';
import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import UserLibrary from './UserLibrary';
import Albums from './Albums';
import AlbumTracks from './AlbumTracks';

function App() {

  const [page, setPage] = useState('Albums');
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [username, setUsername] = useState('');
  const [isUserLibraryPending, setIsUserLibraryPending] = useState(false);
  const [userLibrary, setUserLibrary] = useState({});

  const [prompt, setPrompt] = useState('New Albums');
  const [albums, setAlbums] = useState({});
  const [isAlbumsPending, setIsAlbumsPending] = useState(false);

  const [albumTracks, setAlbumTracks] = useState({});
  const [isAlbumTracksPending, setIsAlbumTracksPending] = useState(false);


  function onLogin(username) {
    setLoginStatus(LOGIN_STATUS.PENDING);
    setIsUserLibraryPending(true);
    fetchLogin(username)
      .then(userData => {
        setError(''); // in case another action had set an error
        setUserLibrary(userData);
        setIsUserLibraryPending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setError(err?.error || 'ERROR');
        setIsUserLibraryPending(false);
      });
  };

  function onLogout(e) {
    e.preventDefault();
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setUserLibrary({});
    fetchLogout() // We don't really care about results
      .catch(err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      });
  };

  function loadAlbumsPage() {
    setIsAlbumsPending(true);
    setPrompt('New Albums');

    fetchAuthToken()
      .then(tokenInfo => {
        return fetchNewRelease(tokenInfo.access_token, tokenInfo.token_type);
      })
      .then(newAlbumsInfo => {
        setAlbums(newAlbumsInfo.albums.items);
        setIsAlbumsPending(false);
      })
      .catch(err => {
        console.log(err);
        setIsAlbumsPending(false);
        if (err?.error === CLIENT.NO_SESSION) { // expected "error"
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          // Not yet logged in isn't a reported error
          return;
        }
        // For unexpected errors, report them
        setError(err?.error || 'ERROR');
      })
  };

  function loadAlbumTracks(id){
    setIsAlbumTracksPending(true);
    setPage('AlbumTracks');

    fetchAuthToken()
      .then(tokenInfo => {
        return fetchAlbumTracks(tokenInfo.access_token, tokenInfo.token_type, id);
      })
      .then(tracksInfo => {
        setAlbumTracks(tracksInfo);
        setIsAlbumTracksPending(false);
      })
      .catch(err => {
        console.log(err);
        setIsAlbumTracksPending(false);
        if (err?.error === CLIENT.NO_SESSION) { // expected "error"
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          // Not yet logged in isn't a reported error
          return;
        }
        // For unexpected errors, report them
        setError(err?.error || 'ERROR');
      })
  };

  function onSearch(query) {
    setIsAlbumsPending(true);
    setPage('Albums');
    setPrompt('Search Results');

    fetchAuthToken()
      .then(tokenInfo => {
        return fetchSearch(query, tokenInfo.access_token, tokenInfo.token_type);
      })
      .then(searchedAlbumsInfo => {
        setAlbums(searchedAlbumsInfo.albums.items);
        setIsAlbumsPending(false);
      })
      .catch(err => {
        console.log(err);
        setIsAlbumsPending(false);
        if (err?.error === CLIENT.NO_SESSION) { // expected "error"
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          // Not yet logged in isn't a reported error
          return;
        }
        // For unexpected errors, report them
        setError(err?.error || 'ERROR');
      })
  };

  function onAddAlbum(albumInfo) {
    setIsUserLibraryPending(true);

    fetchSaveAlbum(albumInfo)
      .then(albumData => {
        const { albums } = userLibrary;
        // prevent obj mutation
        const updated_albums = {
          ...albums,
          [albumData.id]: albumData,
        };

        setUserLibrary({
          ...userLibrary,
          albums: updated_albums,
        });

        setIsUserLibraryPending(false);
      })
      .catch(err => {
        console.log(err);
        if (err?.error === SERVER.AUTH_MISSING) { // session expired
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        };
        setIsUserLibraryPending(false);
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      });
  };

  function checkForSession() {
    fetchSession()
      .then(session => { // The returned object from the service call
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // We do not have todos yet!
        return fetchUserLibrary(); // By returning this promise we can chain the original promise
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
        }
        return Promise.reject(err); // Pass any other error unchanged
      })
      .then(userData => {
        setUserLibrary(userData);
      })
      .catch(err => {
        console.log(err);
        if (err?.error === CLIENT.NO_SESSION) { // expected "error"
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          // Not yet logged in isn't a reported error
          return;
        }
        // For unexpected errors, report them
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      });

  };

  // Here we use a useEffect to perform the initial loading
  // Initial loading isn't triggered by an event like most service calls
  useEffect(
    () => {
      checkForSession();
      loadAlbumsPage();
    },
    [] // Only run on initial render
  );

  return (
    <div className="app">
      <main className="main">
        <Nav
          onSearch={onSearch} 
          username={username} 
          setPage={setPage}
          onLogout={onLogout} /> 
        {/* can use useContext */}
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && page === 'Login' && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <h1>Welcome, {username}!</h1>
            <UserLibrary
              isUserLibraryPending={isUserLibraryPending}
              userLibrary={userLibrary}
            />
            <Controls onLogout={onLogout} />
          </div>
        )}
        {isAlbumsPending === true && page === 'Albums' && <Loading className="albums__waiting">Loading Albums...</Loading>}
        {isAlbumsPending === false && page === 'Albums' && <Albums prompt = {prompt} albums = {albums} loadAlbumTracks={loadAlbumTracks}/>}
        {isAlbumTracksPending === true && page === 'AlbumTracks' && <Loading className="albums__waiting">Loading Tracks...</Loading>}
        {isAlbumTracksPending === false && page === 'AlbumTracks' && <AlbumTracks albumTracks={albumTracks} onAddAlbum={onAddAlbum}/>}
      </main>
    </div>
  );
};

export default App;