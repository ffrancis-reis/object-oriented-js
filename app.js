const Dinos = [
  {
    species: "Triceratops",
    weight: 13000,
    height: 114,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "First discovered in 1889 by Othniel Charles Marsh",
  },
  {
    species: "Tyrannosaurus Rex",
    weight: 11905,
    height: 144,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "The largest known skull measures in at 5 feet long.",
  },
  {
    species: "Anklyosaurus",
    weight: 10500,
    height: 55,
    diet: "herbavor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Anklyosaurus survived for approximately 135 million years.",
  },
  {
    species: "Brachiosaurus",
    weight: 70000,
    height: "372",
    diet: "herbavor",
    where: "North America",
    when: "Late Jurasic",
    fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
  },
  {
    species: "Stegosaurus",
    weight: 11600,
    height: 79,
    diet: "herbavor",
    where: "North America, Europe, Asia",
    when: "Late Jurasic to Early Cretaceous",
    fact:
      "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
  },
  {
    species: "Elasmosaurus",
    weight: 16000,
    height: 59,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
  },
  {
    species: "Pteranodon",
    weight: 44,
    height: 20,
    diet: "carnivor",
    where: "North America",
    when: "Late Cretaceous",
    fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
  },
  {
    species: "Pigeon",
    weight: 0.5,
    height: 9,
    diet: "herbavor",
    where: "World Wide",
    when: "Holocene",
    fact: "All birds are living dinosaurs.",
  },
];

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
const dinosaurs = [];
Dinos.forEach(function (dino) {
  dinosaurs.push(new Dinosaur(dino));
});

function randomizeArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create Human Object
const human = {};

// Use IIFE to get human data from form
const getHumanData = (function () {
  const nameElement = document.getElementById("name");
  const feetElement = document.getElementById("feet");
  const inchesElement = document.getElementById("inches");
  const weightElement = document.getElementById("weight");
  const dietElement = document.getElementById("diet");

  return async function (human) {
    human.name = nameElement.value;
    human.height = Number(feetElement.value) * 12 + Number(inchesElement.value);
    human.weight = Number(weightElement.value);
    human.diet = dietElement.value;
  };
})();

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareMeasurements(human, dinosaur) {
  const height = human.height > dinosaur.height ? "taller" : "shorter";
  const weight = human.weight > dinosaur.weight ? "heavier" : "lighter";
  const measure = `You are ${height} and ${weight} than this dinosaur!`;

  return measure;
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareDiet(human, dinosaur) {
  const diet = `You are a ${human.diet} man while this dino is a ${dinosaur.diet} creature!`;

  return diet;
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
function compareSpecies(dinosaur) {
  const species = `You are a complex human being while this dino is a ${dinosaur.species} species!`;

  return species;
}

const facts = [];

function buildRandomFacts() {
  return dinosaurs.map((dino) => {
    let fact = [
      dino.fact,
      compareMeasurements(human, dino),
      compareDiet(human, dino),
      compareSpecies(dino),
    ];

    return fact;
  });
}

// Generate Tiles for each Dino in Array
function generateTiles(tiles) {
  dinosaurs.forEach((dino, index) => {
    const dinoTile = document.createElement("div");
    dinoTile.classList.add("grid-item");

    const header = document.createElement("h3");
    header.textContent = dino.species;

    const image = document.createElement("img");
    image.src = `images/${dino.species.toLowerCase()}.png`;

    const text = document.createElement("p");
    text.textContent =
      dino.species == "pigeon"
        ? "All birds are living dinosaurs."
        : facts[index][Math.floor(Math.random() * 3)];

    dinoTile.appendChild(header);
    dinoTile.appendChild(image);
    dinoTile.appendChild(text);

    tiles.push(dinoTile);
  });

  const humanTile = document.createElement("div");
  humanTile.classList.add("grid-item");

  const header = document.createElement("h3");
  header.textContent = human.name;

  const image = document.createElement("img");
  image.src = `images/human.png`;

  humanTile.appendChild(header);
  humanTile.appendChild(image);

  randomizeArray(tiles);

  tiles.splice(4, 0, humanTile);
}

// Add tiles to DOM
function addTilesToGrid(tiles) {
  const grid = document.getElementById("grid");

  tiles.forEach((tile) => {
    grid.appendChild(tile);
  });
}

// Remove form from screen
function removeForm() {
  const form = document.getElementById("dino-compare");
  form.innerHTML = "";
}

function addReloadButton() {
  const buttonElement = document.createElement("button");
  buttonElement.innerText = "Try again!";
  buttonElement.style.cssText =
    "display: inline-block; background: #ccc; padding: 0.8em; margin: 1.2em auto; transition: ease 0.3s all;;";
  buttonElement.addEventListener("click", () => document.location.reload());

  document.body.appendChild(buttonElement);
}

// On button click, prepare and display infographic
const button = document.getElementById("btn");
button.addEventListener("click", () => {
  getHumanData(human);
  facts.push(...buildRandomFacts());

  const tiles = [];
  generateTiles(tiles);
  addTilesToGrid(tiles);

  removeForm();

  addReloadButton();
});
