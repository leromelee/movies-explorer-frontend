import React from 'react';
import {
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import  {
  AUTH_ERROR,
  REGISTER_ERROR,
  FORM_PROFILE_ERROR,
  FROM_PROFILE_SUCCESS,
  LOAD_ERROR,
  PAGE_ERROR
} from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import './App.css';

function App() {

  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false || localStorage.getItem('loggedIn'));
  const [currentUser, setCurrentUser] = React.useState({}); // Данные текущего пользователя
  const [formProfileError, setFormProfileError] = React.useState('');
  const [formProfileSuccess, setFormProfileSuccess] = React.useState('');
  const [formAuthError, setFormAuthError] = React.useState('');
  const [formRegisterError, setFormRegisterError] = React.useState('');
  const [loadingError, setLoadingError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]); // Фильмы с api yandex
  const [savedMovies, setSavedMovies] = React.useState([]); // Сохраненные фильмы

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      mainApi
      .checkToken(jwt)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setCurrentUser({
            name: res.name,
            email: res.email
          })
        }
      })
      .catch((err) => {
        localStorage.removeItem('jwt');
        console.log(`Ошибка: ${err}`)
      })
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      mainApi
        .getInitialProfile()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(() => {
          setCurrentUser({});
          setLoggedIn(false);
          history.push("/signin");
        })
        .finally(() => {
          setIsLoading(false);
        });
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies))
          setMovies(movies);
        })
        .catch((err) => {
          localStorage.removeItem("movies")
          console.log(`Ошибка: ${err}`)
          setLoadingError(LOAD_ERROR);
        })
        .finally(() => {
          setIsLoading(false);
        });
      mainApi.getMovies()
        .then((myMovies) => {
          setSavedMovies(myMovies);
          localStorage.setItem('savedMovies', JSON.stringify(myMovies))
        })
        .catch((err) => {
          localStorage.removeItem('savedMovies')
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setIsLoading(false)
        });

    }
  }, [loggedIn, history]);

  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then(data => {
        if (data) {
          setFormRegisterError('');
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        setFormRegisterError(REGISTER_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLogin = (email, password) => {
    setIsLoading(true);
    mainApi
    .login(email, password)
    .then(data => {
      if(data.token) {
        setLoggedIn(true);
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('jwt', data.token);
        setCurrentUser(data);
        setFormAuthError('');
        history.push("/movies");
      }
    })
    .catch((err) => {
      setLoggedIn(false);
      setFormAuthError(AUTH_ERROR);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateUser({name, email} ) {
    setIsLoading(true);
    mainApi
      .editProfile({name, email})
      .then(data => {
        if(data) {
          setCurrentUser({
            name: name,
            email: email
          })
          setFormProfileSuccess(FROM_PROFILE_SUCCESS);
          setFormProfileError('');
        }
      })
      .catch(err => {
        setFormProfileSuccess('')
        setFormProfileError(FORM_PROFILE_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onSignOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('movies')
    setCurrentUser({});
    setLoggedIn(false);
    history.push('/');
  }

  function handleMovieSave(movie) {
    setIsLoading(true);
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setLoadingError('');
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. ${err}`);
        setLoadingError(PAGE_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function deleteMovie (movie, savedMoviesPage) {
    setIsLoading(true);
    const deletedItem = savedMovies.find((item) => item.movieId === (savedMoviesPage ? movie.movieId : movie.id))
    mainApi
      .deleteMovie(deletedItem)
      .then((res) => {
        if (res) {
          const savedArray = savedMovies.filter((item) => {
            return item.movieId !== res.movie.movieId
          })
          setSavedMovies(savedArray);
          localStorage.setItem("savedMovies", JSON.stringify(savedArray));

          let filteredSavedMovies = JSON.parse(localStorage.getItem('filteredSavedMovies'));

          if (savedMoviesPage && filteredSavedMovies !== null) {
            const savedMoviesFilteredArr = filteredSavedMovies.filter((item) => {
              return item.movieId !== res.movie.movieId
            })
            localStorage.setItem("filteredSavedMovies", JSON.stringify(savedMoviesFilteredArr));
          }

          setLoadingError('');
        }
      })
      .catch((err) => {
        setLoadingError(PAGE_ERROR);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleMovieTest(movie) {
    let check = savedMovies.some((item) => {
      if (item.movieId === movie.id) {
        return true
      } else {
        return false;
      }
    })
    return check;
  }

  React.useEffect(() => {
    if (currentUser) {
      if(currentUser.email !== undefined && (history.location.pathname==='/signup' || history.location.pathname === '/signin')) {
        history.push('/movies')
      }
    }
  }, [currentUser, history])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            loadingError={loadingError}
            component={Movies}
            savedMoviesPage={false}
            handleMovieSave={handleMovieSave}
            handleMovieTest={handleMovieTest}
            movies={movies}
            deleteMovie={deleteMovie}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            loadingError={loadingError}
            component={SavedMovies}
            savedMoviesPage={true}
            movies={savedMovies}
            deleteMovie={deleteMovie}
            handleMovieTest={handleMovieTest}
          />

          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            handleUpdateUser={handleUpdateUser}
            onSignOut={onSignOut}
            formProfileError={formProfileError}
            formProfileSuccess={formProfileSuccess}
            isLoading={isLoading}
          />
          <Route exact path="/signin" >
          <Login
              handleLogin={handleLogin}
              formAuthError={formAuthError}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path="/signup" >
          <Register
              handleRegister={handleRegister}
              formRegisterError={formRegisterError}
              isLoading={isLoading}
            />
          </Route>
          <Route path="*" >
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
