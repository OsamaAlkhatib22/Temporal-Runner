class Coin {

    constructor(x, y) {

        this.coinImg = new Image();
        this.coinImg.src = './coin.png';
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;

        this.frame = 0;
        this.staginFrame = 10;

    }



    draw(ctx, grameFrame) {

        ctx.drawImage(this.coinImg, this.x, this.y, 70, 70);

    }
}

class CoinsManager {

    coins = [];
    score = 0;

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    draw(ctx, chanracter, grameFrame) {

        let chanracterX = chanracter.x;

        for (let index = 0; index < this.coins.length; index++) {

            const element = this.coins[index];

            if (isCollision(chanracter, element)) {
                this.score += 1;
                this.coins.splice(index, 1);

            }

            if (chanracterX - 300 > element.x) {
                this.coins.splice(index, 1);
            }
            else {
                element.draw(ctx, grameFrame);
            }


        }


        if (this.coins.length < 5) {

            let x = generateRandomNumbers(chanracterX, chanracterX + this.canvasWidth + 500, 5, 500, this.coins);
            let y = getRandomInt(100, this.canvasHeight - 300);
            this.coins.push(new Coin(x, y))

        }




    }



}