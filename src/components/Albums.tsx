import Image from "next/image";

import { Artist } from '../types';


interface AlbumsProps {
    prompt: string;
    albums: any[]; // revise later to be more specific
    loadAlbumTracks: (id: string) => void;
    loadAlbumReviews: (id: string) => void;
};

function Albums({
    prompt,
    albums,
    loadAlbumTracks,
    loadAlbumReviews
} : AlbumsProps) {
    
    if (Object.keys(albums).length === 0) {
        return (
            <p className="albums__title">No Albums to display yet, check back later</p>
        );
    };

    function loadAlbumDetails(id : string) {
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
                            onClick={() => loadAlbumDetails(id)}>
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
                                {artists.map((artist : Artist) => {
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
