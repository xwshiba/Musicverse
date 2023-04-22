function ReviewItems({ 
    reviews,
    getItemDetails,
    loadAlbumReviews,
}) {
    if (!reviews || Object.keys(reviews).length === 0) {
        return (
            <p className="reviews__title">No reviews yet. Write more reviews!</p>
        );
    };

    function loadAlbumDetails(albumId, reviewId) {
        getItemDetails(albumId, reviewId);
        loadAlbumReviews(albumId);
    };

    return (
        <section className="reviews">
            <h1 className="reviews__title">Reviews</h1>
            <ul className="reviews__content">
                {Object.keys(reviews).map((reviewId) => {
                    const { id, content, date, albumInfo } = reviews[reviewId];
                    const { id: albumId, images, name } = albumInfo;
                    return (
                        <li
                            key={ id }
                            className="review__item"
                            href={`#/userLibrary/reviews/${ id }`}
                            onClick={() => loadAlbumDetails(albumId, id)}>
                            <div className="review__album">
                                <img className="album__image" src={images[1].url} alt="album cover 300x300" />
                                <span className="album__name">{name}</span>
                            </div>
                            <div className="review__content">
                                <span>{ date }</span>
                                <p>{ content }</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    );

};

export default ReviewItems;