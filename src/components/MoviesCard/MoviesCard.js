import './MoviesCard.css';

export default function MoviesCard(props) {
  const {
    name,
    duration,
    thumbnail,
    isLiked,
    isSaved,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick
  } = props;

  return (
    <li className='cards__item'>
      <div className='cards__container'>
        <div className='cards__info'>
        <h2 className='cards__title'>{name}</h2>
        <span className='cards__duration'>{duration}</span>
        </div>
        {isSaved ? (
          <button className='button cards__button-delete' type='button'
            onClick={handleDeleteClick} aria-label='Удалить'>
          </button>
        ) : (
          <button className={`button cards__button-like${isLiked ? ' cards__button-like_active' : ''}`}
            type='button' onClick={handleLikeClick} aria-label='Добавить в избранное'/>
        )}
      </div>
      <img className='cards__poster' src={thumbnail} alt={name} onClick={handleCardClick} />
    </li>
  );
}
