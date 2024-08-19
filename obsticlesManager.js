class Obsticle {

    constructor(x, y) {

        this.obsticleImg = new Image();
        this.obsticleImg.src = './log.png';
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }


    draw(ctx) {
        ctx.drawImage(this.obsticleImg, this.x, this.y, this.width, this.height);
    }
}

class ObsticlesManager {

    obsticles = [];

    constructor(obsticleY, canvasWidth, canvasHeight) {

        this.obsticleY = obsticleY;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;



    }

    draw(ctx, chanracter, score) {

        let chanracterX = chanracter.x;

        for (let index = 0; index < this.obsticles.length; index++) {

            const element = this.obsticles[index];

            if (isCollision(chanracter, element)) {
                console.log("Game Over");
                GameStateManager.gameStart = false;
                GameStateManager.gamOver = true

                const storedScore = parseInt(localStorage.getItem('runnerGame'), 10);

                if (isNaN(storedScore) || score > storedScore) {
                    localStorage.setItem('runnerGame', score);
                }


            }

            if (chanracterX - 2000 > element.x) {
                this.obsticles.splice(index, 1);
            }
            else {
                element.draw(ctx);
            }


        }


        if (this.obsticles.length < 5) {
            let x = generateRandomNumbers(chanracterX, chanracterX + this.canvasWidth + 5000, 5, 500, this.obsticles);
            this.obsticles.push(new Obsticle(x, this.obsticleY))
        }

    }



}