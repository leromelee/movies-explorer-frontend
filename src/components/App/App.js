import React, { useState, useEffect } from 'react';
import {
  Route, Switch, Redirect, useLocation, useHistory,
} from 'react-router-dom';

import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFoundPage from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

import * as MainApi from '../../utils/MainApi';
import * as MoviesApi from '../../utils/MoviesApi';

import CurrentUserContext from '../../context/CurrentUserContext';

export default function App() {
  const location = useLocation();
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [headerLocation, setHeaderLocation] = useState(false); // отображение header
  const [footerLocation, setFooterLocation] = useState(false); // отображение  footer
  const [backgroundHeader, setBackgroundHeader] = useState(false); // цвет фона шапки страницы
  const [isDeleteMoviesCard, setDeleteMoviesCard] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isNotFound, setNotFound] = useState(false);
  const [isErrorServer, setErrorServer] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [isMessageErrorAPI, setMessageErrorAPI] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [sendingData, setSendingData] = useState(false);
  const [messageSendingData, setMessageSendingData] = useState('');
  const [isDisabledInput, setDisabledInput] = useState(false);

  const checkToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
      MainApi.getUserInfo(token)
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(`Не удалось передать токен. Ошибка: ${err}.`);
        });
    } else {
      console.log('Нет токена - потерялся');
    }
  };

  const handleToggleCheckbox = () => {
    setCheckboxValue(!checkboxValue);
  };
  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    setLoggedIn(false);
    history.push('/');
  };
  const handleLogin = (password, email) => {
    setSendingData(true);
    setMessageSendingData('Cохранение...');
    setDisabledInput(true);
    MainApi.signin(password, email)
      .then((res) => {
        setMessageErrorAPI('');
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setSendingData(false);
        setDisabledInput(false);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(`Не удалось войти. Ошибка: ${err}.`);
        setDisabledInput(false);
        setSendingData(false);
        setMessageErrorAPI('Что-то пошло не так...');
      });
  };

  const handleRegister = (name, email, password) => {
    setSendingData(true);
    setMessageSendingData('Cохранение...');
    setDisabledInput(true);
    MainApi.register(name, email, password)
      .then(() => {
        setMessageErrorAPI('');
        setSendingData(false);
        handleLogin(name, email, password);
        setDisabledInput(false);
      })
      .catch((err) => {
        console.log(`Не удалось зарегистрироваться. Ошибка: ${err}.`);
        setDisabledInput(false);
        setSendingData(false);
        setMessageErrorAPI('Что-то пошло не так...');
      });
  };
  const handleEditUserInfo = (name, email) => {
    setDisabledInput(true);
    const token = localStorage.getItem('token');
    MainApi.editUserInfo(token, name, email)
      .then((res) => {
        setCurrentUser(res);
        setSendingData(true);
        setMessageSendingData('Данные пользователя успешно изменены');
        setDisabledInput(false);
      })
      .catch(() => {
        setSendingData(false);
        setDisabledInput(false);
        setMessageSendingData('Не удалось изменить данные пользователя');
      });
  };
  const handleSaveMoviesCard = (movie) => {
    const token = localStorage.getItem('token');
    return MainApi.saveMovie(token, movie)
      .then((savedMovie) => {
        localStorage.setItem(
          'savedMovies',
          JSON.stringify([savedMovie, ...savedMovies]),
        );
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .then((res) => res)
      .catch((err) => {
        console.log(`Не удалось сохранить фильм. Ошибка: ${err}.`);
      });
  };
  const handleDeleteMoviesCard = (movieId) => {
    const token = localStorage.getItem('token');
    return MainApi.deleteMovie(token, movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter(
          (deleteMovie) => deleteMovie._id !== movieId,
        );
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(`Не удалось удалить фильм. Ошибка: ${err}.`);
      });
  };
  const handleFilteredMovies = (movies, keyword) => {
    const filteredMoviesByKeyword = movies
      .filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
        || (movie.nameEN ? movie.nameEN : '').toLowerCase().includes(keyword.toLowerCase()));
    const filteredMoviesByCheckbox = filteredMoviesByKeyword.filter(
      (movie) => movie.duration < 40,
    );
    if (checkboxValue) {
      return filteredMoviesByCheckbox;
    }
    return filteredMoviesByKeyword;
  };

  const handleSearchMovies = (keyword) => {
    setLoading(true);
    setMovies([]);
    setNotFound(false);

    if (allMovies.length === 0) {
      MoviesApi.getMovies()
        .then((movies) => {
          setAllMovies(movies);
          const resFilteredMovies = handleFilteredMovies(movies, keyword);

          if (resFilteredMovies.length === 0) {
            setMovies([]);
            setLoading(false);
            setNotFound(true);
          } else {
            localStorage.setItem('movies', JSON.stringify(resFilteredMovies));
            setMovies(JSON.parse(localStorage.getItem('movies')));
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
          setErrorServer(true);
          setAllMovies([]);
        });
    } else {
      const resFilteredMovies = handleFilteredMovies(allMovies, keyword);
      if (resFilteredMovies.length === 0) {
        setMovies([]);
        setLoading(false);
        setNotFound(true);
      } else if (resFilteredMovies.length !== 0) {
        localStorage.setItem('movies', JSON.stringify(resFilteredMovies));
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setLoading(false);
      } else {
        setLoading(false);
        setErrorServer(true);
        setMovies([]);
      }
    }
  };

  const handleSearchSavedMovies = (keyword) => {
    const resFilteredMovies = handleFilteredMovies(
      savedMovies,
      keyword,
    );
    setSavedMovies(resFilteredMovies);
  };

  useEffect(() => {
    if (
      location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile'
      || location.pathname === '/'
    ) {
      setHeaderLocation(false);
    } else {
      setHeaderLocation(true);
    }
    if (
      location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/'
    ) {
      setFooterLocation(false);
    } else {
      setFooterLocation(true);
    }
    if (location.pathname === '/movies'
      || location.pathname === '/saved-movies') {
      setLoggedIn(true);
    }
    if (location.pathname === '/saved-movies') {
      setDeleteMoviesCard(true);
    } else {
      setDeleteMoviesCard(false);
    }
    if (location.pathname === '/') {
      setBackgroundHeader(true);
    } else {
      setBackgroundHeader(false);
    }
    if (location.pathname === '/movies'
      || location.pathname === '/saved-movies'
      || location.pathname === '/profile'
      || location.pathname === '/signup'
      || location.pathname === '/signin'
      || location.pathname === '/') {
      setMessageSendingData('');
      setMessageErrorAPI('');
    }
  }, [location]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      history.push(location.pathname);
    }
    if (loggedIn) {
      Promise.all([
        MainApi.getUserInfo(token),
        MainApi.getSavedMovies(token),
      ])
        .then(([userInfo, movies]) => {
          const userMovies = movies.filter((movie) => movie.owner === userInfo._id);
          setCurrentUser(userInfo);
          setSavedMovies(userMovies);
          if ('movies' in localStorage) {
            setMovies(JSON.parse(localStorage.getItem('movies')));
          } else {
            setMovies([]);
          }
          if (!('savedMovies' in localStorage)) {
            localStorage.setItem('savedMovies', JSON.stringify([]));
          }
        })
        .catch((err) => {
          console.log(`Данные с сервера не получены. Ошибка: ${err}.`);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(savedMovies));
  }, [savedMovies]);

  return (
    <CurrentUserContext.Provider
      value={currentUser}
    >
      <div className="page">
        <Header
          headerLocation={headerLocation}
          loggedIn={loggedIn}
          backgroundHeader={backgroundHeader}
        />
        <main className="content">
          <Switch>

            <Route exact path="/">
              <Main
                loggedIn={loggedIn}
              />
            </Route>

            <Route path="/signup">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register
                  onRegister={handleRegister}
                  isMessageErrorAPI={isMessageErrorAPI}
                  sendingData={sendingData}
                  messageSendingData={messageSendingData}
                  isDisabledInput={isDisabledInput}
                />
              )}
            </Route>

            <Route path="/signin">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login
                  onLogin={handleLogin}
                  isMessageErrorAPI={isMessageErrorAPI}
                  sendingData={sendingData}
                  messageSendingData={messageSendingData}
                  isDisabledInput={isDisabledInput}
                />
              )}
            </Route>

            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              signOut={signOut}
              onEditUserInfo={handleEditUserInfo}
              sendingData={sendingData}
              messageSendingData={messageSendingData}
              isDisabledInput={isDisabledInput}
            />

            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              checkboxOn={checkboxValue}
              handleToggleCheckbox={handleToggleCheckbox}
              isLoading={isLoading}
              movies={movies}
              savedMovies={savedMovies}
              onSearchMoviesByValue={handleSearchMovies}
              isNotFound={isNotFound}
              isErrorServer={isErrorServer}
              onSaveMoviesCard={handleSaveMoviesCard}
              onDeleteMoviesCard={handleDeleteMoviesCard}
            />

            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              checkboxOn={checkboxValue}
              handleToggleCheckbox={handleToggleCheckbox}
              movies={savedMovies}
              savedMovies={savedMovies}
              onSearchSavedMoviesByValue={handleSearchSavedMovies}
              deleteMoviesCard={isDeleteMoviesCard}
              onDeleteMoviesCard={handleDeleteMoviesCard}
            />
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </main>
        <Footer
          footerLocation={footerLocation}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
