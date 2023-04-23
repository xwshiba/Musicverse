import SearchBar from './SearchBar';
import UserButton from './UserButton';

function Nav({ 
    onSearch, 
    username, 
    setPage, 
    loadAlbumsPage, 
    onLogout 
}) {

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