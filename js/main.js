//#1 
function createElemWithText(element = 'p', textContent = '', className){
    const newElement = document.createElement(element);
    newElement.textContent = textContent;
    if (className){
        newElement.classList.add(className);
    }
    return newElement;
}

// 2
function createSelectOptions(userJSON) {
    if (!userJSON){
        return;
    }

    const userArray = [];

    userJSON.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userArray.push(option);        
    });

    return userArray;

}

// #3
function toggleCommentSection(postId) {
    const commSec = document.querySelector(`[data-post-id="${postId}"]`);
    if (commSec){
        commSec.classList.toggle('hide');
        return commSec;
    } else if (!postId) {
        return;
    } else 
    return null;
}

//#4
function toggleCommentButton(postId){
    const commButt = document.querySelector(`[data-post-id="${postId}"]`);

    if (commButt) { 
        /*       if (commButt.textContent === "Show Comments") {
            commButt.textContent = "Hide Comments";
        } else if (commButt.textContent === "Hide Comments") {
        commButt.textContent = "Show Comments";
        } 
        */
       commButt.textContent === "Show Comments" ? commButt.textContent = "Hide Comments" : commButt.textContent = "Show Comments";
        return commButt;
    } else if (!postId) {
        return;
    } else
        return null;
}

// #5
function deleteChildElements(parentElement) {
    if (!(parentElement instanceof HTMLElement)) {
        return;
    }

    if (typeof parentElement === "string" || typeof parentElement === "number"){
        return;
    }

    if (parentElement) {
         let child = parentElement.lastElementChild;
         while (child) {
            parentElement.removeChild(child);
            child = parentElement.lastElementChild;
        }

    }  else {
        return;
        }

    return parentElement;
}

// #6
/*
addButtonListeners
a. Selects all buttons nested inside the main element
b. If buttons exist:
c. Loop through the NodeList of buttons
d. Gets the postId from button.dataset.postId
e. If a postId exists, add a click event listener to the button (reference
addEventListener) - inside the loop so this happens to each button
f. The listener calls an anonymous function (see cheatsheet)
g. Inside the anonymous function: the function toggleComments is called with the
event and postId as parameters
h. Return the button elements which were selected
i. You may want to define an empty toggleComments function for now. The listener
test will NOT pass for addButtonListeners until toggleComments is completed.
Nevertheless, I recommend waiting on the logic inside the toggleComments
function until we get there.
*/

function addButtonListeners(){
    const main = document.querySelector('main');
       
    const butts = main.querySelectorAll('button');
   
    if (butts.length === 0){
        return butts;
    }

    if (butts) {
        for (let i = 0; i < butts.length; i++) {
            const postId = butts[i].dataset.postId;
            if (postId) {
                butts[i].addEventListener('click', function (e) {toggleComments(e, postId)}, false);
            }
           
        }
    } 
     return butts;
}
    
// #7
/* removeButtonListeners
a. Selects all buttons nested inside the main element
b. Loops through the NodeList of buttons
c. Gets the postId from button.dataset.id
d. If a postId exists, remove the click event listener from the button (reference
removeEventListener) - inside the loop so this happens to each button
e. Refer to the addButtonListeners function as this should be nearly identical
f. Return the button elements which were selected
*/

function removeButtonListeners(){
    const main = document.querySelector('main');
    const buttList = main.querySelectorAll('button');
    for (let i = 0; i < buttList.length; i++) {
        const postId = buttList[i].dataset.id;
        if (postId) {
            buttList[i].removeEventListener('click');
        }
    }
    return buttList;
}

//#8
/* createComments
a. Depends on the createElemWithText function we created
b. Receives JSON comments data as a parameter
c. Creates a fragment element with document.createDocumentFragment()
d. Loop through the comments
e. For each comment do the following:
f. Create an article element with document.createElement()
g. Create an h3 element with createElemWithText('h3', comment.name)
h. Create an paragraph element with createElemWithText('p', comment.body)
i. Create an paragraph element with createElemWithText('p', `From:
${comment.email}`)
j. Append the h3 and paragraphs to the article element (see cheatsheet)
k. Append the article element to the fragment
l. Return the fragment element
*/

function createComments(jsonComments) {
    if (!jsonComments){
        return;
    }
   
    const fragElement = document.createDocumentFragment();
    
    jsonComments.forEach(comment => {
        const article = document.createElement('article');
        /*const cleanName = comment.name.replace(/[\n]+/gm, "");
        const cleanBody = comment.body.replace(/[\n]+/gm, "");
        const cleanEmail = comment.email.replace(/[\n]+/gm, "");
        */

        //console.log(cleanBody);
        //console.log(cleanName);
        //console.log(cleanEmail);
       // console.log(typeof(comment.email));
        //const newElement = createElemWithText('h3', cleanName);
        const newElement = createElemWithText('h3', comment.name);

        const newElement2 = createElemWithText('p', comment.body);
        //const newElement2 = createElemWithText('p', cleanBody);
        
        const newElement3 = createElemWithText('p', `From: ${comment.email}`);
       // const newElement3 = createElemWithText('p', `From: ${cleanEmail}`);
      
      
        article.append(newElement, newElement2, newElement3);
        //article.append(newElement2); 
        //article.append(newElement3);
        fragElement.append(article);
        });
    return fragElement;
}

// #9
/*populateSelectMenu
a. Depends on the createSelectOptions function we created
b. Receives the users JSON data as a parameter
c. Selects the #selectMenu element by id
d. Passes the users JSON data to createSelectOptions()
e. Receives an array of option elements from createSelectOptions
f. Loops through the options elements and appends each option element to the
select menu
g. Return the selectMenu element
*/

function populateSelectMenu (jsonData) {
    if (!jsonData){       
        return;
    }
 
    let selectMenu = document.getElementById('selectMenu');

    const optionArray = createSelectOptions(jsonData);

    for (let i = 0; i < optionArray.length; i++) {
        selectMenu.appendChild(optionArray[i]);      
    }  

    return selectMenu;

}

// #10
/* getUsers
a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
Resources section)
b. Should be an async function
c. Should utilize a try / catch block
d. Uses the fetch API to request all users
e. Await the users data response
f. Return the JSON data
*/

async function getUsers() {
    try {
    const response = await fetch ('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`JSON / HTTP error!! Status: ${response.status}, 
            Messasge: ${errorData.message}`);
    }
    const userData = await response.json();
    return userData;
    } catch (error) {
        console.error ("Error fetching JSON user data:", error.message);
    }
}

// #11
/* getUserPosts
a. Receives a user id as a parameter
b. Fetches post data for a specific user id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all posts for a specific user id
f. Await the users data response
g. Return the JSON data
*/

async function getUserPosts(userId) {
    if (!userId){
        return;
    }
    try {
        const response = await fetch (`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`JSON / HTTP Error!!  Status: ${response.status}, 
                Message: ${errorData.message}`);

        }
        const postData = await response.json();
        return postData;
    } catch (error) {
        console.error ("Error fetch JSON user post data: ", error.message);
    }
}

// #12
/*  getUser
a. Receives a user id as a parameter
b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
(look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request a specific user id
f. Await the user data response
g. Return the JSON data
*/
async function getUser(userId){
    if (!userId){
        return;
    }
    try {
        const response = await fetch (`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`JSON / HTTP Error!! Status: ${response.status}, 
                Message: ${errorData.message}`);
        }
        const userData = await response.json();
        // console.log(userData);
        return userData;
    } catch (error) {
        console.error ("Dude, like the whole JSON thing crashed or something: ", error.message);
    }
}

// #13
/* getPostComments
a. Receives a post id as a parameter
b. Fetches comments for a specific post id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all comments for a specific post id
f. Await the users data response
g. Return the JSON data
*/
async function getPostComments(postId) {
    if (!postId){
        return;
    }
    try {
        const response = await fetch (`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`JSON / HTTP error! Status: ${response.status}, 
                Message: ${errorData.message}`);
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Error fetching userData: ", error.message);
    }
}

// #14
/* displayComments
a. Dependencies: getPostComments, createComments
b. Is an async function
c. Receives a postId as a parameter
d. Creates a section element with document.createElement()
e. Sets an attribute on the section element with section.dataset.postId
f. Adds the classes 'comments' and 'hide' to the section element
g. Creates a variable comments equal to the result of await
getPostComments(postId);
h. Creates a variable named fragment equal to createComments(comments)
i. Append the fragment to the section
j. Return the section element
*/
async function displayComments(postId){
    if(!postId){
        return;
    }
    const sectionElement = document.createElement('section');
// sets attribute
    //sectionElement.setAttribute('section-dataset-postId', postId);
    sectionElement.dataset.postId = postId;

    sectionElement.classList.add('comments', 'hide');

    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    sectionElement.append(fragment);

    return sectionElement;

}

// #15 
/*createPosts
a. Dependencies: createElemWithText, getUser, displayComments
b. Is an async function
c. Receives posts JSON data as a parameter
d. Create a fragment element with document.createDocumentFragment()
e. Loops through the posts data
f. For each post do the following:


t. Return the fragment element
*/

async function createPosts(jsonData) {
//    const createPosts = async (jsonData, getUser, createElemWithText, displayComments) => {
    if (!jsonData) {
        return;
    }
    // console.log(jsonData);
    const fragment = document.createDocumentFragment();
    for (const post of jsonData) {
        //g. Create an article element with document.createElement()
        const article = document.createElement('article');
           
        //h. Create an h2 element with the post title
        const h2Element = document.createElement('h2');
        h2Element.textContent = post.title;
        article.append(h2Element);
        
        //i. Create an p element with the post body
        const p1 = document.createElement('p');
        p1.textContent = post.body;
        article.append(p1);

        //j. Create another p element with text of `Post ID: ${post.id}`
        const p2 = createElemWithText('p', `Post ID: ${post.id}`);
        article.append(p2);
  
        //k. Define an author variable equal to the result of await getUser(post.userId)
        const author = await getUser(post.userId);
        
        //l. Create another p element with text of `Author: ${author.name} with ${author.company.name}`
        //const pAuthorWCo = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const pAuthorWCo = document.createElement('p');
        pAuthorWCo.textContent = `Author: ${author.name} with ${author.company.name}`;
      
        article.appendChild(pAuthorWCo);

        
        //m. Create another p element with the author’s company catch phrase.
        const pCatchPhrase = createElemWithText('p', author.company.catchPhrase);
        article.append(pCatchPhrase);

        //n. Create a button with the text 'Show Comments'
        const button = document.createElement('button');
        button.textContent = 'Show Comments';
        

        //o. Set an attribute on the button with button.dataset.postId = post.id
        button.dataset.postId = post.id;
        article.append(button);

        //q. Create a variable named section equal to the result of await displayComments(post.id);
        const section = await displayComments(post.id);

        
        //p. Append the h2, paragraphs, button, and section elements you have created to the article element.
        article.append(section);

        //r. Append the section element to the article element
        article.append(section);

       
        
        //s. After the loop completes, append the article element to the fragment
        
        fragment.append(article);
    }
    
    return fragment;
}

// #16
/*  displayPosts
a. Dependencies: createPosts, createElemWithText
b. Is an async function
c. Receives posts data as a parameter
d. Selects the main element
e. Defines a variable named element that is equal to:
i. IF posts exist: the element returned from await createPosts(posts)
ii. IF post data does not exist: create a paragraph element that is identical to
the default paragraph found in the html file.
iii. Optional suggestion: use a ternary for this conditional
f. Appends the element to the main element
g. Returns the element variable
*/
async function displayPosts(postsData) {

    const main = document.querySelector('main');
    //console.log(postsData);
    if (!postsData || postsData.length === 0) {
        const newElement = createElemWithText('p', 'Select an Employee to display their posts.');
        newElement.classList.add('default-text');
        main.append(newElement);
        //console.log(newElement);
        return newElement;
    } else if (postsData){
        const element = await createPosts(postsData);
        main.append(element);
       // console.log(main);
        return element;
    }
    
}

// #17
/* toggleComments
a. Dependencies: toggleCommentSection, toggleCommentButton
b. Receives 2 parameters: (see addButtonListeners function description)
i. The event from the click event listener is the 1st param
ii. Receives a postId as the 2nd parameter
c. Sets event.target.listener = true (I need this for testing to be accurate)
d. Passes the postId parameter to toggleCommentSection()
e. toggleCommentSection result is a section element
f. Passes the postId parameter to toggleCommentButton()
g. toggleCommentButton result is a button
h. Return an array containing the section element returned from
toggleCommentSection and the button element returned from
toggleCommentButton: [section, button]
*/

function toggleComments (event, postId) {

    if(!event || !postId){
        return;
    }
    event.target.listener = true;
    const section = document.createElement('section');
    section.value = toggleCommentSection(postId);
    const button = document.createElement('button');
    button.value =  toggleCommentButton(postId);
    const array = []    
    array.push(section); 
    array.push(button);
    return array;

}

// #18
/* refreshPosts
a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
addButtonListeners
b. Is an async function
c. Receives posts JSON data as a parameter
d. Call removeButtonListeners
e. Result of removeButtonListeners is the buttons returned from this function
f. Call deleteChildElements with the main element passed in as the parameter
g. Result of deleteChildElements is the return of the main element
h. Passes posts JSON data to displayPosts and awaits completion
i. Result of displayPosts is a document fragment
j. Call addButtonListeners
k. Result of addButtonListeners is the buttons returned from this function
l. Return an array of the results from the functions called: [removeButtons, main,
fragment, addButtons]
*/

async function refreshPosts (postsData) {
    if (!postsData) {
        return;
    }

    const buttons = [];
    buttons.push(removeButtonListeners());
    const main = deleteChildElements('main');
    
    const fragment = document.createDocumentFragment();
    fragment.append(await displayPosts(postsData));
    const addButtons = [];
    for (const butt of addButtonListeners()) {

        addButtons.push(butt);
    }
    // omg, if i push(addButtonListeners) the result is 1 when the test wants 2.  
    // when i use the for of loop, the reult is 3 when the test wants 2. 
    // console.log(addButtons);
    // anyway, it's 10:30, i should figure out how to publish this.  3 errors left. :(
    const array = []
    array.push(buttons, main, fragment, addButtons);
    return array;

}

// #19 
/*selectMenuChangeEventHandler
a. Dependencies: getUserPosts, refreshPosts
b. Should be an async function
c. Automatically receives the event as a parameter (see cheatsheet)
d. Disables the select menu when called into action (disabled property)
e. Defines userId = event.target.value || 1; (see cheatsheet)
f. Passes the userId parameter to await getUserPosts
g. Result is the posts JSON data
h. Passes the posts JSON data to await refreshPosts
i. Result is the refreshPostsArray
j. Enables the select menu after results are received (disabled property)
k. Return an array with the userId, posts and the array returned from refreshPosts:
[userId, posts, refreshPostsArray]
*/
async function selectMenuChangeEventHandler(event) {
    if (!event) {
        return;
    }
  
    let selectMenu = document.getElementById('selectMenu');
    selectMenu.classList.add('.hide');
    
    const userId = event.target.value || 1; 
    
    const jsonData = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(jsonData);
    const array = [];
    array.push(userId, jsonData, refreshPostsArray);
    return array;
    
}

// #20
/*  initPage
a. Dependencies: getUsers, populateSelectMenu
b. Should be an async function
c. No parameters.
d. Call await getUsers
e. Result is the users JSON data
f. Passes the users JSON data to the populateSelectMenu function
g. Result is the select element returned from populateSelectMenu
h. Return an array with users JSON data from getUsers and the select element
result from populateSelectMenu: [users, select]
*/
async function initPage() {
    const users = await getUsers();
    const select = populateSelectMenu(users);
    const array = [users, select];
    // array.push(users, select);
    return array;    
}

// #21
/* initApp
a. Dependencies: initPage, selectMenuChangeEventHandler
b. Call the initPage() function.
c. Select the #selectMenu element by id
d. Add an event listener to the #selectMenu for the “change” event
e. The event listener should call selectMenuChangeEventHandler when the change
event fires for the #selectMenu
f. NOTE: All of the above needs to be correct for your app to function correctly.
However, I can only test if the initApp function exists. It does not return anything.
*/

function initApp() {
    initPage();
    const selectMenu = document.getElementById('selectMenu');
    selectMenu.addEventListener('change', selectMenuChangeEventHandler, false);
}

document.addEventListener('DOMContentLoaded', initApp, false);
