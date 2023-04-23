# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The code is runnable with `npm install`; `npm run build`; `npm start` in this react project directory.

## Site Description

This site is a personal website that showcases my resume and development skills.
Detail descriptions of each page can be found at the website "About" page.
Hopefully I can get a developer position with the help of this website.

### Loading Indicator

This site contains two loading indicators in "Sign In" and Sign Out" pages.
- You can find them in the form submission button
  - "Sign In" button in "Sign In" page
  - "Sign Out" button in "Sign Out" page

### Sign In Accounts

- dog
  - User "dog" is a special account. Any attempt to login as username "dog" will fail with an "invalidPassword" error.

### License

- All images are from Unsplash.
  - Unsplash grants user an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use photos from Unsplash for free, including for commercial purposes, without permission from or attributing the photographer or Unsplash. This license does not include the right to compile photos from Unsplash to replicate a similar or competing service.

  - More licensing terms can be found [here](https://facebook.github.io/create-react-app/docs/getting-started).

- All icons are from [css.gg](https://css.gg/).
  - MIT License information can be found [here](https://css.gg/doc/licence).


## Known Issues

There are some issues exist. However, resolving these issues is not in the final requirement. I am listing them here for my own documentation.

- hyperlink
  - The site doesn't have any routing design.
    - If you click a sublink that doesn't have any content but a hyperlink, the site will show the previous page content with a new hyperlink.