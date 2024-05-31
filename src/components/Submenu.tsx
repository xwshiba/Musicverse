interface SubmenuProps {
    isSubmenuOpen: boolean;
    navigateAndClose: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    onLogout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

function Submenu({ isSubmenuOpen, navigateAndClose, onLogout } : SubmenuProps) {

    return (
        <ul className={`${isSubmenuOpen ? 'submenu submenu--show' : 'submenu'}`}>
            <li className="submenu__item">
                <a
                    href="#/Account"
                    data-page="Account"
                    onClick={(e) => navigateAndClose(e)}>
                    Account
                </a>
                <span className="submenu__icon"></span>
            </li>
            <li className="submenu__item">
                <a
                    href="#/logout"
                    data-page="Logout"
                    onClick={onLogout}>
                    Logout
                </a>
            </li>
        </ul>
    );
};

export default Submenu;
