import { useState } from 'react';

interface EditReviewFormProps {
    reviewId: string;
    content: string;
    onUpdateReview: (reviewId: string, content: string) => void;
    setEditViewVisibility: (visibility: boolean) => void;
};

function EditReviewForm({
    reviewId,
    content,
    onUpdateReview,
    setEditViewVisibility,
} : EditReviewFormProps) {
    const [userReview, setUserReview] = useState<string>(content);

    function onChange(e : React.ChangeEvent<HTMLTextAreaElement>) {
        setUserReview(e.target.value);
    };

    function onChangeReview(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (userReview.trim()) {  // Don't allow blank user review
            setEditViewVisibility(false);
            onUpdateReview(reviewId, userReview); // "action" function we were passed in
        };
    };

    return (
        <form
            action="#/review"
            className="forms forms__review"
            method="POST"
            onSubmit={onChangeReview}>
            <label className="forms__label">
                <textarea
                    className="forms__textarea"
                    rows={8}
                    placeholder="Share your reviews, thoughts and please be kind:)"
                    name="review"
                    value={userReview}
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
                    type="button"
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
