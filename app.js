fetch("./dino.json", { mode: "no-cors" })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

const dino = {
  species: "Triceratops",
  weight: 13000,
  height: 114,
  diet: "herbavor",
  where: "North America",
  when: "Late Cretaceous",
  fact: "First discovered in 1889 by Othniel Charles Marsh",
};

// Create Dino Constructor
function Dinosaur(dinosaur) {
  this.species = dinosaur.species;
  this.weight = dinosaur.weight;
  this.height = dinosaur.height;
  this.diet = dinosaur.diet;
  this.where = dinosaur.where;
  this.when = dinosaur.when;
  this.fact = dinosaur.fact;
}

// Create Dino Objects
const dinosaur = new Dinosaur(dino);

// Create Human Object
const human = {
  species: "Triceratops",
  weight: 13000,
  height: 114,
  diet: "herbavor",
  where: "North America",
  when: "Late Cretaceous",
  fact: "First discovered in 1889 by Othniel Charles Marsh",
};

// Use IIFE to get human data from form
(function getHumanData() {
  const nameElement = document.getElementById("name");
  const feetElement = document.getElementById("feet");
  const inchesElement = document.getElementById("inches");
  const weightElement = document.getElementById("weight");
  const dietElement = document.getElementById("diet");

  return function () {
    name: nameElement.value;
    feet: feetElement.value;
    inches: inchesElement.value;
    weight: weightElement.value;
    diet: dietElement.value;
  };
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareMeasurements(human, dinosaur) {
  const weight =
    human.weight > dinosaur.weight
      ? "You are heavier than this dinosaur!"
      : "You are lighter than this dinosaur!";
  const height =
    human.inches > dinosaur.height
      ? "You are taller than this dinosaur!"
      : "You are smaller than this dinosaur!";

  return {
    weightMeasure: weight,
    heightMeasure: height,
  };
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(human, dinosaur) {
  const diet = `You are a ${human.diet} man while this dino is a ${dinosaur.diet} creature!`;

  return {
    dietComparison: diet,
  };
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareSpecies(dinosaur) {
  const species = `You are a complex human being man while this dino is a ${dinosaur.species} species!`;

  return {
    speciesComparison: species,
  };
}

// Generate Tiles for each Dino in Array
function generateTiles(dinos) {
  let dinosaurs = [];

  dinos.forEach((dino) => {
    const item = document.createElement("div");
    item.classList.add("grid-item");

    const header = document.createElement("h3");
    header.textContent = dino.species;

    const image = document.createElement("img");
    const imageFile = dino.species.toLowerCase();
    image.src = `images/${imageFile}.png`;

    const text = document.createElement("p");
    text.textContent = dino.fact;

    dinosaurs.push({ item, header, image, text });
  });

  return dinosaurs;
}

// Add tiles to DOM
function addTilesToGrid(dinos) {
  const grid = document.getElementById("grid");

  dinos.forEach((dino) => {
    dino.item.appendChild(dino.header);
    dino.item.appendChild(dino.image);
    dino.item.appendChild(dino.text);

    grid.appendChild(dino.item);
  });
}

// Remove form from screen
function removeForm() {
  const form = document.getElementById("dino-compare");
  form.innerHTML = "";
}

// On button click, prepare and display infographic
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  // const human = getHumanData();

  console.log(compareMeasurements(human, dino));
  console.log(compareDiet(human, dino));
  console.log(compareSpecies(dino));

  const dinosaurs = [];
  dinosaurs.push(dino);

  const dinosaursTiles = generateTiles(dinosaurs);

  addTilesToGrid(dinosaursTiles);

  removeForm();
});
