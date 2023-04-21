import ItemDetails from "./ItemDetails";

function AlbumTracks({
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
    userLibrary,
    onAddReview,
    onDeleteReview,
    onUpdateReview,
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
            />
        </section>
    );
}

export default AlbumTracks;