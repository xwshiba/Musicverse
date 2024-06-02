interface ControlsProps {
    onLogout: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Controls({ onLogout } : ControlsProps) {
    return (
        <div className="controls">
            <form
                action="#/logout"
                className="forms forms__logout"
                method="POST"
                onSubmit={onLogout}
            >
                <button
                    type="submit"
                    className="forms__btn btn"
                >
                    Logout
                </button>
            </form>
        </div>
    );
}

export default Controls;
