function lerp(A, B, t) {
    return A + (B - A) * t;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(min, max, count, minDifference, numbers) {

        let randomNumber = getRandomInt(min, max);

        while(numbers.every(num => Math.abs(randomNumber - num.x) >= minDifference)==false)
        {
            randomNumber = randomNumber + 7.5;
        }

        return randomNumber;

}


function isCollision(box1, box2) {
    return (
      box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.height &&
      box1.y + box1.height > box2.y
    );
  }
  