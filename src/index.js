let addToy = false;
const toyCollection = document.getElementById("toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  const toyUrl = "http://localhost:3000/toys"
  return fetch(toyUrl)
    .then(response => response.json())
}

getToys().then(toys => {
  toys.forEach(toy => {
    loadToys(toy)
  })
})

function loadToys(toy) {
  const divToy = document.createElement("div")
  divToy.className = "card"

  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.src = toy.image
  img.className = "toy-avatar"

  let p = document.createElement("p")
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement("button")
  btn.className = "like-btn"
  btn.innerText = "Like"
  btn.addEventListener("click", (e) => {
    likes(e)
  })

  divToy.append(h2, img, p, btn)
  toyCollection.append(divToy)
}

function postToy(toyData) {
  const toyUrl = "http://localhost:3000/toys"
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    })
  }

  fetch(toyUrl, configObject)
    .then(response => response.json())
    .then(results => {
      let new_toy = loadToys(results)
      toyCollection.append(new_toy)
    })
}


function likes(e) {
  e.preventDefault()
  let newLikes = parseInt(e.target.previousElementSibling.textContent) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
  .then(response => response.json())
  .then((likeObject => {
    e.target.previousElementSibling.textContent = `${newLikes} likes`;
  }))
}