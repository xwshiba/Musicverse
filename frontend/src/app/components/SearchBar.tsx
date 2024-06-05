import { useState } from 'react';


interface SearchBarProps {
    onSearch: (userInput: string) => void;
};

function SearchBar({ onSearch } : SearchBarProps) {
    const [userInput, setUserInput] = useState<string>('');

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserInput(e.target.value);
    };

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Remember this! Can be very confusing if page reloads
        if (userInput) {  // Don't allow blank username to try login
            // We could enforce more requirements, but I'm keeping this simple
            onSearch(userInput); // "action" function we were passed in
            setUserInput('');
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
