import ItemDetails from "./ItemDetails";

import { AlbumTracks, AllReviews, UserLibrary } from "@/types";

interface AlbumTracksProps {
    albumTracks: AlbumTracks;
    onSaveAlbum: (albumId: string) => void;
    onDeleteAlbum: (albumId: string) => void;
    userLibrary: UserLibrary;
    onAddReview: (albumId: string, review: string) => void;
    onDeleteReview: (reviewId: string) => void;
    onUpdateReview: (albumId: string, review: string) => void;
    albumReviews: AllReviews;
};

function AlbumTracks({
    albumTracks,
    onSaveAlbum,
    onDeleteAlbum,
    userLibrary,
    onAddReview,
    onDeleteReview,
    onUpdateReview,
    albumReviews,
}: AlbumTracksProps) {
    const { id } = albumTracks;

    return (
        <section className="album-tracks">
            <ItemDetails
                albumId={id}
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
