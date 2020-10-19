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

// Create Human Object
const human = {
  species: "human",
  where: "North America",
  when: "Late Cretaceous",
  fact: "First discovered in 1889 by Othniel Charles Marsh",
};

// Use IIFE to get human data from form
const button = document.getElementById("btn");

button.addEventListener("click", () => {
  (function (human) {
    const nameElement = document.getElementById("name");
    const feetElement = document.getElementById("feet");
    const inchesElement = document.getElementById("inches");
    const weightElement = document.getElementById("weight");
    const dietElement = document.getElementById("diet");

    return function () {
      human.name = nameElement.value;
      human.feet = feetElement.value;
      human.inches = inchesElement.value;
      human.weight = weightElement.value;
      human.diet = dietElement.value;
    };
  })();
});

// human.name = getHumanData().name;
// human.feet = getHumanData().feet;
// human.inches = getHumanData().inches;
// human.weight = getHumanData().weight;
// human.diet = getHumanData().diet;

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
    measuresComparison: `${weight} ${height}`,
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
function generateTiles() {
  const tiles = [];

  let generateTile = function (data) {
    const item = document.createElement("div");
    item.classList.add("grid-item");

    const header = document.createElement("h3");
    header.textContent = data.name || data.species;

    const image = document.createElement("img");
    const imageFile = data.species.toLowerCase();
    image.src = `images/${imageFile}.png`;

    const text = document.createElement("p");
    text.textContent = data.fact;

    return { item, header, image, text };
  };

  dinosaurs.forEach((dino) => {
    let dinoTile = generateTile(dino);

    tiles.push(dinoTile);
  });

  const humanTile = generateTile(human);

  tiles.push(humanTile);

  return tiles;
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
button.addEventListener("click", () => {
  console.log(compareMeasurements(human, dinosaurs[0]));
  console.log(compareDiet(human, dinosaurs[0]));
  console.log(compareSpecies(dinosaurs[0]));

  const tiles = generateTiles();
  addTilesToGrid(tiles);

  removeForm();
});
