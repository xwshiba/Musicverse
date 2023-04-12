import Loading from './Loading';
import WordItem from './WordItem';

function UserWords({
    isUserWordsPending,
    userWords,
    onChangeWord,
}) {
    // All this code before the return is to make the return easier to skim
    const SHOW = {  // a constant used only in this component
        PENDING: 'pending',
        EMPTY: 'empty',
        USERWORDS: 'userwords',
    };

    let show;
    if (isUserWordsPending) {
        show = SHOW.PENDING;
    } else if (!userWords) {
        show = SHOW.EMPTY;
    } else {
        show = SHOW.USERWORDS;
    }

    return (
        <div className="content">
            {show === SHOW.PENDING && <Loading className="words__waiting">Loading Words...</Loading>}
            {(show === SHOW.EMPTY || show === SHOW.USERWORDS) &&
                <WordItem userWords={userWords} onChangeWord={onChangeWord} />}
        </div>
    );
};

export default UserWords;