import ItemDetails from "./ItemDetails";

import { ServerAlbumInfo, ServerAlbumTracks, ServerAlbumReviews, SpotifyReturnedAlbums, ServerUserLibrary } from "../types";

interface AlbumTracksProps {
    albumId: string;
    albums: SpotifyReturnedAlbums;
    albumTracks: ServerAlbumTracks;
    onSaveAlbum: (albumInfo: ServerAlbumInfo) => void;
    onDeleteAlbum: (albumId: string) => void;
    userLibrary: ServerUserLibrary;
    onAddReview: (albumId: string, albumInfo: ServerAlbumInfo) => void;
    onDeleteReview: (reviewId: string) => void;
    onUpdateReview: (albumId: string, review: string) => void;
    albumReviews: ServerAlbumReviews;
};

function AlbumTracks({
    albumId,
    albums,
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
    userLibrary,
    onAddReview,
    onDeleteReview,
    onUpdateReview,
    albumReviews,
}: AlbumTracksProps) {

    return (
        <section className="album-tracks">
            <ItemDetails
                albums={albums}
                albumId={albumId}
                reviewId=''
                userLibrary={userLibrary}
                onAddReview={onAddReview}
                albumTracks={albumTracks}
                onSaveAlbum={onSaveAlbum}
                onDeleteAlbum={onDeleteAlbum}
                onDeleteReview={onDeleteReview}
                onUpdateReview={onUpdateReview}
                albumReviews={albumReviews}
            />
        </section>
    );
}

export default AlbumTracks;
