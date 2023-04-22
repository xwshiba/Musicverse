import { useState } from 'react';

function ReviewForm({
    onAddReview,
    albumInfo,
}) {
    const [userReview, setUserReview] = useState('');

    function onChange(e) {
        setUserReview(e.target.value);
    };

    function onSubmitReview(e, userReview, albumInfo) {
        e.preventDefault();
        if (userReview) {  // Don't allow blank username to try login
            onAddReview(userReview, albumInfo); // "action" function we were passed in
        };
    };

    return (
        <form
            action="#/review"
            className="forms forms__change"
            method="POST" 
            onSubmit={(e) => onSubmitReview(e, userReview, albumInfo)}>
            <label className="forms__label">
                <span className="forms__tag">Write review</span>
                <textarea
                    className="forms__textarea"
                    rows="8"
                    placeholder="Share your reviews, thoughts and please be kind:)"
                    name="review" 
                    onChange={onChange}/>
            </label>
            <button
                type="submit"
                className="forms__btn btn"
            >
                Submit
            </button>
        </form>
    );
};

export default ReviewForm;