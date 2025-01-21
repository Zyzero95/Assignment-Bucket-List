// Empty array for Bucket List.
let bucketListItems = [];

// Creating DOM Selectors.
const bucketlistSelector = document.querySelector("#bucketListing");
const btnSubmit = document.querySelector("#buttonSubmit");

// Button Event Listener.
btnSubmit.addEventListener("click", (event) => {

    // preventDefault() prevents page from refreshing when using submit button.
    event.preventDefault();
    submitBucketListItem();
});

// Event Delegation searching for dynamically created buttons.
bucketlistSelector.addEventListener("click" , (event) => {
    if(event.target.classList.contains('remove-button')){
        removeItem(event.target);
    }
    else if(event.target.classList.contains('edit-button')){
        editItem(event.target);
    }
});

// Initialize data from local storage to empty array and render them on the webpage.
function init() {
    
    if(localStorage.length !== 0){

        let storageParse;

        for(let i = 0; i < localStorage.length; i++){
            storageParse = localStorage.getItem(`ActivityLog ${i}`);
            bucketListItems.push(JSON.parse(storageParse)); 
        }
        
        for(let j = 0; j < bucketListItems.length; j++){
            addItem(bucketListItems[j]);
        }
    }
}

// Only needs to run once.
init();

// Add Input text and option value to array(bucketListItems).
function submitBucketListItem() {
    
    // Create DOM Selectors of value when button is clicked.
    const activityName = document.querySelector("#activityName").value.trim();
    const activityCategory = document.querySelector("#activityCategory").value;

    // Empty object for submit.
    let formValueObj = {
    Activity: "",
    Category: ""
    };

    // Assign values to object.
    formValueObj.Activity = activityName;
    formValueObj.Category = activityCategory;

    bucketListItems.push(formValueObj);
    saveToLocalStorage(bucketListItems);
    addItem(formValueObj);
}

// Save new data from inside the array to local storage.
function saveToLocalStorage(array){
    localStorage.clear();
    sortAlphabetical();
    for(let i = 0; i < array.length; i++){
        localStorage.setItem(`ActivityLog ${i}`, JSON.stringify(array[i]));
    }
}

function sortAlphabetical(){
    bucketListItems.sort(function (a, b) {
        if (a.Activity < b.Activity) {
          return -1;
        }
        if (a.Activity > b.Activity) {
          return 1;
        }
        return 0;
      });
}

// This function takes the object created from submitBucketListItem() and creates HTML elements relevant to the Bucket List.
function addItem(listItem) {

    // This code section uses DOM to create HTML elements for the bucket list.
    let listData = document.createElement('li');

    let listActivityText = document.createElement('p');
    listActivityText.setAttribute("class", "list-activity-text");
    listActivityText.innerHTML = listItem.Activity;
    listData.appendChild(listActivityText);

    let listCategoryText = document.createElement('p');
    listCategoryText.setAttribute("class", "list-category-text");
    listCategoryText.innerHTML = listItem.Category;
    listData.appendChild(listCategoryText);

    let checkBox = document.createElement('INPUT');
    checkBox.setAttribute("type", "checkbox");
    listData.appendChild(checkBox);

    let editButton = document.createElement('button');
    editButton.setAttribute("class", "edit-button");
    editButton.innerHTML = "Edit";
    listData.appendChild(editButton);

    let removeButton = document.createElement('button');
    removeButton.setAttribute("class", "remove-button");
    removeButton.innerHTML = "Remove";
    listData.appendChild(removeButton);

    // Add the HTML elements as children to the Bucket List Section.
    bucketlistSelector.appendChild(listData);
}

// We change the text inside each p tag with the values from the form.
function editItem(e){

    // Get value from Input text and Select value.
    const activityName = document.querySelector("#activityName").value.trim();
    const activityCategory = document.querySelector("#activityCategory").value;

    // Find the common values to update array and then send new data to local storage.
    for(let i = 0; i < bucketListItems.length; i++){
        if(bucketListItems[i].Activity === e.parentElement.children[0].innerHTML && bucketListItems[i].Category === e.parentElement.children[1].innerHTML && activityName !== ""){
            bucketListItems[i].Activity = activityName;
            bucketListItems[i].Category = activityCategory;
        }
        else if(bucketListItems[i].Activity === e.parentElement.children[0].innerHTML && bucketListItems[i].Category === e.parentElement.children[1].innerHTML && activityName === ""){
            bucketListItems[i].Category = activityCategory;
        }
    }
    saveToLocalStorage(bucketListItems);

    // Change value of the two paragraphs we have created which will always be set on index 0 and 1.
    if(activityName === ""){
        e.parentElement.children[1].innerHTML = activityCategory;
    }
    else {
        e.parentElement.children[0].innerHTML = activityName;
        e.parentElement.children[1].innerHTML = activityCategory;
    }
    
    
}

// Removes the whole parent element of the target element(remove-button).
function removeItem(e){

    // Iterate through the list and send new data to local storage.
    for(let i = 0; i < bucketListItems.length; i++){
        if(bucketListItems[i].Activity === e.parentElement.children[0].innerHTML && bucketListItems[i].Category === e.parentElement.children[1].innerHTML){
            bucketListItems.splice(i, 1);
        }
    }
    saveToLocalStorage(bucketListItems);
    e.parentElement.remove();
}