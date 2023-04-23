import AlbumItems from './AlbumItems';
import ReviewItems from './ReviewItems';

function LibraryItem({
    userLibrary,
    getItemDetails,
    loadAlbumReviews,
}) {
    const { albums, reviews } = userLibrary;

    return (
        <>
            <AlbumItems
                albums={albums}
                getItemDetails={getItemDetails}
                loadAlbumReviews={loadAlbumReviews} />
            <ReviewItems
                reviews={reviews}
                getItemDetails={getItemDetails}
                loadAlbumReviews={loadAlbumReviews} />
        </>
    );
}

export default LibraryItem;
