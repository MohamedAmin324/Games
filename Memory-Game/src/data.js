import ball from "./assets/ball-dog-svgrepo-com.svg";
import camera from "./assets/camera-svgrepo-com.svg";
import car from "./assets/car-svgrepo-com.svg";
import diamond from "./assets/diamond-svgrepo-com.svg";
import hand from "./assets/hand-with-fingers-splayed-medium-dark-skin-tone-svgrepo-com.svg";
import JavaScript from "./assets/js-svgrepo-com.svg";
import linux from "./assets/linux-svgrepo-com.svg";
import react from "./assets/react-svgrepo-com.svg";
const SUBJECTS = 8;

const ASSETS = [ball, camera, car, diamond, hand, JavaScript, linux, react];

const generateRandomIndex = (limit) => Math.floor(Math.random() * limit);

function generateGameList() {
    const gameList = [];
    ASSETS.forEach((img) => {
        for (let index = 0; index < 2; index++) {
            let randomIndex;
            do {
                randomIndex = generateRandomIndex(SUBJECTS * 2);
            } while (gameList[randomIndex] !== undefined)
            gameList[randomIndex] = img;
        }
    })
    return gameList;
}

export { generateGameList }
