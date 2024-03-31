import ball from "./assets/ball-dog-svgrepo-com.svg";
import camera from "./assets/camera-svgrepo-com.svg";
import car from "./assets/car-svgrepo-com.svg";
import diamond from "./assets/diamond-svgrepo-com.svg";
import hand from "./assets/hand-with-fingers-splayed-medium-dark-skin-tone-svgrepo-com.svg";
import JavaScript from "./assets/js-svgrepo-com.svg";
import linux from "./assets/linux-svgrepo-com.svg";
import react from "./assets/react-svgrepo-com.svg";
const CARDS_NUMBER = 8;
const INITIAL_MATCH_STATUS = {
    firstCard: {
        imgUrl: null,
        element: null,
    },
    secondCard: {
        imgUrl: null,
        element: null,
    },
}

const ASSETS = [ball, camera, car, diamond, hand, JavaScript, linux, react];

const generateRandomIndex = (limit) => Math.floor(Math.random() * limit);

function generateGameList() {
    const gameList = [];
    ASSETS.forEach((img) => {
        for (let index = 0; index < 2; index++) {
            let randomIndex;
            do {
                randomIndex = generateRandomIndex(CARDS_NUMBER * 2);
            } while (gameList[randomIndex] !== undefined)
            gameList[randomIndex] = img;
        }
    })
    return gameList;
}

const checkCardValidity = ({ imgUrl, element }) => imgUrl && element;
const alreadyClicked = (targetElement, firstCard, secondCard) => firstCard.element === targetElement || secondCard.element === targetElement;
const isEqual = (obj1, obj2) => (obj1.imgUrl === obj2.imgUrl && obj1.element === obj2.element);

export { generateGameList, INITIAL_MATCH_STATUS, isEqual, checkCardValidity, alreadyClicked }
