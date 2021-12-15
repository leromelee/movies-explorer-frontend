import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <h3 className='footer_head'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className='footer_container'>
        <nav className='footer__links'>
          <a className='link footer__link' href='https://practicum.yandex.ru' target='_blank' rel='noreferrer'>
            Яндекс.Практикум</a>
          <a className='link footer__link' href='https://github.com' target='_blank' rel='noreferrer'>
            Github</a>
          <a className='link footer__link' href='https://vk.com' target='_blank' rel='noreferrer'>
            Вконтакте</a>
        </nav>
        <p className='footer__copyright'>&copy; 2021</p>
      </div>
    </footer>
  );
}
