import { useState } from 'react';

import { ServerAlbumInfo, ServerAlbumTracks, ServerAlbumReviews, ServerUserLibrary, SpotifyReturnedAlbums } from '../types';

import AlbumBanner from "./AlbumBanner";
import ReviewForm from "./ReviewForm";
import TracksDetail from "./TracksDetail";
import AlbumControls from "./AlbumControls";
import AlbumReviews from './AlbumReviews';
import UserReview from './UserReview';


interface ItemDetailsProps {
    albums: SpotifyReturnedAlbums;
    reviewId: string;
    albumId: string;
    userLibrary: ServerUserLibrary;
    onAddReview: (albumId: string, albumInfo: ServerAlbumInfo) => void;
    albumTracks: ServerAlbumTracks;
    onSaveAlbum: (albumInfo: ServerAlbumInfo) => void;
    onDeleteAlbum: (albumId: string) => void;
    onDeleteReview: (albumId: string) => void;
    onUpdateReview: (albumId: string, review: string) => void;
    albumReviews: ServerAlbumReviews;
};

function ItemDetails({
    albums,
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
        return ''; // Return an empty string if no review is found
    };

    const existedReview = getReviewByAlbum(albumId);
    const possibleReviewId = reviewId || existedReview; // empty string or reviewId

    // Ensure possibleReviewId is a valid string before using it
    const targetReview = possibleReviewId ? userLibrary?.reviews?.[possibleReviewId] : null;

    const albumInfo: ServerAlbumInfo = userLibrary?.albums?.[albumId] || 
        albums?.items?.find((album) => album.id === albumId) || {
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
