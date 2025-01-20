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

// Add Input text and option value to array(bucketListItems).
function submitBucketListItem() {

    // Create DOM Selectors of value when button is clicked.
    const activityName = document.querySelector("#activityName").value.trim();
    const activityCategory = document.querySelector("#activityCategory").value;

    // Empty object for submit.
    let objHolder = {
    Activity: "",
    Category: ""
    };

    // Assign values to object.
    objHolder.Activity = activityName;
    objHolder.Category = activityCategory;

    addItem(objHolder);
}

function addItem(listItem) {
    // Add object to array.
    bucketListItems.push(listItem);

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

// Event Delegation searching for dynamically created buttons.
bucketlistSelector.addEventListener("click" , (event) => {
    if(event.target.classList.contains('remove-button')){
        removeItem(event.target);
    }
    else if(event.target.classList.contains('edit-button')){
        editItem(event.target);
    }
});

// We change the text inside each p tag with the values from the form.
function editItem(e){

    // Get value from Input text and Select value.
    const activityName = document.querySelector("#activityName").value.trim();
    const activityCategory = document.querySelector("#activityCategory").value;

    // Change value of the two paragraphs we have created which will always be set on index 0 and 1.
    e.parentElement.children[0].innerHTML = activityName;
    e.parentElement.children[1].innerHTML = activityCategory;
}

function removeItem(e){
    e.parentElement.remove();
}

