import { useState } from 'react';

import Submenu from './Submenu';

function UserButton({ username, setPage, onLogout }) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const toggleSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    const closeSubmenu = () => {
        setIsSubmenuOpen(false);
    };

    const navigateAndClose = (e) => {
        setPage(e.target.dataset.page);
        closeSubmenu();
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
