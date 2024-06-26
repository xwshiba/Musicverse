import { ServerUserLibrary } from '../types';

import Loading from './Loading';
import LibraryItem from './LibraryItem';


interface UserLibraryProps {
    isUserLibraryPending: boolean;
    userLibrary: ServerUserLibrary;
    getItemDetails: (albumId: string, reviewId: string) => void;
    loadAlbumReviews: (id: string) => void;
};

function UserLibrary({
    isUserLibraryPending,
    userLibrary,
    getItemDetails,
    loadAlbumReviews,
} : UserLibraryProps) {
    // All this code before the return is to make the return easier to skim
    const SHOW = {  // a constant used only in this component
        PENDING: 'pending',
        EMPTY: 'empty',
        USERLIBRARY: 'userLibrary',
    };

    let show : string = '';
    if (isUserLibraryPending) {
        show = SHOW.PENDING;
    } else if (!userLibrary) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.USERLIBRARY;
    }

    return (
        <div className="user-library">
            {show === SHOW.PENDING && <Loading className="library__waiting">Loading User Library...</Loading>}
            {(show === SHOW.EMPTY || show === SHOW.USERLIBRARY) &&
                <LibraryItem
                    userLibrary={userLibrary}
                    getItemDetails={getItemDetails}
                    loadAlbumReviews={loadAlbumReviews} />}
        </div>
    );
};

export default UserLibrary;
