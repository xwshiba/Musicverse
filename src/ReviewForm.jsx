import { useState } from 'react';

function ReviewForm({
    onSubmit,
}) {
    const [userReview, setUserReview] = useState('');

    function onChange(e) {
        setUserReview(e.target.value);
    };

    return (
        <form
            action="#/comment"
            className="forms forms__change"
            method="POST" 
            onSubmit={(e) => onSubmit(e, userReview)}>
            <label className="forms__label">
                <span className="forms__tag">Write review</span>
                <textarea
                    className="forms__textarea"
                    rows="8"
                    placeholder="Share your reviews, thoughts and please be kind:)"
                    name="comment" 
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