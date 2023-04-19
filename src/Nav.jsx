import SearchBar from './SearchBar';
import UserButton from './UserButton';

function Nav({ onSearch, username, setPage, onLogout }) {

    const navigate = (e) => {
        setPage(e.target.dataset.page);
    };

    return (
        <nav className="navbar">
            <div className="navbar__header">
                <a 
                    className="navbar__logo" 
                    href="#/home"
                    data-page="Home"
                    onClick={(e) => navigate(e)} >Musicverse</a>
            </div>
            <SearchBar onSearch={onSearch} />
            <ul className="navbar__links">
                <li className="navbar__item">
                    <a 
                        href="#/albums" 
                        className="navbar__subheader"
                        data-page="Albums"
                        onClick={(e) => navigate(e)} >Albums</a>
                </li>
                <li className="navbar__item">
                    <a 
                        href="#/artists" 
                        className="navbar__subheader"
                        data-page="Artists"
                        onClick={(e) => navigate(e)} >Artists</a>
                </li>
                <UserButton username={username} setPage={setPage} onLogout={onLogout} />
            </ul>
        </nav>
    )
};

export default Nav;