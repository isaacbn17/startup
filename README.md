# Group Voting

[My notes.md file](notes.md)

## Elevator Pitch

This is going to be **BIG**!

How much time is wasted when a group can't make a decision quickly?
How can you easily tell what everyone in a group wants to do?
Introducing the solution - a free group voting software that will allow users to:
* Easily create questions and answers
* Collect votes from participants
* See the results in real time

It'll be quick, efficient, and let you know exactly what you need to!

## Design

This first image shows what the login page will look like. Clear and to the point.

![Login page](login_page.jpg)

Next, the user will will be allowed to create a survey, as shown in the image below. Additional answers can be added using the + button.

![Creating a survey](creating_survey.jpg)

Finally, each user will be able to participate and see the results as they come in. *In real time!*

![Results image](vote_results.jpg)

## Key Features

 - Logging in with an email
 - Creating a survey question with answers
 - Publishing the survey for participants
 - Respondents can submit an answer, and later change it if they so wish
 - Results are shown live as answers are submitted
 - Past surveys and their results are saved for future reference

## Technologies

The following technologies will be used on this website:

 * **HTML** - This will be used for the design and organization of the website. There will be a page for logging in, surveying, seeing past results, and reading about the website.
 * **CSS** - I'll use this to add a color scheme, making sure that the website is visually pleasing.
 * **JavaScript** - This will be used as the user creates a survey for publication and as participants submit a response.
 * **Web Service** - A service will be used for logging in and retrieving votes.
 * **Login** - A survey can't be created or response submitted unless the user is logged in.
 * **WebSocket** - This will be used to display the results live as they come in.
 * **React** - The website will be made into a modern framework with this.

## HTML

For this section I wrote code for the basic structure of my website.
* There are four HTML pages. Each includes a menu bar that links to the other pages.
* The index page welcomes the user to the website and lets them login, automatically connecting them to the survey page.
* The survey page allows a user to create a survey and publish it. The published survey will show up here and this is where WebSockets will be used.
* The results page is a database of the results of past surveys. A textual example is included.
* The about page has a short description of the website and an embedded image.

## CSS

For this section I really made the website look nice!
* **Header, footer, and main content body** - These are all styled and consistent on all pages. The header and footer remain the same size when the window size changes and disappear if it gets too small.
* **Navigation elements** - I added a navigation bar from bootstrap that functions well on different screen sizes.
* **Responsive to window resizing** - This works! Elements always remain in place. The text in the main section of the page is always readable.
* **Application elements** - I added a very nice light green color to all the pages. Things are spaced well and just look good.
* **Application text content** - I'm using a font from Google fonts that I think looks really good on all the pages.
* **Application images** - My image on the about page always remains centered and at 50% of the width of the page.

## JavaScript

For this section, I made my website completely functional (for a single user).
* **Login** - The login page stores the email the user inputs in localStorage and outputs it on the create survey page.
* **Database data** - Database data is stored in localStorage. An array is created that stores each of the surveys that has been created. An object is created for each of the answers and its count. Each survey is displayed on the results page along with the count of how many times each answer was voted for.
* **Future WebSocket** - On the about page, a setInterval function changes a message every seven seconds. It starts out as "Happy birthday to you" and adds "and you" periodically.
* **Application's interaction logic** - When a user logs in, they are immediately taken to the create survey page. The question and answers inputed are saved in localStorage and displayed on the publish survey page when the survey is published. Before a survey is created, text appears that says, "Your published survey will show up here!" An answer can be selected and submitted on the published survey page. A count for each of the answers is stored and the count is updated when the answer is submitted. This count, along with the survey question and answers is displayed on the results page. Multiple surveys can be created and their answers stored.

## Service

For this deliverable I added backend endpoints that receive surveys and vote counts and return surveys with vote totals. Now, anyone with my website URL is able to vote on the most recently published survey and see the results live!

* **HTTP service using Node.js and Express** - done!
* **Frontend served up using Express static middleware** - done!
* **Calls to third party endpoints** - A random image and quote are displayed on the about page using third party endpoints.
* **Backend service endpoints** - Endpoints for the surveys and the results of the surveys. When someone submits an answer, that survey's results are updated.
* **Frontend calls service endpoints** - I did this using fetch functions. There is one that gets the most recently published survey and displays it on the published survey tab. Another fetch function is used to get all the surveys and their results on display them on the results page.

## Login

I got it done! My website now allows users to create an account and login. They're unable to vote or make a survey until they have done this. Surveys and vote counts are stored, updated, and retrieved from MongoDB.

Application authentication and authorization
* **Supports new user registration** - Yep! Users can create an account. Multiple accounts can't have the same email.
* **Supports existing user authentication** - Yes! Existing users can login with their email and password.
* **Stores application data in MongoDB** - The surveys are saved in MongoDB. When someone votes, the results are updated in MongoDB and retrieved at the results page.
* **Stores and retrieves credentials in MongoDB** - Done!  Emails and hashed passwords are saved in MongoDB. They are retrieved when someone logs in. The user is displayed on the Create Survey page.
* **Restricts application functionality based upon authentication** - Yes. No one can create a survey or vote on the current survey until they have logged in or signed up.

## WebSocket

When on the results page, a notification is sent via websocket when another user votes. The vote counts are automatically updated in the table.
* **Backend listens for WebSocket connection** - Done.
* **Frontend makes WebSocket connection** - Done.
* **Data sent over WebSocket connection** - Done.
* **WebSocket data displayed in the application interface** - A user is notified of another vote and the update vote count is displayed in the table.
