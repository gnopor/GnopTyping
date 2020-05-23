# GnopTyping

This repository contains a typing project created using Ionic, Firebase and React. The project contains backend user authentication with the firebase and firebase.auth. The frontend has react redux setup for user authentication by providing user information accross the app.

## development workflow ionic

```json
npm i
ionic serve
```
## development workflow electron
```
npm install ngx-electron electron
npm install electron-packager --save-dev
ionic build
npx cap add electron
ionic build && npx cap copy
npx cap open electron
```
