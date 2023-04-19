function AlbumTracks({
    albumTracks,
    onAddAlbum,
}) {
    const {album_type, id, images, name, release_date, tracks, artists} = albumTracks;
    const {items} = tracks;

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
                <button 
                    className="control__unsaved"
                    onClick={() => onAddAlbum({
                        id,
                        name,
                        images,
                        artists,
                    })}>
                        Save The Album
                </button>
            </div>

            <ul className="album-tracks__tracks">
                {items.map((item) => {
                    const {id, name, duration_ms} = item;
                    return (
                        <li key={id} className="album-tracks__item">
                            <span className="album-tracks__name">{name}</span>
                            <span className="album-tracks__duration">{formatTime(duration_ms)}</span>
                        </li>
                    )
                })}
            </ul>
            <form
                action="#/comment"
                className="forms forms__change"
                method="POST" >
                <label className="forms__label">
                    <span className="forms__tag">Write review</span>
                    <textarea
                        className="forms__textarea"
                        rows="5"
                        placeholder="Share your reviews, thoughts and please be kind:)"
                        name="comment" />
                </label>
                <button
                    type="submit"
                    className="forms__btn btn"
                >
                    Submit
                </button>
            </form>
        </section>
    );
}

export default AlbumTracks;