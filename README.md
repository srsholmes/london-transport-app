# TransportApp

This project was bootstrapped (and then ejected) with [Create React Native App](https://github.com/react-community/create-react-native-app).

### Get started
Run `yarn install` and then `npm start` in terminal.

### Troubleshooting
Run `npm run newclear` to remove React Native's cache and reinstall node-modules. This can often help. 

### Flow
Run `npm run flow`. The source isn't entirely annotated due to time constraints, but I have gone through the majority of it. 

#### Tests
Run `npm t`. Tests are run with Jest, which will work both locally and on CI.
Current only tests for actions are in place due to time constraints. For component testing I would use Enzyme.

#### Ci
A sample CircleCi config can be found in circle.yml. This will run CI on Circle, but unfortunately I cannot fully test as the OSX build environment (needed to make the project) is expensive, but I have previous experience in using Circle this way. 
 
#### Analytics
I have provided some middleware which can be found in `./app/middleware/tracking`. This code is initialised on the app start and is run every time an action causes a change in state in the app. There is an object there called `TRACKING` inside the middleware. The keys of this object are used as a look up to actions which we want to track. As I am using redux as part of my state management, I am  assuming that for any action that would like to be tracked, we can dispatch an event for, or hook into the apps existing events. At the moment currently it console logs the event, but this can be integrated into third party tracking libraries etc. 

The middleware also hijacks React Native's global Error handler function, which can be used record and identify errors in analytics packages such as bugsnag.  

#### Localisation
For localisation, I would research some packages such as [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n), [ReactNativeLocalization](https://github.com/stefalda/ReactNativeLocalization) and implement the best solution for the specific problem / use case. I would take factors into account such as package   
documentation and how often / well the package is maintained. A great tool for this is [Is it maintained?](http://isitmaintained.com/), which will give you statistics on how well a package is maintained.

I would detect the device locale on app start up using [react-native-device-info](https://github.com/rebeccahughes/react-native-device-info) and set the language accordingly. 

#### Considerations before deploying to app stores.

- Accessibility of components.
- Do the tests pass (presumably the feature would not be merged if tests fail / app would not be released).
- Update screenshots.
- Changelog of features / bug fixes.
