import ItemDetails from "./ItemDetails";

function AlbumTracks({
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
    userLibrary,
    onAddReview,
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
            />
        </section>
    );
}

export default AlbumTracks;