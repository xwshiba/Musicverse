import { MESSAGES } from '../constants';

interface StatusProps {
    error: string;
}

function Status({ error } : StatusProps) {

    const message = error ? MESSAGES[error] : MESSAGES.default;
    return (
        <div className="status">
            {error && message}
        </div>
    );
}

export default Status;
