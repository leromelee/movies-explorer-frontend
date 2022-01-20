import './AboutProject.css';
import React from "react";

export default function AboutProject() {
  return (
    <section className='about-project' id='about'>
      <h2 className='section__title'>О проекте</h2>
      <ul className='about__items'>
        <li className='about__item'>
          <h3 className='about__heading'>Дипломный проект включал 5 этапов</h3>
          <p className='about__item-desc'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='about__item'>
          <h3 className='about__heading'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__item-desc'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className='about__weeks'>
        <li className='about__week'>
          <h3 className='about__week-heading'>1 неделя</h3>
          <p className='about__week-desc'>Back-end</p>
        </li>
        <li className='about__week about__week_extended'>
          <h3 className='about__week-heading about__week-heading_light'>4 недели</h3>
          <p className='about__week-desc'>Front-end</p>
        </li>
      </ul>
    </section>
  );
}
