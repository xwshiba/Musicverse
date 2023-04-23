import EditReviewForm from './EditReviewForm';
import ReviewControls from './ReviewControls';
import ReviewDetails from './ReviewDetails';

function UserReview({
    userReview,
    editViewVisibility,
    possibleReviewId,   
    onUpdateReview,
    setEditViewVisibility,
    onDeleteReview,
}) {
    if (!userReview) {
        return '';
    };

    const { content } = userReview;

    return (
        <div className="item-detail__review">
            <h2>Your Review</h2>
            {editViewVisibility ?
                <EditReviewForm
                    reviewId={possibleReviewId}
                    content={content}
                    onUpdateReview={onUpdateReview}
                    setEditViewVisibility={setEditViewVisibility} /> :
                (<>
                    <ReviewControls
                        setEditViewVisibility={setEditViewVisibility}
                        onDeleteReview={onDeleteReview}
                        possibleReviewId={possibleReviewId} />
                    <ReviewDetails
                        userReview={userReview} />
                </>)
            }
        </div>
    )
};

export default UserReview;