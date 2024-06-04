import AlbumItems from './AlbumItems';
import ReviewItems from './ReviewItems';

import { ServerUserLibrary } from '../types';


interface LibraryItemProps {
    userLibrary: ServerUserLibrary;
    getItemDetails: (albumId: string, reviewId: string) => void;
    loadAlbumReviews: (id: string) => void;
};

function LibraryItem({
    userLibrary,
    getItemDetails,
    loadAlbumReviews,
} : LibraryItemProps) {
    
    const { albums, reviews } = userLibrary;

    return (
        <>
            <AlbumItems
                albums={albums}
                getItemDetails={getItemDetails}
                loadAlbumReviews={loadAlbumReviews} />
            <ReviewItems
                reviews={reviews}
                getItemDetails={getItemDetails}
                loadAlbumReviews={loadAlbumReviews} />
        </>
    );
}

export default LibraryItem;
