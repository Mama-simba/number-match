
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

    imageContainer.appendChild(image);
}

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
    } else {
        //displays one number higher or lower than the correct number of Items
        document.getElementById("number").innerHTML = 
        `${numberOfItems + plusOrMinus}`;
    }
}

const setImageName = (randomImageName) => {
    const imageName = randomImageName.slice(0,randomImageName.length - 4);
    document.getElementById("item-name").innerHTML = imageName + "?";
}


const generate = () => {

    const randomNumber = Math.floor(Math.random() * images.length); // Generate a random number and apply it to the images array
    const randomImageName = images[randomNumber].image_name;

    setImageSrc(randomImageName);
    setImageName(randomImageName);
    const plusOrMinus = generatePlusOrMinus(); 
    const numberOfItems = images[randomNumber].number_of_items; // selects the number of items property from every image in the array
    generateDisplayNumber(numberOfItems, plusOrMinus);


    //Removes the images (from the array) that were already displayed
    images.splice(randomNumber, 1);


    //After showing 20 images, it will stop
    if (images.length === 0){
        stopTimer();
        return;
    }

}



let timerRef //Declared outside for a global scope access
const timer = () => {
    timerRef = setInterval(generate, 3000);
}

const play = () => {
    generate();
    timer();
}


const stopTimer = () => {
    clearInterval(timerRef);
}