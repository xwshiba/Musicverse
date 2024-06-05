import { ServerAlbumReviews } from '../types';

interface AlbumReviewsProps {
    albumReviews: ServerAlbumReviews;
    userReviewId: string;
    fullyOpenId: string;
    setFullyOpenId: React.Dispatch<React.SetStateAction<string>>;
}


function AlbumReviews({
    albumReviews,
    userReviewId,
    fullyOpenId,
    setFullyOpenId,
} : AlbumReviewsProps) {
    
    if (!albumReviews || Object.keys(albumReviews).length === 0 ||
        (Object.keys(albumReviews).length === 1 && (userReviewId in albumReviews))
        // also, if user review is the only review...
    ) {
        return (
            <div className="item-detail__all-reviews">
                <h2>All Reviews</h2>
                <p className="albums__reviews">No other users wrote any reviews for this album yet. You might be the first!</p>
            </div>
        );
    };

    function toggleReview(id : string) {
        if (id === fullyOpenId) {
            setFullyOpenId('');
        } else {
            setFullyOpenId(id);
        }
    };

    return (
        <div className="item-detail__all-reviews">
            <h2>See What Others Think About This Album</h2>
            <ul className="item-detail__review-list">
                {Object.keys(albumReviews).map((reviewId) => {
                    const { id, content, date, username } = albumReviews[reviewId];
                    if (id === userReviewId) { // here only handles other users' reviews
                        return '';
                    };

                    return (
                        <li
                            key={id}
                            className="review-list__item"
                            onClick={() => toggleReview(id)} >
                            <span className="review__username">Reviewed by: {username}</span>
                            <span className="review__date">Date: {date}</span>
                            <p className={id === fullyOpenId ? "review__content--active" : "review__content"}>{content}</p>
                            <span className="content__instructions">Click To {id === fullyOpenId ? 'Fold' : 'Read More'}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default AlbumReviews;
