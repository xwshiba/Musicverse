function TracksDetail({
    albumTracks,
}){
    if (!albumTracks || Object.keys(albumTracks).length === 0) {
        return;
    };

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

    const { tracks } = albumTracks;
    const {items} = tracks;
    
    return (
        <ul className="album-tracks__tracks">
            {items.map((item) => {
                const { id, name, duration_ms } = item;
                return (
                    <li key={id} className="album-tracks__item">
                        <span className="album-tracks__icon gg-play-button"></span>
                        <span className="album-tracks__name">{name}</span>
                        <span className="album-tracks__duration">{formatTime(duration_ms)}</span>
                    </li>
                )
            })}
        </ul>
    );
};

export default TracksDetail;