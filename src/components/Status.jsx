import { MESSAGES } from '../constants';

function Status({ error }) {

    const message = MESSAGES[error] || MESSAGES.default;
    return (
        <div className="status">
            {error && message}
        </div>
    );
}

export default Status;
