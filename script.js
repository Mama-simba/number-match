
const images = [
  {
    image_name: 'bananas.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'birthday candles.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'blocks.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'brushes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'cakes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'cars.jpg',
    number_of_items: 2,
  },
  {
    image_name: 'crayons.jpg',
    number_of_items: 8,
  },
  {
    image_name: 'cupcakes.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'deer.jpg',
    number_of_items: 3,
  },
  {
    image_name: 'donuts.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'ducks.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'eggs.jpg',
    number_of_items: 8,
  },
  {
    image_name: 'elephants.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'hot air balloons.jpg',
    number_of_items: 5,
  },
  {
    image_name: 'jelly beans.jpg',
    number_of_items: 9,
  },
  {
    image_name: 'macaroons.jpg',
    number_of_items: 7,
  },
  {
    image_name: 'pencils.jpg',
    number_of_items: 12,
  },
  {
    image_name: 'people.jpg',
    number_of_items: 6,
  },
  {
    image_name: 'peppers.jpg',
    number_of_items: 2,
  },
  {
    image_name: 'pizza slices.jpg',
    number_of_items: 8,
  },
]


const setImageSrc = (randomImageName) => {
    const imageContainer = document.getElementById('imageContainer');

    //Checks if image already exists and if so, it removes it
    if (imageContainer.hasChildNodes()) {
        imageContainer.removeChild(imageContainer.firstElementChild);
    }

    //Creates an image element in the DOM and add it in the HTML image container
    const image = document.createElement('img');
    image.src = `images/${randomImageName}`;
    image.classList.add("fade");
    imageContainer.appendChild(image);
}

//Variables to check if user's answer is true and update score. We need to update ther values
let currentImageValue = 0;
let displayNumber = 0;
let score= 0;
let totalAvailable = images.length; //total of images in the array
let chosen = false;

document.getElementById("statsContent").style.visibility = "hidden"; // hides the score section till the game starts
document.getElementById("currentScore").innerHTML = score; // shows current score
document.getElementById("totalAvailable").innerHTML = totalAvailable; // shows total number of images in the score




// Generates a random number, positive or negative
const generatePlusOrMinus = () => {
    const number0to1 = Math.floor(Math.random() * 2);
    return number0to1 === 0 ? -1 : +1;
}

//Display a number of items so that the user compares it with the items of the image
generateDisplayNumber = (numberOfItems, plusOrMinus) => {
    const split = Math.floor(Math.random() * 2);
    if (split === 0){
        //displays the real number
        document.getElementById("number").innerHTML = numberOfItems;
        displayNumber = numberOfItems;
    } else {
        //displays one number higher or lower than the correct number of Items
        document.getElementById("number").innerHTML = 
        `${numberOfItems + plusOrMinus}`;
        displayNumber = numberOfItems + plusOrMinus;
    }

    //Updated value
    currentImageValue = numberOfItems;
}

const setImageName = (randomImageName) => {
    const imageName = randomImageName.slice(0,randomImageName.length - 4);
    document.getElementById("item-name").innerHTML = imageName + "?";
}



const generate = () => {
  //After showing 20 images, it will stop and will show a message at the end of the game
    if (images.length === 0){
        endOfGame();
        stopTimer();
        return;
    }

    chosen = false;

    const randomNumber = Math.floor(Math.random() * images.length); // Generate a random number and apply it to the images array
    const randomImageName = images[randomNumber].image_name;

    setImageSrc(randomImageName);
    setImageName(randomImageName);
    const plusOrMinus = generatePlusOrMinus(); 
    const numberOfItems = images[randomNumber].number_of_items; // selects the number of items property from every image in the array
    generateDisplayNumber(numberOfItems, plusOrMinus);


    //Removes the images (from the array) that were already displayed
    images.splice(randomNumber, 1);
}

const match = () => {
  if (!chosen) {
    //Checks if currentImageValue matches the displayNumber & updates the score
    currentImageValue === displayNumber ? score++ : score--;
    chosen = true;
    document.getElementById("currentScore").innerHTML = score;
  }
}

const nomatch = () => {
  if (!chosen){
    currentImageValue !== displayNumber ? score++ : score--;
    chosen = true;
    document.getElementById("currentScore").innerHTML = score;
  }
}



let timerRef //Declared outside for a global scope access
const timer = () => {
    timerRef = setInterval(generate, 3000);
}

const play = () => {
  document.getElementById("message").style.display = "none"; //hides the welcome message
  document.getElementById("startScreen").style.display = "none"; //hides the start screen
  document.getElementById("play-button").style.display = "none"; //hides the play button
  document.getElementById("statsContent").style.visibility = "visible"; //shows the score section when game starts


    generate();
    timer();
}

const endOfGame = () => {
    document.getElementById("message").style.display = "block"; //shows message at the end of the game
    document.getElementById("imageContainer").style.display = "none"; //hides last image
    document.getElementById("message").innerHTML = `Game over, your score is ${score} / ${totalAvailable}`; //shows total score
    document.getElementById("statsContent").style.display = "none"; //hides the left side score
    document.getElementById("statsContent").style.visibility = "hidden"; //hides the score section when game ends


    setTimeout(() => location.reload(), 3000);
} 



const stopTimer = () => {
    clearInterval(timerRef);
}