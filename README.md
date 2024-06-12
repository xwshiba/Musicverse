## Site Description

Musicverse is a social platform that allows users to keep track of all the music users would like to save and grow their passion for music with other users. 

Users can write reviews, save albums and view other users' reviews in this community.

The view albums / search albums functions are accessbile to the public. However, a user can only edit/delete/post reviews when the user is logged in.

Review content is folded, and will be opened if clicked.

Hope this site is enjoyable to you.

## Getting Started

The frontend of the project was bootstrapped with [Next.js](https://nextjs.org/) using React and TypeScript.

The backend is using `go 1.22.3`.

Some services are from [Spotify](https://spotify.com). The tokens format is included in the `.env.example` file.

Please create / copy the `.env` files in both `frontend/` and `backend/` directory, following the `.env.example` format to start exploring the site.

Build mode: the code is runnable with `yarn install`; `yarn build`; `yarn start` in project directory root.

Dev mode: Please install `go 1.22.3` accordingly if you would like to access the dev mode. Then, run `yarn install`; `yarn dev` in project directory root.

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
- `frontend/src/app` contains the frontend resources.
    - `/components` contains the React components.
    - `page.tsx` contains the site pages. The app is NOT expected to handle the Back button or maintaining the current frontend state on page reload/refresh.
    - `/css` contains all the css files. css is using BEM style. Mobile version is not supported right now.
- `backend/api/v1` folder contains the deprecated JavaScript backend APIs.
- `backend/api/v2` folder contains the current Go backend APIs.

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
- not mobile friendly
    - Only works on desktop screens. Especially true for the Nav bar.
- accessibility
    - Tried to use accessible color contrasts. But some pieces a11y requirements are missing.
   
## Next Steps

- Transfer for development scale-up
    - ~~Switch CRA to Next.js for better support~~
    - ~~Revise front-end from JavaScript / JSX to TypeScript / TSX for type security~~
    - ~~Deploy the app to be live on web~~
    - ~~Revise back-end from JavaScript to Python / Go for more powerful oop support~~
    - Backend to incorporate gorilla/sessions instead of current manual session management
    - Add tests to reduce manual and repeated testing efforts
    - Change from CSS to SASS or SCSS
