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
  fetchUserWords,
  fetchChangeUserWords,
  fetchAuthToken,
  fetchNewRelease,
} from './services';

import Status from './Status';
import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import UserWords from './UserWords';

function App() {

  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [username, setUsername] = useState('');
  const [isUserWordsPending, setIsUserWordsPending] = useState(false);
  const [userWords, setUserWords] = useState('');


  function onLogin(username) {
    setLoginStatus(LOGIN_STATUS.PENDING);
    setIsUserWordsPending(true);
    fetchLogin(username)
      .then(userData => {
        setError(''); // in case another action had set an error
        setUserWords(userData.storedWord); // revise
        setIsUserWordsPending(false);
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch(err => {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        setError(err?.error || 'ERROR');
        setIsUserWordsPending(false);
      });
  };

  function onLogout(e) {
    e.preventDefault();
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setUserWords('');
    fetchLogout() // We don't really care about results
      .catch(err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      });
  };

  function onChangeWord(word) {
    setIsUserWordsPending(true);

    fetchChangeUserWords(word)
      .then(userData => {
        setError('');
        setUserWords(userData.storedWord);
        setIsUserWordsPending(false);
      })
      .catch(err => {
        console.log(err);
        if (err?.error === SERVER.AUTH_MISSING) { // session expired
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        };
        setIsUserWordsPending(false);
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      });
  };

  function loadHomePage() {
    fetchAuthToken()
      .then(tokenInfo => {
        return fetchNewRelease(tokenInfo.access_token, tokenInfo.token_type);
      })
      .then(newAlbumsInfo => {
        console.log(newAlbumsInfo.albums.items);
      })
      .catch(err => {
        console.log(err);
        if (err?.error === CLIENT.NO_SESSION) { // expected "error"
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          // Not yet logged in isn't a reported error
          return;
        }
        // For unexpected errors, report them
        setError(err?.error || 'ERROR');
      })
  };

  function checkForSession() {
    fetchSession()
      .then(session => { // The returned object from the service call
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // We do not have todos yet!
        return fetchUserWords(); // By returning this promise we can chain the original promise
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
        }
        return Promise.reject(err); // Pass any other error unchanged
      })
      .then(userData => {
        setUserWords(userData.storedWord);
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
      //checkForSession();
      loadHomePage();
    },
    [] // Only run on initial render
  );

  return (
    <div className="app">
      <main className="word">
        {error && <Status error={error} />}
        {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <h1>Welcome, {username}!</h1>
            <UserWords
              isUserWordsPending={isUserWordsPending}
              userWords={userWords}
              onChangeWord={onChangeWord}
            />
            <Controls onLogout={onLogout} />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;