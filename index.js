document.getElementById("showButton").addEventListener("click", function() {
  var bar = document.getElementById("hiddenbar");
  var state = window.getComputedStyle(bar);
  var showButtonText = document.getElementById("showButtonText");

  if (state.display === "none") {
    bar.style.display = "block";
    showButtonText.textContent = "Hide";
  } else {
    bar.style.display = "none";
    showButtonText.textContent = "Show";
  }
});

var sectionCharacter = document.getElementById("section-character");
var sectionSpotlight = document.getElementById("section-spotlight");
var sectionSkills = document.getElementById("section-skills");
var sectionComment = document.getElementById("section-comment");
let changeSection = function(section) {
  if (window.getComputedStyle(section).display === "none") {
    sectionCharacter.style.display = "none";
    sectionSpotlight.style.display = "none";
    sectionSkills.style.display = "none";
    sectionComment.style.display = "none";
    section.style.display = "block";
  }
  updateProgressBar();
};

document.getElementById("character-button").addEventListener("click", () => {changeSection(sectionCharacter)});
document.getElementById("spotlight-button").addEventListener("click", () => {changeSection(sectionSpotlight)});
document.getElementById("skills-button").addEventListener("click", () => {changeSection(sectionSkills)});
document.getElementById("comment-button").addEventListener("click", () => {changeSection(sectionComment)});

var alignment = "left";
var content;
function changeAlignment() {
  if (alignment == "left") {
    alignment = "center";
  } else if (alignment == "center") {
    alignment = "right";
  } else {
    alignment = "left";
  }
  content = document.querySelectorAll("content");
  for (let i = 0; i < content.length; i++) {
    content[i].style.textAlign = alignment;
  }
  content = document.querySelectorAll("th");
  for (let i = 0; i < content.length; i++) {
    content[i].style.textAlign = alignment;
  }
  content = document.querySelectorAll("td");
  for (let i = 0; i < content.length; i++) {
    content[i].style.textAlign = alignment;
  }
  content = document.querySelectorAll("input");
  for (let i = 0; i < content.length; i++) {
    content[i].style.textAlign = alignment;
  }
  content = document.querySelectorAll("textarea");
  for (let i = 0; i < content.length; i++) {
    content[i].style.textAlign = alignment;
  }
}

document.getElementById("task-align").addEventListener("click", changeAlignment);

let addSpotlight = function () {
  var userInput = window.prompt("Please enter a spotlight for Kirito! Then click the \"Spotlight\" button to see the outcome!");
  if (userInput !== null && userInput !== "") {
      var spotlightBlock = document.getElementById("spotlight-block");
      var newDiv = document.createElement("div");
      newDiv.classList.add("message");
      newDiv.textContent = userInput;
      spotlightBlock.appendChild(newDiv);
      updateProgressBar();
  }
}

document.getElementById("task-spotlight").addEventListener("click", () => {addSpotlight()});

var progressBar = document.getElementById('progress-bar');
function updateProgressBar() {
  var totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  var progress = (window.pageYOffset / totalHeight) * 100;
  if (totalHeight <= 0) {
    progress = 100; // Set progress to 100% when no scrollbar is present
  }
  progressBar.style.width = progress + '%';
}

window.addEventListener('scroll', updateProgressBar);

function changeElementVisibility(element) {
  var state = window.getComputedStyle(element);
  if (state.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

document.getElementById("task-scroll").addEventListener("click", () => {changeElementVisibility(document.getElementById('progress-bar'))});

function loadComment() {
  fetch("comment.txt")
    .then(response => response.json())
    .then(data => {
      if (data.comments && Array.isArray(data.comments)) {
        data.comments.forEach(comment => {
          createComment(comment.name, comment.email, comment.color, comment.message);
        });
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

function saveComment(name, email, color, message) {
  fetch("comment.txt")
    .then(response => response.json())
    .then(data => {
      const comments = data.comments || [];

      // Append the new comment to the existing data
      comments.push({ name, email, color, message });

      // Save the updated data to the file
      fetch("comment.txt", {
        method: "PUT",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comments: comments
        })
      });
    })
    .catch(error => {
      const comments = [{ name, email, color, message }];
      fetch("comment.txt", {
        method: "PUT",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comments: comments
        })
      });
    });
}

function createComment(name, email, color, message) {
  var commentlist = document.getElementById("comment-list");
  var newComment = document.createElement("div");
  var element = '<div><div><svg height="100" width="100"><circle cx="50" cy="50" r="40"></svg></div><div><name></name><br /><email></email><div></div><p></p></div></div>';
  newComment.innerHTML = element;

  newComment.className = "comment-block-padding";
  newComment.querySelectorAll("div")[0].className = "comment-block-comment";
  newComment.querySelectorAll("div")[1].className = "comment-block-comment-icon";
  newComment.querySelectorAll("div")[2].className = "comment-block-comment-content";
  newComment.querySelectorAll("div")[3].className = "comment-block-comment-break";
  newComment.querySelector("name").className = "comment-block-comment-name";
  newComment.querySelector("email").className = "comment-block-comment-email";
  newComment.querySelector("p").className = "comment-block-comment-message";

  newComment.querySelector("circle").setAttribute("fill", color);

  newComment.querySelector("name").innerHTML = 'Name: ' + name;
  newComment.querySelector("email").innerHTML = 'Email: ' + email;
  newComment.querySelector("p").innerHTML = 'Comment: <br />' + message;

  commentlist.appendChild(newComment);
}

function validateForm(name, email, color, message) {
  if (name.trim() === "") {
    alert("Please fill in your name!");
    return false;
  }

  if (email.trim() === "") {
    alert("Please fill in your email!");
    return false;
  }
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Your email is in incorrect email format!");
    return false;
  }
  if (color === "") {
    alert("Please choose your color!");
    return false;
  }
  if (message.trim() === "") {
    alert("Please fill in your comment!");
    return false;
  }
  return true;
}

function processForm() {
  var name = document.getElementById("comment-name").value;
  var email = document.getElementById("comment-email").value;
  var color = document.querySelectorAll("input[name=comment-color]:checked")[0].value;
  var message = document.getElementById("comment-message").value;
  if (validateForm(name, email, color, message)) {
    createComment(name, email, color, message);
    saveComment(name, email, color, message);
    // reset the form to clear the contents
    document.getElementById("comment-form").reset();
  }
}

window.addEventListener('load', () => {loadComment()});
