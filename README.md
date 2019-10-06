# DHome
Personal Home Dashboard created with React & Parcel compiler.

## Installation
`git clone https://github.com/lindsayjopson/react-home-dashboard.git`
`npm install`
`npm start`

## Usage
I have used [Heroku](http://www.heroku.com) to host this node app.

Update `/src/index.js` to pull the widgets you wish into your dashboard
Update the `money` and `investments` widgets `/holdings.json` with the appropriate holdings

### Note
This is a personal project which at this points only suits my needs. The idea is that you can make whatever `widget` you want and compose a 'dashboard' with it in the root `index.js`.

### Todo
Calander & music widget
* Calander widget: currently is just a Google calander embed. I would like this to be build client side and not use the iframe... its gross.
* Music widget: The idea is that the music will be randomly generated depending on the time of day. (not a soundcloud embed). Morning = chill. Afternoon, a bit more beat.
