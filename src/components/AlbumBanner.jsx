function AlbumBanner({ 
    albumInfo,
}) {
    const { name, images, artists, album_type, release_date } = albumInfo;

    return (
        <div className="album-banner">
            <img className="album-banner__image" src={images[0].url} alt="album cover" />
            <span className="album-banner__type">{album_type}</span>
            <span className="album-banner__name">{name}</span>
            <span className="album-banner__date">{release_date}</span>
            <div className="album-banner__artists">
                {artists.map((artist) => {
                    const { id, name } = artist;
                    return (
                        <span key={id} className="album-banner__artist">{name}</span>
                    )
                })}
            </div>
        </div>

    );
};

export default AlbumBanner;