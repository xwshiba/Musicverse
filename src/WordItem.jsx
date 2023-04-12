
import { useState } from 'react';

function WordItem({
    userWords,
    onChangeWord,
}) {
    const [userInput, setUserInput] = useState('');

    function onChange(e) {
        setUserInput(e.target.value);
    };

    function onSubmit(e) {
        e.preventDefault(); // Remember this! Can be very confusing if page reloads
        if (userInput) {  // Don't allow blank username to try login
            // We could enforce more requirements, but I'm keeping this simple
            onChangeWord(userInput); // "action" function we were passed in
        };
    };

    return (
        <>
            {userWords ?
                (<p className="content__words">Here's your stored word: <span>{userWords}</span></p>) :
                (<p> No stored words yet, add one!</p >)}
            <form
                action="#/words"
                className="forms forms__change "
                onSubmit={onSubmit}
                method="POST" >
                <label className="forms__label">
                    <span className="forms__tag">Change Your Word: </span>
                    <input
                        className="forms__input"
                        type="text"
                        name="word"
                        onChange={onChange}
                        value={userInput} />
                </label>
                <button
                    type="submit"
                    className="forms__btn btn"
                    disabled={!userInput}
                >
                    Change!
                </button>
            </form>
        </>
    );
}

export default WordItem;