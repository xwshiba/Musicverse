import { useState } from 'react';

// The "onLogin" below is not an automatic event
// such events only happen on TSX representing native HTML elements
// Here it just a prop name like any other

interface LoginFormProps {
    onLogin: (username: string) => void;
};

function LoginForm({ onLogin }) {
    // This state is local to this component
    // it is used only inside this component
    // until login is complete
    // when we call the passed action function
    const [username, setUsername] = useState<string>('');

    function onChange(e : React.ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    };

    function onSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Remember this! Can be very confusing if page reloads
        if (username) {  // Don't allow blank username to try login
            // We could enforce more requirements, but I'm keeping this simple
            onLogin(username); // "action" function we were passed in
        }
    };

    return (
        <div className="login">
            <form
                className="login__form forms"
                action="#/login"
                method="POST"
                onSubmit={onSubmit}
            >
                <label className="forms__label">
                    <span className="forms__tag">Username:</span>
                    <input
                        className="login__username forms__input"
                        value={username}
                        onChange={onChange} />
                </label>
                <button
                    className="login__button forms__btn btn"
                    type="submit"
                    disabled={!username}>
                    Login
                </button>
            </form>
        </div>
    );

}

export default LoginForm;
