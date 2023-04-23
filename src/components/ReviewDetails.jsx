import { useState } from 'react';

function ReviewDetails({
    userReview,
}) {
    const [showContent, setShowContent] = useState(false);

    const { username, content, date } = userReview;
    return (
        <div className="review-details"
            onClick={() => setShowContent(!showContent)}>
            <span className="review__username">Reviewed by: {username}</span>
            <span className="review__date">Date: {date}</span>
            <p className={showContent ? "review__content--active" : "review__content"}>{content}</p>
            <span className="content__instructions">Click To {showContent ? 'Fold' : 'Read More'}</span>
        </div>
    )
};

export default ReviewDetails;
