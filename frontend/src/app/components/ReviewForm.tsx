import { useState } from 'react';

import { ServerAlbumInfo } from '../types';


interface ReviewFormProps {
    onAddReview: (userReview: string, albumInfo: ServerAlbumInfo) => void;
    albumInfo: ServerAlbumInfo;
};

function ReviewForm({
    onAddReview,
    albumInfo,
} : ReviewFormProps) {
    const [userReview, setUserReview] = useState('');

    function onChange(e : React.ChangeEvent<HTMLTextAreaElement>) {
        setUserReview(e.target.value);
    };

    function onSubmitReview(e: React.FormEvent<HTMLFormElement> , userReview : string, albumInfo : ServerAlbumInfo) {
        e.preventDefault();
        if (userReview.trim()) {  // Don't allow blank username to try login
            onAddReview(userReview, albumInfo); // "action" function we were passed in
        };
    };

    return (
        <div className="review-form">
            <h2>Write Your Reviews</h2>
            <form
                action="#/review"
                className="forms forms__review"
                method="POST"
                onSubmit={(e) => onSubmitReview(e, userReview, albumInfo)}>
                <label className="forms__label">
                    <textarea
                        className="forms__textarea"
                        rows={8}
                        placeholder="Share your reviews, thoughts and please be kind:)"
                        name="review"
                        onChange={onChange} />
                </label>
                <button
                    type="submit"
                    className="forms__btn btn"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
