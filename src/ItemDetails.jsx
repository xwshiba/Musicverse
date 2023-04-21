import AlbumBanner from "./AlbumBanner";
import ReviewForm from "./ReviewForm";
import TracksDetail from "./TracksDetail";
import AlbumControls from "./AlbumControls";

function ItemDetails({
    reviewId,
    albumId,
    userLibrary,
    onAddReview,
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
}) {    
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

    if (possibleReviewId) { // reviews already contains albumInfo in this case
        const { content, date, albumInfo } = userLibrary?.reviews[possibleReviewId];

        return (
            <div className="item-detail">
                <AlbumBanner albumInfo={albumInfo} />
                <AlbumControls
                    albumId={userLibrary?.albums?.[albumId]?.id}
                    onDeleteAlbum={onDeleteAlbum}
                    onSaveAlbum={onSaveAlbum}
                    albumInfo={albumInfo} /> 
                <TracksDetail albumTracks={albumTracks} />
                <div className="item-detail__review">
                    <h2>Your Review</h2>
                    <span className="review__date">Date: {date}</span>
                    <p className="review__content">Content: {content}</p>
                </div>

            </div>
        );
    };
    // in this case no reviews only display album Info
    // cover user saved albums and general album tracks review requests   
    const albumInfo = userLibrary?.albums?.[albumId] || albumTracks;

        return (
            <div className="item-detail">
                <AlbumBanner albumInfo={albumInfo} />
                <AlbumControls
                    albumId={userLibrary?.albums?.[albumId]?.id}
                    onDeleteAlbum={onDeleteAlbum}
                    onSaveAlbum={onSaveAlbum}
                    albumInfo={albumInfo} /> 
                <TracksDetail albumTracks={albumTracks} />
                <ReviewForm 
                    onAddReview={onAddReview}
                    albumInfo={albumInfo} />
            </div>
        );
    };


export default ItemDetails;


