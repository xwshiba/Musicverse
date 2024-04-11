import Image from "next/image";


function Albums({
    prompt,
    albums,
    loadAlbumTracks,
    loadAlbumReviews
}) {
    if (Object.keys(albums).length === 0) {
        return (
            <p className="albums__title">No Albums to display yet, check back later</p>
        );
    };

    function loadAlbumDetails(id) {
        loadAlbumTracks(id);
        loadAlbumReviews(id);
    };

    return (
        <section className="albums">
            <h1 className="albums__title">{prompt}</h1>
            <ul className="albums__content">
                {albums.map((album) => {
                    const { id, images, name, artists } = album;
                    // images and artists are arrays
                    return (
                        <li
                            key={id}
                            className="album__item"
                            onClick={() => loadAlbumDetails(id)}
                            href={`#/albums/${id}`}>
                            <div className="album__image">
                                <Image
                                    className="album__image"
                                    src={images[0].url}
                                    alt="album cover 300x300"
                                    width = {300}
                                    height = {300}
                                />
                            </div>
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

export default Albums;
