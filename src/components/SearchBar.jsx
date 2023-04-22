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
            <form className="search-bar__form"
                action="#/search"
                method="POST"
                onSubmit={onSubmit}>
                <input
                    type="text"
                    className="search-bar__input forms__input"
                    placeholder="search for albums, press enter to start"
                    value={userInput}
                    onChange={onChange} />
            </form>
        </div>
    )
};

export default SearchBar;