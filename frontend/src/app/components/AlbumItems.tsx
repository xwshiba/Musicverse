import Image from 'next/image';

import { ServerAlbums } from '../types';


interface AlbumItemsProps {
    albums: ServerAlbums;
    getItemDetails: (albumId: string, reviewId: string) => void;
    loadAlbumReviews: (albumId: string) => void;
};

function AlbumItems({
    albums,
    getItemDetails,
    loadAlbumReviews,
}: AlbumItemsProps) {

    if (!albums || Object.keys(albums).length === 0) {
        return (
            <p className="albums__title">No albums in your library yet. Like more albums!</p>
        );
    };

    function loadAlbumDetails(albumId: string, reviewId : string) {
        getItemDetails(albumId, reviewId);
        loadAlbumReviews(albumId);
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
                            onClick={() => loadAlbumDetails(albumId, '')}
                        >
                            <div className="album__image">
                                <Image
                                    src={images[0].url}
                                    alt="album cover 300x300"
                                    width={300}
                                    height={300}
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

export default AlbumItems;
