import './Portfolio.css';

function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__items">
              <li className="portfolio__item">
                <a className="portfolio__link" href="https://github.com" target="_blank" rel="noreferrer">Статичный сайт</a>
              </li>
              <li className="portfolio__item">
                <a className="portfolio__link" href="https://github.com" target="_blank" rel="noreferrer">Адаптивный сайт</a>
              </li>
              <li className="portfolio__item">
                <a className="portfolio__link" href="https://github.com" target="_blank" rel="noreferrer">Одностраничное приложение</a>
              </li>
            </ul>
        </div>
    )
}

export default Portfolio;
