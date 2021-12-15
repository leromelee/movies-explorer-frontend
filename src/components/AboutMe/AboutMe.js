import './AboutMe.css';
import myPhoto from '../../images/avatar.jpg';
import React from 'react';

export default function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='section__title'>Студент</h2>

      <div className='about-me__desc'>
        <h3 className='about-me__name'>Михаил</h3>
        <p className='about-me__hist'>Фронтенд-разработчик, 26 лет</p>
        <p className='about-me__bio'>
          Родился и всю жизнь прожил в Москве. Имею неоконченное высшее образование
          в в университете МГУПИ\МИРЭА. НЕ смог доучиться из-за
          некоторых проблем со здоровьем,которые, к счастью,
          недавно ушли. Собираюсь закончить дипломную работу и податься в разработчики.
        </p>
        <ul className='about-me__social-links'>
          <li>
            <a className='link about-me__social-link' href='https://vk.com/huntj' target='_blank' rel='noreferrer'>
              ВКонтакте
            </a>
          </li>
          <li>
            <a className='link about-me__social-link' href='https://github.com/leromelee' target='_blank' rel='noreferrer'>
              Github
            </a>
          </li>
        </ul>
        <img className='about-me__avatar' src={myPhoto} alt='Мое фото' />
      </div>

      <h3 className='about-me__portfolio'>Портфолио</h3>
      <ul className='about-me__portfolio-links'>
        <li>
          <a className='link about-me__portfolio-link' href='https://github.com/leromelee/how-to-learn' target='_blank' rel='noreferrer'>
            Статичный сайт
          </a>
        </li>
        <li>
          <a className='link about-me__portfolio-link' href='https://leromelee.github.io/russian-travel/' target='_blank' rel='noreferrer'>
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a className='link about-me__portfolio-link about-me__portfolio-link-last'
             href='https://leromelee.nomoredomains.rocks/' target='_blank' rel='noreferrer'>
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}
