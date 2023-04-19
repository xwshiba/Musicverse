function AlbumItems({ albums }) {
    if (!albums || Object.keys(albums).length === 0) {
        return (
            <p className="albums__title">No albums in your library yet. Like more albums!</p>
        );
    };

    return (
        <section className="albums">
            <h1 className="albums__title">Saved Albums</h1>
            <ul className="albums__content">
                {Object.keys(albums).map((albumId) => {
                    const { id, images, name, artists } = albums[albumId];
                    // images and artists are arrays
                    return (
                        <li
                            key={id}
                            className="album__item"
                            href={`#/userLibrary/albums/${id}`}>
                            <img className="album__image" src={images[1].url} alt="album cover 300x300" />
                            <span className="album__name">{name}</span>
                            <div className="album__artists">
                                {artists.map((artist) => {
                                    const { id, name } = artist;
                                    return (
                                        <span key={id} className="album__artist">{name}</span>
                                    )
                                })}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}

export default AlbumItems;