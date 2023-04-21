import { useState } from 'react';

function EditReviewForm({
    reviewId,
    content,
    onUpdateReview,
    setEditViewVisibility,
}) {
    const [userReview, setUserReview] = useState('');

    function onChange(e) {
        setUserReview(e.target.value);
    };

    function onChangeReview(e, userReview) {
        e.preventDefault();
        if (userReview) {  // Don't allow blank username to try login
            setEditViewVisibility(false);
            onUpdateReview(reviewId, userReview); // "action" function we were passed in
        };
    };
    return (
        <form
            action="#/review"
            className="forms forms__change"
            method="POST"
            onSubmit={(e) => onChangeReview(e, userReview)}>
            <label className="forms__label">
                <span className="forms__tag">Write review</span>
                <textarea
                    className="forms__textarea"
                    rows="8"
                    placeholder="Share your reviews, thoughts and please be kind:)"
                    name="review"
                    defaultValue={content}
                    onChange={onChange} />
            </label>
            <div className="edit-review__control">
                <button
                    type="submit"
                    className="forms__btn btn"
                >
                    Submit
                </button>
                <button
                    className="forms__btn btn"
                    onClick={() => setEditViewVisibility(false)}
                >
                    Cancel
                </button>
            </div>
            
        </form>
    );

};

export default EditReviewForm;