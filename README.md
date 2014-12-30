# Restify + WebSockets

## Seeing it in action
### From your terminal emulator (*hopefully you use ZSH w/ OhMyZSH in iTerm*)
```
npm install -g git://github.com/gulpjs/gulp.git#4.0  #Install @gulpjs globally
npm install  #Install this app's local reqs
npm test  #Run this app's tests
gulp  #Check for lint & run the server w/ autoreload
open http://localhost:3013 -a 'Google Chrome' && !!  #Open the site in two different windows/tabs
```
### Manual testing
* We've opened 2 windows/tabs so you can see WebSockets in action
* The received data will be seen in the TextArea
* From the console, use ws.send to broadcast data
