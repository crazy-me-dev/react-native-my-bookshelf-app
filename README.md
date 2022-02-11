# react-native-my-bookshelf-app
My Bookshelf app

This project is a demo project to show the best 
sellers list.


![Email sign up](/screens/screenshot1.gif?raw=true)
![Google login](/screens/screenshot2.gif?raw=true)

## Features

- Authorizing by Firebase with email login and google login
- Get best sellers list from nytimes api and show lists and open it with amazon link on the browser
- Add to shopping list for any selected book
- Simple profile management feature (avatar, first name and last name)
- Using redux to manage shopping list


## Technologies

- [React-Native](https://reactnative.dev/docs/)
- [Expo](https://docs.expo.dev/)
- [nytimes Api](https://developer.nytimes.com/get-started)
- [Firebase](https://firebase.google.com/)

## Install and run

Requires [Yarn](https://yarnpkg.com) to install packages and [Expo environment](https://docs.expo.dev/get-started/installation/) or [React-native development environments for iOS and Android](https://reactnative.dev/docs/environment-setup)

How to run

```sh
git clone https://github.com/crazy-me-dev/react-native-my-bookshelf-app.git
```

```sh
cd react-native-my-bookshelf-app
```

```sh
yarn install
```

```sh
yarn ios
```

```sh
yarn android
```


## Features to improve

- We can implement Apple login feature after we set up apple developer account for the app.
- We have not used local storage for redux.
- We can store shopping list into firestore, there is a firestore and storage features to store user's profiles including profile avtar already, we can easily extend it to Book data model as well.



