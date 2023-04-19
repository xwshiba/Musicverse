import { useEffect, useReducer } from 'react';

import './App.css';
import './Forms.css';

import reducer, {initialState} from './reducer';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
} from './constants';

import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchAuthToken,
  fetchNewAlbums,
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

  // All our global state is from the reducer
  // Some "local" state will remain in various components
  const [state, dispatch] = useReducer(reducer, initialState);

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere if we think it helps
  // - to move, these would have to get dispatch somehow
  // - such as adding dispatch to the params
  // - or having a function that takes dispatch and returns these functions
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin(username) {
    dispatch({type: ACTIONS.START_LOADING_USER_LIBRARY});

    fetchLogin(username)
      .then(fetchedUserLibrary => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.REPLACE_USER_LIBRARY, userLibrary: fetchedUserLibrary });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  function onLogout(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout() // We don't really care about results
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  function loadAlbumsPage() {
    dispatch({ type: ACTIONS.START_LOADING_ALBUMS, page: 'Albums', prompt: 'New Albums' });

    fetchAuthToken()
      .then(tokenInfo => {
        return fetchNewAlbums(tokenInfo.access_token, tokenInfo.token_type);
      })
      .then(fetchedAlbums => {
        dispatch({ type: ACTIONS.REPLACE_ALBUMS, albums: fetchedAlbums.albums.items }); // array
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      })
  };

  function loadAlbumTracks(id){
    dispatch({ type: ACTIONS.START_LOADING_ALBUM_TRACKS, page: 'AlbumTracks' });

    fetchAuthToken()
      .then(tokenInfo => {
        return fetchAlbumTracks(tokenInfo.access_token, tokenInfo.token_type, id);
      })
      .then(fetchedAlbumTracks => {
        dispatch({ type: ACTIONS.REPLACE_ALBUM_TRACKS, albumTracks: fetchedAlbumTracks });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      })
  };

  function onSearch(query) {
    dispatch({ type: ACTIONS.START_SEARCH_ALBUMS, page: 'Albums', prompt: 'Searched Results' });

    fetchAuthToken()
      .then(tokenInfo => {
        return fetchSearch(query, tokenInfo.access_token, tokenInfo.token_type);
      })
      .then(fetchedSearchedAlbums => {
        dispatch({ type: ACTIONS.REPLACE_ALBUMS, albums: fetchedSearchedAlbums.albums.items }); // array
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      })
  };

  function onSaveAlbum(albumInfo) {
    dispatch({ type: ACTIONS.START_LOADING_USER_LIBRARY });

    fetchSaveAlbum(albumInfo)
      .then(fetchedSavedAlbum => {
        dispatch({ type: ACTIONS.SAVE_ALBUM, savedAlbum: fetchedSavedAlbum});
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  function checkForSession() {
    fetchSession()
      .then(session => { // The returned object from the service call
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchUserLibrary(); // By returning this promise we can chain the original promise
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
        }
        return Promise.reject(err); // Pass any other error unchanged
      })
      .then(userLibrary => {
        dispatch({ type: ACTIONS.REPLACE_USER_LIBRARY, userLibrary})
      })
      .catch(err => {
        console.log(err);
        if (err?.error === CLIENT.NO_SESSION) { // expected "error"
          dispatch({ type: ACTIONS.LOG_OUT });
          // Not yet logged in isn't a reported error
          return;
        }
        // For unexpected errors, report them
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
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
          username={state.username} 
          setPage={( page ) => dispatch({ type: ACTIONS.SET_PAGE, page})}
          onLogout={onLogout} /> 
        {/* can use useContext */}
        {state.error && <Status error={state.error} />}
        {state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && state.page === 'Login' && <LoginForm onLogin={onLogin} />}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <h1>Welcome, {state.username}!</h1>
            <UserLibrary
              isUserLibraryPending={state.isUserLibraryPending}
              userLibrary={state.userLibrary}
            />
            <Controls onLogout={onLogout} />
          </div>
        )}
        {state.isAlbumsPending === true && state.page === 'Albums' && <Loading className="albums__waiting">Loading Albums...</Loading>}
        {state.isAlbumsPending === false && state.page === 'Albums' && <Albums prompt = {state.prompt} albums = {state.albums} loadAlbumTracks={loadAlbumTracks}/>}
        {state.isAlbumTracksPending === true && state.page === 'AlbumTracks' && <Loading className="albums__waiting">Loading Tracks...</Loading>}
        {state.isAlbumTracksPending === false && state.page === 'AlbumTracks' && <AlbumTracks albumTracks={state.albumTracks} onAddAlbum={onSaveAlbum}/>}
      </main>
    </div>
  );
};

export default App;