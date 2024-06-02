import { MESSAGES} from '@/constants';
import { ErrorKeys } from '@/types';

interface StatusProps {
    error: ErrorKeys;
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
