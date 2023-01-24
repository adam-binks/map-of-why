This guide is written primarily for a student who is working on extending this project - but open source contributions are also welcome!

# Setting up

First, install [Node.js](https://nodejs.org/en/download/) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

Make a fork of this repository on GitHub. Then clone it, e.g. using `git clone https://github.com/<YOUR_GITHUB_USERNAME>/map-of-why.git`.

Map of Why relies on a number of dependencies (see `package.json` to see which libraries it uses). To install all of these modules, navigate to your local copy of the code and run `npm install`, which might take a few minutes.


## Set up your development environment

Map of Why uses [Create React App](https://create-react-app.dev/), which provides a very useful local development server. You can start the dev server navigating to your local copy of the code and running `npm run start`. It'll open `http://localhost:3000/map-of-why` in your browser. As you make changes to the code, the site in your browser will automatically hot-reload, which makes it much faster to play around with.

I'd recommend installing [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en). These are two Chrome extensions that add extra panes to your browser's developer console - the Components pane lets you see the state of all of the React components in the app, and the Redux pane lets you see and replay the history of Redux actions. In general, the Chrome developer console (F12) is very useful!

I use VS Code - it has great [JavaScript support](https://code.visualstudio.com/docs/languages/javascript) - but there are lots of other good editors.


## Set up the application state

The state of the app is managed using Redux. In `src/app/store.js`, we subscribe to changes in the Redux state - when the state changes, we back up the entire map to Firestore.


### Set up your own Firestore database
You have two options: either keep using Firestore (cloud) storage, or store the data locally in the user's browser (see below for more info on this). If you do want to keep using Firestore, **please make your own Firebase project rather than using my one**!

You can create a Firebase project by following the [Firebase quickstart instructions](https://firebase.google.com/docs/firestore/quickstart). I'd use "Test mode" for the Cloud Firestore security rules. Once you've created the project, it should give you some code to copy-paste into `src/app/firebase.js` - you want to replace my `firebaseConfig` with the config for your project. 

Then test that it's working by going to the [Firebase console](https://console.firebase.google.com/u/0/) then navigating to your project > Build > Firestore database. You should see projects being added to the `projects` collection. You may need to add the "projects" collection first.

Firebase has some usage limits on the free plan, but you shouldn't run into these unless you have lots of users, and then payments are based on usage, starting at a few pence a month. You can monitor usage in the Firebase console.

### Option: switching to LocalStorage

An earlier version of the app used [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to store the data in the user's browser, rather than using Firestore cloud storage. If you want to switch back to this, you can uncomment the code in `src/features/menu/MenuButtons.js` which did this, and in `src/app/store.js` comment out the Firebase subscription code and uncomment the `throttledLocalStorageSave` section.

If you use LocalStorage, it's useful to know how to clear it - you do this in the Chrome developer console > Application > Local storage.


# Key libraries and resources

Map of Why uses a number of different libraries. It might feel overwhelming to learn all of this at once, so I'd recommend going bit-by-bit, and playing around with the code to get a feel for how it works in practice. You might also want to take some notes to help you remember key info as you read.


## Essential

These libraries are used throughout the app, so you'll want to familiarise yourself with them to understand the code.

### React
Map of Why is a [React](https://reactjs.org/) app. React is very popular, so you'll find lots of high quality resources on it. React's own getting started docs are excellent.

I'd start by reading the [homepage](https://reactjs.org/).

You can then dive into a [hands-on tutorial](https://reactjs.org/tutorial/tutorial.html) in which you build a tiny app, if you like.

I'd highly, highly recommend reading all 12 of the [main concepts](https://reactjs.org/docs/hello-world.html) - investing in this understanding will save you lots of headaches later. However note that concept [5. State and Lifestyle](https://reactjs.org/docs/state-and-lifecycle.html) uses old-school class components - Map of Why exclusively uses function components and hooks, which are simpler and more up to date. So you'll want to read the [hooks](https://reactjs.org/docs/hooks-overview.html) intro as well.

Map of Why's React components are in `src/features/...`, and the root App component is at `src/App.js`.

### Redux
Map of Why uses Redux to manage the state of the application. I'd read through the [Redux Essentials tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) to get up to speed.

Map of Why's Redux store is set up in `src/app/store.js`. The store is split into different slices for different features, like `nodes/nodesSlice.js` and `...navigation/navigationSlice.js`. These slices export actions, which components can dispatch to update the application state, using `dispatch()`. Components can access the current application state using `useSelector()`.

### JavaScript features
Make sure you're familiar with modern JavaScript language features, like [arrow functions `() => {}`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), the [ternary operator `?`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), [optional chaining `object?.property`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) and [destructuring assignment `{property} = object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). You'll see these show up lots in the code. Some of this stuff is hard to Google, so feel free to DM me if you're having trouble finding it.

The app also uses CSS Modules - [follow the pattern on this page](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/) to use them. For example, in `src/features/homepage/Homepage.js`, we import the styles at the top of the file, and then use the styles object (e.g. `className={styles.homepageButtonPrimary}`) when setting the CSS class of our elements. 

## Other libraries

These other libraries are used for specific features, so you can read about them if you want to change or understand those features.

### Drag and drop: React DnD

[React DnD](https://react-dnd.github.io/react-dnd/about) helps set up dragging and dropping elements.

Nodes (`src/features/nodes/Node.js`) can be dragged to move them around, and they can be dropped on other nodes or on AddChildButtons (`src/features/nodes/AddChildButton.js`). The code for this is in the `useDrag()` and `useDrop()` hooks in those components. The types of elements that can be dragged are defined in `src/DragItemTypes.js` - currently it's only nodes.

### Routing based on the URL: React Router

[React Router](https://v5.reactrouter.com/web/guides/quick-start) lets you display different content based on the URL of the page. In Map of Why, users can see specific projects at `https://<base address>/map-of-why/#/projects/<project Firestore ID>`. For example: https://mapofwhy.app/#/projects/vGs0J8vUapttyKK701vS

The Routing code is in `src/index.js`.

### Undo and redo: Redux-undo

[Redux-undo](https://github.com/omnidan/redux-undo#readme) lets the user undo and redo changes to the Redux state.

The upshot of this is that the current state of the `nodes` Redux slice is stored in `state.nodes.present` - whenever you want to get the nodes state, make sure you include look inside `state.nodes.present` not `state.nodes`. The history is stored in `state.nodes.past` and `state.nodes.future`.

### Emoji Confetti: React-Rewards

The emoji confetti when you check a checkbox uses [React-Rewards](https://github.com/thedevelobear/react-rewards). It's in `...nodes/Node.js`


# Key parts of the app structure

The root of the entire site is `src/index.js`. The introductory homepage is in `src/features/homepage/Homepage.js`. The main app view (with the tree of goals) is in `src/App.js`.

Nodes are in `src/features/nodes/Node.js`. The tree of nodes (i.e., the entire map) is in `src/features/nodes/Tree.js`, which simpler than it looks - it also includes a lot of the fish-eye zoom code, which is currently disabled. You can re-enable it by setting `USE_FISHEYE_ZOOM = true` in `Tree.js`.

The root HTML page is in `public/index.html`, but you probably don't need to edit it.G

# Tests

Map of Why currently has no unit tests. If you want to add some tests you can add them to `src/App.test.js`, and run them with `npm run test`. More info in `src/setupTests.js`.

# Tips

* The app currently doesn't use any component frameworks - the styling is done by hand in CSS, and it's mostly pretty plain. If you want to quickly add common UI elements (like sliders, dropdowns, etc), I'd recommend checking out [Mantine](https://mantine.dev/). It's easy to use and the defaults look great. 
