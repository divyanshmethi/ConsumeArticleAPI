const homeContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam.\
Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse.\
Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut.\
Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris\
vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut\
lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at\
erat pellentesque adipiscing."
document.querySelector("#homeContent").innerText = homeContent;

const Http = new XMLHttpRequest();
const url='http://localhost:3000/articles';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  if(Http.readyState==4 && Http.status==200)
  {
    var myObj = JSON.parse(Http.responseText);
    console.log(myObj);
    myObj.forEach((post) => {
      let heading = document.createElement("h1");
      let headingContent = document.createTextNode(post.title);
      heading.appendChild(headingContent);
      let element = document.querySelector("#articleContainer");
      element.appendChild(heading);
      let body = document.createElement("p");
      let bodyContent = document.createTextNode(post.content.substring(0,100) + "...");
      body.appendChild(bodyContent);
      let link = document.createElement("a");
      let linkContent = document.createTextNode("Read More");
      let linkAttr = document.createAttribute("href");
      linkAttr.value = "post.html?title=" + post.title;
      link.setAttributeNode(linkAttr);
      link.appendChild(linkContent);
      body.appendChild(link);
      element.appendChild(body);
    });
  }
}
