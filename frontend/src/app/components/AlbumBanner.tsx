import Image from 'next/image';

import { ServerAlbumInfo } from '../types';


interface AlbumBannerProps {
    albumInfo: ServerAlbumInfo;
};

function AlbumBanner({
    albumInfo,
} : AlbumBannerProps) {

    const { name, images, artists, album_type, release_date } = albumInfo;

    return (
        <div className="album-banner">
            <div className="album-banner__image">
                <Image
                    src={images[0].url}
                    alt="album cover"
                    width={300}
                    height={300}
                />
            </div>
            <div className="album-banner__info">
                <span className="album-banner__type">{album_type}</span>
                <h1 className="album-banner__name">{name}</h1>
                <div className="album-banner__other">
                    <div className="album-banner__artists">
                        {artists.map((artist) => {
                            const { id, name } = artist;
                            return (
                                <span key={id} className="album-banner__artist">{name}</span>
                            )
                        })}
                    </div>
                    <span className="album-banner__date">{release_date}</span>
                </div>
            </div>
        </div>

    );
};

export default AlbumBanner;
