document.querySelector("button").addEventListener("click", apiRequest);
document.querySelector("input").addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    apiRequest();
  }
});

// function colors() {
//   if (firstType === "fire") {
//     document.body.style.background = "#ff9999";
//     console.log("hii");
//   } else if (firstType === "grass") {
//     document.body.style.background = "#c2f0c2";
//   }
// }

async function apiRequest() {
  const houseName = document.querySelector("input").value;
  try {
    const response = await fetch(
      `https://got-house-emblems.up.railway.app/${houseName}`
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
