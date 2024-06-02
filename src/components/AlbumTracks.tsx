import ItemDetails from "./ItemDetails";

import { Album, AlbumInfo, AlbumTracks, AllReviews, SpotifyReturnedAlbums, UserLibrary } from "@/types";

interface AlbumTracksProps {
    albumId: string;
    albums: SpotifyReturnedAlbums;
    albumTracks: AlbumTracks;
    onSaveAlbum: (albumInfo: AlbumInfo) => void;
    onDeleteAlbum: (albumId: string) => void;
    userLibrary: UserLibrary;
    onAddReview: (albumId: string, albumInfo: AlbumInfo) => void;
    onDeleteReview: (reviewId: string) => void;
    onUpdateReview: (albumId: string, review: string) => void;
    albumReviews: AllReviews;
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
