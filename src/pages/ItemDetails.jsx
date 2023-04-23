import { useState } from 'react';

import AlbumBanner from "../components/AlbumBanner";
import ReviewForm from "../components/ReviewForm";
import TracksDetail from "../components/TracksDetail";
import AlbumControls from "../components/AlbumControls";
import AlbumReviews from '../components/AlbumReviews';
import UserReview from '../components/UserReview';

function ItemDetails({
    reviewId,
    albumId,
    userLibrary,
    onAddReview,
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
    onDeleteReview,
    onUpdateReview,
    albumReviews,
}) {
    const [editViewVisibility, setEditViewVisibility] = useState(false);
    const [fullyOpenId, setFullyOpenId] = useState('');

    function getReviewByAlbum(albumId) {
        const { reviews } = userLibrary;
        for (let id in reviews) {
            if (reviews[id].albumInfo.id === albumId) {
                return id;
            };
        };
    };

    const existedReview = getReviewByAlbum(albumId);
    const possibleReviewId = reviewId || existedReview;

    const userReview = userLibrary?.reviews?.[possibleReviewId];

    const albumInfo = userLibrary?.albums?.[albumId] || albumTracks || userReview.albumInfo;

    return (
        <div className="item-detail">
            <AlbumBanner albumInfo={albumInfo} />
            <AlbumControls
                albumId={userLibrary?.albums?.[albumId]?.id}
                onDeleteAlbum={onDeleteAlbum}
                onSaveAlbum={onSaveAlbum}
                albumInfo={albumInfo} />
            <TracksDetail albumTracks={albumTracks} />
            <UserReview
                userReview={userReview}
                editViewVisibility={editViewVisibility}
                possibleReviewId={possibleReviewId}
                onUpdateReview={onUpdateReview}
                setEditViewVisibility={setEditViewVisibility}
                onDeleteReview={onDeleteReview} />
            <AlbumReviews 
                albumReviews={albumReviews} 
                userReviewId={possibleReviewId} 
                fullyOpenId={fullyOpenId}
                setFullyOpenId={setFullyOpenId} />
            {!userReview && <ReviewForm
                onAddReview={onAddReview}
                albumInfo={albumInfo} />}
        </div>
    );
};

export default ItemDetails;
