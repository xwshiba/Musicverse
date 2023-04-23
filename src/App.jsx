// import relates with styles
import './css/App.css';
import './css/Icons.css';
import './css/Forms.css';
import './css/Nav.css';
import './css/Submenu.css';
import './css/AlbumBanner.css';

import './css/Home.css';
import './css/Albums.css';
import './css/AlbumTracks.css';
import './css/ItemDetail.css';
import './css/Account.css'

import { useEffect, useReducer } from 'react';
import reducer, { initialState } from './reducer';

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
  fetchUserLibrary,
  fetchSaveAlbum,
  fetchDeleteAlbum,
  fetchAddReview,
  fetchDeleteReview,
  fetchUpdateReview,
  fetchAlbumReviews,
} from './services';

import {
  fetchAuthToken,
  fetchNewAlbums,
  fetchSearch,
  fetchAlbumTracks,
} from './spotify-services'; // third-party services

import Nav from './components/Nav';
import Home from './pages/Home';
import Status from './components/Status';
import LoginForm from './pages/LoginForm';
import Loading from './components/Loading';
import Controls from './components/Controls';
import UserLibrary from './pages/UserLibrary';
import Albums from './pages/Albums';
import AlbumTracks from './pages/AlbumTracks';
import ItemDetails from './pages/ItemDetails';

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
    dispatch({ type: ACTIONS.START_LOADING_USER_LIBRARY });

    fetchLogin(username)
      .then(fetchedUserLibrary => {
        dispatch({ type: ACTIONS.LOG_IN, username, page: 'Account' });
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
    dispatch({ type: ACTIONS.SET_PAGE, page: 'Home' });
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
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      })
  };

  function loadAlbumTracks(id) {
    dispatch({ type: ACTIONS.START_LOADING_ALBUM_TRACKS, page: 'AlbumTracks' });

    fetchAuthToken()
      .then(tokenInfo => {
        return fetchAlbumTracks(tokenInfo.access_token, tokenInfo.token_type, id);
      })
      .then(fetchedAlbumTracks => {
        dispatch({ type: ACTIONS.REPLACE_ALBUM_TRACKS, albumTracks: fetchedAlbumTracks });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      })
  };

  function loadAlbumReviews(id) {
    dispatch({ type: ACTIONS.START_LOADING_ALBUM_REVIEWS });

    fetchAlbumReviews(id)
      .then(fetchedAlbumReviews => {
        dispatch({ type: ACTIONS.REPLACE_ALBUM_REVIEWS, albumReviews: fetchedAlbumReviews.albumReviews });
      })
      .catch(err => {
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
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      })
  };

  function onSaveAlbum(albumInfo) {
    dispatch({ type: ACTIONS.START_LOADING_USER_LIBRARY });

    fetchSaveAlbum(albumInfo)
      .then(fetchedSavedAlbum => {
        dispatch({ type: ACTIONS.SAVE_ALBUM, savedAlbum: fetchedSavedAlbum });
      })
      .catch(err => {
        // must report session expire and force logout
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
        };
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  };

  function onDeleteAlbum(id) {
    dispatch({ type: ACTIONS.START_LOADING_USER_LIBRARY });

    fetchDeleteAlbum(id)
      .then(() => {
        return fetchUserLibrary(); // Return the promise so we can chain
      })
      .then(userLibrary => {
        dispatch({ type: ACTIONS.REPLACE_USER_LIBRARY, userLibrary });
        // if albumInfo is deleted, just switch page
        dispatch({ type: ACTIONS.SET_PAGE, page: 'Account' });
      })
      .catch(err => {
        // must report session expire and force logout
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
        };
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  };

  function onAddReview(content, reviewedAlbumInfo) {
    dispatch({ type: ACTIONS.START_LOADING_USER_LIBRARY });

    fetchAddReview(content, reviewedAlbumInfo)
      .then(fetchedAddedReview => {
        dispatch({ type: ACTIONS.ADD_REVIEW, addedReview: fetchedAddedReview });
      })
      .catch(err => {
        // must report session expire and force logout
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
        };
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  };

  function onDeleteReview(id) {
    dispatch({ type: ACTIONS.START_LOADING_USER_LIBRARY });

    fetchDeleteReview(id)
      .then(() => {
        return fetchUserLibrary(); // Return the promise so we can chain
      })
      .then(userLibrary => {
        dispatch({ type: ACTIONS.REPLACE_USER_LIBRARY, userLibrary });
        // if review is deleted, just switch page
        dispatch({ type: ACTIONS.SET_PAGE, page: 'Account' });
      })
      .catch(err => {
        // must report session expire and force logout
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
        };
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  };

  function onUpdateReview(id, content) {
    dispatch({ type: ACTIONS.START_LOADING_USER_LIBRARY });

    fetchUpdateReview(id, content)
      .then(fetchedUpdatedReview => {
        dispatch({ type: ACTIONS.UPDATE_REVIEW, updatedReview: fetchedUpdatedReview });
      })
      .catch(err => {
        // must report session expire and force logout
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
        };
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
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
        dispatch({ type: ACTIONS.REPLACE_USER_LIBRARY, userLibrary });
        dispatch({ type: ACTIONS.SET_PAGE, page: 'Home' });
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) { // expected "error"
          dispatch({ type: ACTIONS.LOG_OUT });
          // Not yet logged in isn't a reported error
          return;
        }
        // For unexpected errors, report them
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  };

  function getItemDetails(albumId, reviewId) {
    dispatch({ type: ACTIONS.GET_ITEM_DETAILS, albumId, reviewId, page: 'ItemDetails' });
  };

  function setPage(page) {
    dispatch({ type: ACTIONS.SET_PAGE, page });
  };

  // Here we use a useEffect to perform the initial loading
  // Initial loading isn't triggered by an event like most service calls
  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );

  return (
    <div className="app">
      <main className="main">
        <Nav
          onSearch={onSearch}
          username={state.username}
          setPage={setPage}
          loadAlbumsPage={loadAlbumsPage}
          onLogout={onLogout} />
        {/* can use useContext */}
        {state.error && <Status error={state.error} />}
        {state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && state.page === 'Login' && <LoginForm onLogin={onLogin} />}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && state.page === 'Account' && (
          <div className="account">
            <h1>Welcome, {state.username}!</h1>
            <Controls onLogout={onLogout} />
            <UserLibrary
              isUserLibraryPending={state.isUserLibraryPending}
              userLibrary={state.userLibrary}
              getItemDetails={getItemDetails}
              loadAlbumReviews={loadAlbumReviews}
            />
          </div>
        )}
        {state.page === 'Home' &&
          <Home
            loadAlbumsPage={loadAlbumsPage}
            username={state.username} />}
        {state.isAlbumsPending === true && state.page === 'Albums' && <Loading className="albums__waiting">Loading Albums...</Loading>}
        {state.isAlbumsPending === false && state.page === 'Albums' &&
          <Albums
            prompt={state.prompt}
            albums={state.albums}
            loadAlbumTracks={loadAlbumTracks}
            loadAlbumReviews={loadAlbumReviews}
          />}
        {state.isAlbumTracksPending === true && state.page === 'AlbumTracks' && <Loading className="albums__waiting">Loading Tracks...</Loading>}
        {state.isAlbumTracksPending === false && state.page === 'AlbumTracks' &&
          <AlbumTracks
            albumTracks={state.albumTracks}
            onSaveAlbum={onSaveAlbum}
            onDeleteAlbum={onDeleteAlbum}
            userLibrary={state.userLibrary}
            onAddReview={onAddReview}
            onDeleteReview={onDeleteReview}
            onUpdateReview={onUpdateReview}
            albumReviews={state.albumReviews}
          />}
        {state.page === 'ItemDetails' && <ItemDetails
          userLibrary={state.userLibrary}
          albumId={state.albumId}
          reviewId={state.reviewId}
          onAddReview={onAddReview}
          onSaveAlbum={onSaveAlbum}
          onDeleteAlbum={onDeleteAlbum}
          onDeleteReview={onDeleteReview}
          onUpdateReview={onUpdateReview}
          albumReviews={state.albumReviews}
        />}
      </main>
    </div>
  );
};

export default App;
