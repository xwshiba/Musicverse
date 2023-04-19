function ReviewItems({ reviews }) {
    if (!reviews || Object.keys(reviews).length === 0) {
        return (
            <p className="reviews__title">No reviews yet. Write more reviews!</p>
        );
    };
    return (
        <section className="reviews">
            <h1 className="reviews__title">Reviews</h1>
            <ul className="reviews__content">
                {Object.keys(reviews).map((review) => {
                    const { id, content, date, albumId } = review;
                    const { images, name } = albumId;
                    return (
                        <li
                            key={id}
                            className="review__item"
                            href={`#/userLibrary/reviews/${id}`}>
                            <div className="review__album">
                                <img className="album__image" src={images[1].url} alt="album cover 300x300" />
                                <span className="album__name">{name}</span>
                            </div>
                            <div className="review__content">
                                <span>{date}</span>
                                <p>{content}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    );

};

export default ReviewItems;