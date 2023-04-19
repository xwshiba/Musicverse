import AlbumItems from './AlbumItems';
import ReviewItems from './ReviewItems';

function LibraryItem({
    userLibrary,
}) {
    const {albums, reviews} = userLibrary;

    return (
        <>
            <AlbumItems albums={albums}/>
            <ReviewItems reviews={reviews}/>
        </>
    );
}

export default LibraryItem;