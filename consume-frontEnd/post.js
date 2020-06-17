const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
console.log(title);
const Http = new XMLHttpRequest();
const url='http://localhost:3000/articles/' + title;
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  if(Http.readyState==4 && Http.status==200)
  {
    var post = JSON.parse(Http.responseText);
    console.log(post);
    let heading = document.createElement("h1");
    let headingContent = document.createTextNode(post.title);
    heading.appendChild(headingContent);
    let element = document.querySelector("#articleContainer");
    element.appendChild(heading);
    let body = document.createElement("p");
    let bodyContent = document.createTextNode(post.content);
    body.appendChild(bodyContent);
    element.appendChild(body);
  }
}
