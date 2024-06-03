import { useState } from 'react';

import Submenu from './Submenu';

interface UserButtonProps {
    username: string;
    setPage: (page: string) => void;
    onLogout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

function UserButton({ username, setPage, onLogout } : UserButtonProps) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    const closeSubmenu = () => {
        setIsSubmenuOpen(false);
    };

    const navigateAndClose = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.target as HTMLAnchorElement;
        const page = target.dataset.page;

        if (page) {
            setPage(page);
            closeSubmenu();
        };
    };

    if (!username) {
        return (
            <li className="navbar__item navbar__user">
                <a
                    href="#/login"
                    className="navbar__subheader btn"
                    data-page="Login"
                    onClick={(e) => navigateAndClose(e)} >Login</a>
            </li>
        )
    };

    return (
        <li className="navbar__item navbar__user"
            onClick={toggleSubmenu}>
            <a
                href={`#/${username}`}
                className="navbar__subheader btn">
                {username}
            </a>
            <span className="navbar__icon gg-arrow-down-r"></span>
            <Submenu isSubmenuOpen={isSubmenuOpen} navigateAndClose={navigateAndClose} onLogout={onLogout} />
        </li>
    );
};

export default UserButton;
