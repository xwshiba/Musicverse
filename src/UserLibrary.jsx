import Loading from './Loading';
import LibraryItem from './LibraryItem';

function UserLibrary({
    isUserLibraryPending,
    userLibrary,
}) {
    // All this code before the return is to make the return easier to skim
    const SHOW = {  // a constant used only in this component
        PENDING: 'pending',
        EMPTY: 'empty',
        USERLIBRARY: 'userLibrary',
    };

    let show;
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
                <LibraryItem userLibrary={userLibrary} />}
        </div>
    );
};

export default UserLibrary;