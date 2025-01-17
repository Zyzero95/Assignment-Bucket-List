// Empty array for Bucket List.
let bucketListItems = [];

// Creating DOM Selectors
const bucketlistSelector = document.querySelector(".bucketListing");
const btnSubmit = document.querySelector("button");

// Button Event Listener
btnSubmit.addEventListener("click", (event) => {

    event.preventDefault();
    submitBucketListItem();
});

// Add Input text and option value to array(bucketListItems)
function submitBucketListItem() {

    // Create DOM Selectors of value when button is clicked
    const activityName = document.querySelector("#activityName").value.trim();
    const activityCategory = document.querySelector("#activityCategory").value;

    // Empty object for submit
    let objHolder = {
    Activity: "",
    Category: ""
    };

    // Assign values to object
    objHolder.Activity = activityName;
    objHolder.Category = activityCategory;

    // Add object to array
    bucketListItems.push(objHolder);
    console.log(bucketListItems);
    // displayBucketList();
}

// Render Bucket List array(bucketListItems)
function renderBucketList() {

    for(let i = 0; i < bucketListItems.length; i++){
        
    }
}
