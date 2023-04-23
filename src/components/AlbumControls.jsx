function AlbumControls({
    albumId,
    onDeleteAlbum,
    onSaveAlbum,
    albumInfo,
}) {
    return (
        <div className="album__control">
            {albumId ? (
                <button
                    className="album__control-btn btn"
                    onClick={() => onDeleteAlbum(albumId)}>
                    Unsave The Album
                </button>) :
                (<button
                    className="album__control-btn btn"
                    onClick={() => onSaveAlbum(albumInfo)}>
                    Save The Album
                </button>)}
        </div>
    )
};

export default AlbumControls;
