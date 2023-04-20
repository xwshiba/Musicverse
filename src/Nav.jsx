import SearchBar from './SearchBar';
import UserButton from './UserButton';

function Nav({ 
    onSearch, 
    username, 
    setPage, 
    loadAlbumsPage, 
    onLogout }) {

    const navigateAndLoad = (e) => {
        setPage(e.target.dataset.page);
        loadAlbumsPage();
    };

    return (
        <nav className="navbar">
            <div className="navbar__header">
                <a 
                    className="navbar__logo" 
                    href="#/home"
                    data-page="Home"
                    onClick={(e) => setPage(e.target.dataset.page)} >Musicverse</a>
            </div>
            <SearchBar onSearch={onSearch} />
            <ul className="navbar__links">
                <li className="navbar__item">
                    <a 
                        href="#/albums" 
                        className="navbar__subheader"
                        data-page="Albums"
                        onClick={(e) => navigateAndLoad(e)} >Albums</a>
                </li>
                <li className="navbar__item">
                    <a 
                        href="#/artists" 
                        className="navbar__subheader"
                        data-page="Artists"
                        onClick={(e) => setPage(e.target.dataset.page)} >Artists</a>
                </li>
                <UserButton username={username} setPage={setPage} onLogout={onLogout} />
            </ul>
        </nav>
    )
};

export default Nav;