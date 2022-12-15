document.querySelector("button").addEventListener("click", apiRequest);
document.querySelector("button").addEventListener("click", colors);
document.querySelector("input").addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    apiRequest();
    colors();
  }
});

// based on the location, you can change the color
// target the h3?

async function apiRequest() {
  const houseName = document.querySelector("input").value;
  try {
    const response = await fetch(
      `https://got-house-emblems.up.railway.app/api/${houseName}`
    );

    const data = await response.json();

    console.log(data);
    console.log(data.name);
    // misc. items on the webpage
    document.querySelector(".directions").style.display = "none";
    document.querySelector(".results").style.display = "block";

    // for emblem pics
    document.getElementById("emblemPic").src = data.emblempic;
    document.getElementById("emblemPic").alt = `${data.name} picture`;
    document.getElementById("emblemPic").href = data.emblempic;
    document.querySelector("h2").innerText = data.name;

    // for location pics
    document.getElementById("locationPic").src = data.locationpic;
    document.getElementById("locationPic").alt = `${data.location}`;
    document.getElementById("locationPic").href = data.locationpic;
    // location h3
    document.getElementById(
      "mainLocation"
    ).innerText = `Region: ${data.location}`;
    document.querySelector("#bio").innerText = data.blazon;
    document.querySelector("input").innerText = "";
    document.querySelector("input").placeholder = "Enter another House name";

    // Modal Images on click

    const modalEleEmblem = document.querySelector(".modalEmblem");
    const modalEleLocation = document.querySelector(".modalLocation");
    const modalImageEmblem = document.querySelector(".modalImageEmblem");
    const modalImageLocation = document.querySelector(".modalImageLocation");

    document
      .querySelector(".imgThumbEmblem")
      .addEventListener("click", (event) => {
        modalEleEmblem.style.display = "block";
        modalImageEmblem.src = data.emblempic;
      });
    document
      .querySelector(".imgThumbLocation")
      .addEventListener("click", (event) => {
        modalEleLocation.style.display = "block";
        modalImageLocation.src = data.locationpic;
      });
    document.querySelector(".closeEmblem").addEventListener("click", () => {
      modalEleEmblem.style.display = "none";
    });
    document.querySelector(".closeLocation").addEventListener("click", () => {
      modalEleLocation.style.display = "none";
    });
  } catch (error) {
    console.log(error);
  }
}

// you have the colors function compartamentalized below
async function colors() {
  const houseName = document.querySelector("input").value.toString();
  try {
    const response = await fetch(
      `https://got-house-emblems.up.railway.app/api/${houseName}`
    );
    const data = await response.json();
    const backgroundColor = document.body.style.background;
    // console.log(data.location);
    // console.log(typeof data.location);
    // You KNOW the value that finalLocation is a STRING

    // add switch statements

    let finalLocation = data.location;

    if (typeof finalLocation === "string") {
      finalLocation = finalLocation.toLocaleLowerCase();
      console.log("hi");
    }

    // tolocalelowercase does not work on nonstrings, thats why it is not working
    // have to use let variable on finalLocation

    switch (finalLocation) {
      case "crownlands":
        document.body.style.background = "#ffc266";
        break;
      case "north":
        document.body.style.background = "#e6e6e6";
        break;
      case "stormlands":
        document.body.style.background = "#ffffe6";
        break;
      case "westerlands":
        document.body.style.background = "#ffb3b3";
        break;
      case "vale":
        document.body.style.background = "#ffffff";
        break;
      case "riverlands":
        document.body.style.background = "#e6ffff";
        break;
      case "iron islands":
        document.body.style.background = "#e6ffff";
        break;
      case "reach":
        document.body.style.background = "#e6ffe6";
        break;
      case "dorne":
        document.body.style.background = "#ffe6cc";
        break;
      default:
        document.body.style.background = "#ffffff";
        break;
    }
    console.log(finalLocation);
  } catch (error) {
    console.log(error);
  }
}
