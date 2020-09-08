# challenge_pack

## Scripts

First you need to go inside the packitapp folder.

### Server
First you need to start the json-server with the following command :
```properties
yarn server-start
```
Server will run on [localhost:3001](http://localhost:3001)
### App
In an other terminal, you should now launch the app by running this command :
```properties
yarn app-start
```
Now you can access to the app at [localhost:3000](http://localhost:3000)

## Dependencies
- [Redux](https://redux.js.org/)
- [React-Redux](https://github.com/reduxjs/react-redux)
- [Redux-saga](https://redux-saga.js.org/)
- [Redux-persist](https://github.com/rt2zz/redux-persist)
- [@material-ui](https://material-ui.com/)
- [formik](https://formik.org/)
- [reselect](https://github.com/reduxjs/reselect)
- [json-server](https://github.com/typicode/json-server)
- [axios](https://github.com/axios/axios)

## Checklist

#### Boilerplate
- [ ] Prepare the project structure using create-react-app
- [ ] Install librairies Redux/React-redux/redux-saga/json-server

#### Setup Redux/React-redux
- [ ] Setup Redux / React-redux / Redux-saga (create store / reducer / actions creator / actions type)

#### Start Brief creation form
- [ ] create BriefForm.js
- [ ] Fetch products from json-server fake api and stock fetched products in the store (use connect of react-redux)
- [ ] Get products data from props (use connect of react-redux)
- [ ] Create a form div with 3 inputs inside (title, comment and products)
- [ ] Store title, comment and product id value in state of the component
- [ ] Add a submit button to create the brief

#### Create a brief
- [ ] create an action to create a brief
- [ ] Launch this action on onClick of submit button
- [ ] Store brief created from server's response to store

#### ListBrief Component
- [ ] Fetch Briefs data
- [ ] Display them
- [ ] Implement the routes

#### Filter brief in BriefList by product
- [ ] Filter Briefs