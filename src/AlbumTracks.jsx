import ItemDetails from "./ItemDetails";

function AlbumTracks({
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
    userLibrary,
    onAddReview,
    onDeleteReview,
    onUpdateReview,
    albumReviews,
}) {
    const { id } = albumTracks;
    return (
        <section className="album-tracks">
            <ItemDetails
                albumId={id}
                reviewId=''
                userLibrary={userLibrary}
                onAddReview={onAddReview}
                albumTracks={albumTracks}
                onSaveAlbum={onSaveAlbum}
                onDeleteAlbum={onDeleteAlbum}
                onDeleteReview={onDeleteReview}
                onUpdateReview={onUpdateReview}
                albumReviews={albumReviews}
            />
        </section>
    );
}

export default AlbumTracks;