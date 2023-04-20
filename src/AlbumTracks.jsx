import ReviewForm from "./ReviewForm";

function AlbumTracks({
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
    userLibrary,
    onAddReview,
}) {
    const { album_type, id, images, name, release_date, tracks, artists } = albumTracks;
    const { items } = tracks;

    const formatTime = milliseconds => { // a referenced function to translate milliseconds
        const seconds = Math.floor((milliseconds / 1000) % 60);
        const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
        const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

        return [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0")
        ].join(":");
    };

    function onSubmit(e, userReview) {
        e.preventDefault(); // Remember this! Can be very confusing if page reloads
        if (userReview) {  // Don't allow blank username to try login
            // We could enforce more requirements, but I'm keeping this simple
            const reviewedAlbumInfo = {
                albumId: id,
                name,
                images,
                artists,
            };
            onAddReview(userReview, reviewedAlbumInfo); // "action" function we were passed in
        }
    };

    return (
        <section className="album-tracks">
            <img className="album-tracks__image" src={images[0].url} alt="album cover" />
            <span className="album-tracks__type">{album_type}</span>
            <span className="album-tracks__name">{name}</span>
            <span className="album-tracks__date">{release_date}</span>
            <div className="album-tracks__artists">
                {artists.map((artist) => {
                    const { id, name } = artist;
                    return (
                        <span key={id} className="album__artist">{name}</span>
                    )
                })}
            </div>

            <div className="album-tracks__control">
                {userLibrary?.albums?.[id] ? ( // avoid userLibrary empty errors
                <button
                        className="album-tracks__control-btn btn"
                    onClick={() => onDeleteAlbum(id)}>
                    Unsave The Album
                </button>): 
                (<button
                        className="album-tracks__control-btn btn"
                    onClick={() => onSaveAlbum({
                        id,
                        name,
                        images,
                        artists,
                    })}>
                    Save The Album
                </button>)}
            </div>

            <ul className="album-tracks__tracks">
                {items.map((item) => {
                    const { id, name, duration_ms } = item;
                    return (
                        <li key={id} className="album-tracks__item">
                            <span className="album-tracks__name">{name}</span>
                            <span className="album-tracks__duration">{formatTime(duration_ms)}</span>
                        </li>
                    )
                })}
            </ul>
            <ReviewForm onSubmit={onSubmit}/>
        </section>
    );
}

export default AlbumTracks;