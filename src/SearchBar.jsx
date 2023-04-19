import { useState } from 'react';

function SearchBar({ onSearch }) {
    const [userInput, setUserInput] = useState('');

    function onChange(e) {
        setUserInput(e.target.value);
    };

    function onSubmit(e) {
        e.preventDefault(); // Remember this! Can be very confusing if page reloads
        if (userInput) {  // Don't allow blank username to try login
            // We could enforce more requirements, but I'm keeping this simple
            onSearch(userInput); // "action" function we were passed in
            setUserInput('');
            // need to sanitize here
        }
    };

    return (
        <div className="search-bar">
            <form className="search-bar"
                action="#/search"
                method="POST"
                onSubmit={onSubmit}>
                <input
                    type="text"
                    className="search-bar__input forms__input"
                    placeholder="search for albums"
                    value={userInput}
                    onChange={onChange} />

                <button
                    className="search-bar__btn forms__btn btn"
                    type="submit"
                    disabled={!userInput}>
                    Search
                </button>
            </form>
        </div>
    )
};

export default SearchBar;