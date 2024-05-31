import { useState } from 'react';

import { AlbumInfo, AlbumTracks, AllReviews, UserLibrary } from '@/types';

import AlbumBanner from "./AlbumBanner";
import ReviewForm from "./ReviewForm";
import TracksDetail from "./TracksDetail";
import AlbumControls from "./AlbumControls";
import AlbumReviews from './AlbumReviews';
import UserReview from './UserReview';


interface ItemDetailsProps {
    reviewId: string;
    albumId: string;
    userLibrary: UserLibrary;
    onAddReview: (albumId: string, review: string) => void;
    albumTracks: AlbumTracks;
    onSaveAlbum: (albumId: string) => void;
    onDeleteAlbum: (albumId: string) => void;
    onDeleteReview: (albumId: string) => void;
    onUpdateReview: (albumId: string, review: string) => void;
    albumReviews: AllReviews;
};

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
} : ItemDetailsProps) {

    const [editViewVisibility, setEditViewVisibility] = useState<boolean>(false);
    const [fullyOpenId, setFullyOpenId] = useState<string>('');

    function getReviewByAlbum(albumId : string) {
        const { reviews } = userLibrary;
        for (let id in reviews) {
            if (reviews[id]?.albumInfo?.id === albumId) {
                return id;
            };
        };
    };

    const existedReview = getReviewByAlbum(albumId);
    const possibleReviewId = reviewId || existedReview; // empty string or reviewId

    const targetReview = userLibrary?.reviews?.[possibleReviewId];

    const albumInfo: AlbumInfo = userLibrary?.albums?.[albumId] || {
        ...albumTracks,
        ...targetReview?.albumInfo,
    };

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
                userReview={targetReview}
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
            {!targetReview && <ReviewForm
                onAddReview={onAddReview}
                albumInfo={albumInfo} />}
        </div>
    );
};

export default ItemDetails;
