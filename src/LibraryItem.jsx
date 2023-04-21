import AlbumItems from './AlbumItems';
import AlbumTracks from './AlbumTracks';
import ReviewItems from './ReviewItems';

function LibraryItem({
    userLibrary,
    getItemDetails,
}) {
    const {albums, reviews} = userLibrary;

    return (
        <>
            <AlbumItems 
                albums={albums}
                getItemDetails={getItemDetails}/>
            <ReviewItems 
                reviews={reviews}
                getItemDetails={getItemDetails}/>
        </>
    );
}

export default LibraryItem;