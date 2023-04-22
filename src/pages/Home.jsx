import banner from '../img/home-page-banner.jpg';

function Home({ loadAlbumsPage, username }) {

    return (
        <section className="home">
            <div className="home__intro">
                <h1 className="home__title">Welcome to Musicverse, {username || 'Guest'}!</h1>
                <p>Musicboard is a social platform that allows you to keep track of all the music you would like to save 
                    and grow your passion for music with friends. Write reviews and save albums in music's fastest growing community.</p>
                <p>You can check the <b>Albums</b> tab for our latest albums.</p>
                <p>However, if you would like to save albums or write reviews, you will need to <b>login</b></p>
                <p>We are in the test phase. Please wait patiently for the registration opening in the future.</p>
                <button 
                    className="home__btn btn" 
                    onClick={loadAlbumsPage}>Browse the Albums</button>
            </div>
            <div className="home__image">
                <img className="home__logo" src={banner} alt="a music roo with instruments" />
            </div>
        </section>
    );
};

export default Home;