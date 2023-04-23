function ReviewControls ({
    setEditViewVisibility, 
    onDeleteReview,
    possibleReviewId
}) {
    return (
        <div className="review__controls">
            <button
                className="btn"
                onClick={() => setEditViewVisibility(true)}
            >Edit</button>
            <button
                className="btn"
                onClick={() => onDeleteReview(possibleReviewId)}
            >Delete</button>
        </div>
    );
};

export default ReviewControls;