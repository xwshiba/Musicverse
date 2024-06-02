import SearchBar from './SearchBar';
import UserButton from './UserButton';

interface NavProps {
    onSearch: (search: string) => void;
    username: string;
    setPage: (page: string) => void;
    loadAlbumsPage: () => void;
    onLogout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

function Nav({
    onSearch,
    username,
    setPage,
    loadAlbumsPage,
    onLogout
} : NavProps) {

    const navigateAndLoad = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.target as HTMLAnchorElement;
        const page = target.dataset.page;
        if (page) {
            setPage(page);
            loadAlbumsPage();
        };
    };

    return (
        <nav className="navbar">
            <div className="navbar__header">
                <a
                    className="navbar__logo"
                    href="#/home"
                    data-page="Home"
                    onClick={(e) => setPage(e.currentTarget.dataset.page || '')} >Musicverse</a>
            </div>
            <ul className="navbar__links">
                <li className="navbar__item">
                    <a
                        href="#/albums"
                        className="navbar__subheader btn"
                        data-page="Albums"
                        onClick={(e) => navigateAndLoad(e)} >Albums</a>
                </li>
                <UserButton username={username} setPage={setPage} onLogout={onLogout} />
            </ul>
            <SearchBar onSearch={onSearch} />
        </nav>
    )
};

export default Nav;
