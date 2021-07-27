# Running the todo server and app

---
## The server

To get started you will need to checkout the code. When you have it checked out cd into the 
server directory and run

### npm install

to install the node module dependencies

When that is complete you can execute the tests using

### npm test

Note that the tests cannot be run while the server is running

To run the server execute

### node app.js

use Control-C to exit the server

---
## The app (UI)

To get started on the UI you will need to open another terminal and cd into the todo-client directory from the project directory.
Once in the todo-client directory run

### npm install

to install the node module dependencies

When that is complete you can execute the tests using

### npm test

Note that the server does not need to be running to execute the todo-client tests

When finished running the tests you can start the react app by running

### npm start

This should open a browser (or a tab in a browser). If not, you can open a browser window and navigate to 
[http://localhost:3000/](http://localhost:3000) to view the main app.
---
## Developer Notes
- Good CSS.  The app should be responsive.  Margin and padding should be used to break up elements in the views.

I chose not to use sass or less as I typically do. I can easily refactor if you would like, but I felt that 
using traditional css demonstrated that I can write css without the aid of modern pre-processors.

- Quality.  Even though this app is trivial, code it up like you would a professional project.  You don't need to over-architect it, but we'll assume the way you code this project is indicative of what you would do for Mackin's projects.

I did not cut any corners on this app and tried to code it as though a job depeneded on it. All kidding aside, I
feel that the approaches I took, the tests I wrote, are how I write code today. That said, I am always looking for
ways to improve.

- Bug-free.  There should be no errors in the console when this app runs.  The app should not crash.

Nothing to add to this other than I did put in an error handler for fetch errors, but you should never see it:-)

- Your work.  The app should be original work that you coded up for this project.  You will be expected to explain your design decisions and what all parts of the application are doing.

Other than peeking at the font and a few colors in the example app, everything is original, and the design decisions, for better or for worse, are 100% mine.
