import React from 'react';
import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

function NotFoundPage() {
  const history = useHistory();

  const handleClick = () => history.goBack();

  return (
    <main>
      <section className='page-not-found'>
        <h1 className='page-not-found__title'>404</h1>
        <p className='page-not-found__subtitle'>Страница не найдена</p>
        <button className='link page-not-found__button' onClick={handleClick}>Назад</button>
      </section>
    </main>
  );
}

export default NotFoundPage;
