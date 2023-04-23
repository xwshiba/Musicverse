## Site Description

Musicverse is a social platform that allows users to keep track of all the music user would like to save and grow their passion for music with other users. 

Users can write reviews, save albums and view other users' reviews in this community.

The view albums / search albums functions are accessbile to the public. However, a user can only edit/delete/post reviews when the user is logged in.

Review content is folded, and will be opened if clicked.

Hope this site is enjoyable to you.

## Getting Started

The frontend of the project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The backend is using JavaScript.

Some services are from [Spotify](https://spotify.com). The tokens format is included in the `.env.example` file.

Please create / copy the `.env` file in this directory to start exploring the site.

The code is runnable with `npm install`; `npm run build`; `npm start` in this react project directory.

### Security

- Authentication: React will do MOST of this automatically on the front end. The backend service will sanitize the user input based on the following rules.
    - dog
        - User "dog" is a special account. Any attempt to login as username "dog" will fail with an "invalid password" error.
    - username
        - Username is using allowlist. It should be 1 to 20 letters and/or numbers. Any other combinations will not be allowed.
    - reviews
        - Ideally, reviews should use libraries to translate the user input. However, I am using allowlist again to prevent XSS injections.
    - sessions / cookies
        - The site allows public access. However, a user can only edit/delete/post reviews when the user is logged in.
    - search
        - search functions will be accessible to the public. Spotify will handle the security concerns.

### File Structure
- `/src` contains the frontend resources.
    - `/components` contains the React components.
    - `/pages` contains the site pages. The app is NOT expected to handle the Back button or maintaining the current frontend state on page reload/refresh.
    - `/css` contains all the css files. css is using BEM style.
- `/` root folder contains the backend resources.

### License

- All images are from Unsplash.
    - Unsplash grants user an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. This license does not include the right to compile photos from Unsplash to replicate a similar or competing service.

    - More licensing terms can be found [here](https://facebook.github.io/create-react-app/docs/getting-started).

- All icons are from [css.gg](https://css.gg/).
  - MIT License information can be found [here](https://css.gg/doc/licence).

## Known Issues

There's always room for improvements. I am listing them here for my own documentation. Please feel free to let me know if you find other issues!

- hyperlink
    - The site doesn't have any routing design.
- pagination
    - Ideally the site could use the infinite scroll pagination. However it hasn't had that function for now.
- architecture
    - The project is using useReducer to update state via "action" concepts. However, it hasn't used useContext to handle the props passing hell yet.
    - Some code blocks are duplicated. Could use more effort to abstract them out.
- not mobile friendly
    - Only works on desktop screens. Especially true for the Nav bar.
- accessibility
    - Tried to use accessible color contrasts. But some pieces a11y requirements are missing.
