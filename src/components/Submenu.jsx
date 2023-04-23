function Submenu({ isSubmenuOpen, navigateAndClose, onLogout }) {

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
