interface ReviewControlsProps {
    setEditViewVisibility: (value: boolean) => void;
    onDeleteReview: (value: string) => void;
    possibleReviewId: string;
};

function ReviewControls({
    setEditViewVisibility,
    onDeleteReview,
    possibleReviewId
} : ReviewControlsProps) {
    
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
