class GameStateManager {

    static gameStart = false;
    static gamOver = false;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.backgroundImg = new Image();
        this.backgroundImg.src = './background.jpg';
        this.controlsVisible = true; //check
    }

    drawStartMenu() {
        ctx.drawImage(this.backgroundImg, 0, 0, this.width, this.height);


        const fontSize = 48;
        const fontFamily = 'Arial';
        const text = 'PRESS ENTER TO START';
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const x = canvas.width / 2;
        const y = canvas.height / 2;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'black';
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);

        this.drawControlsOverlay(x, y + 60);
    }

    drawControlsOverlay(x, y) {
        if (this.controlsVisible) {
            const fontSize = 24;
            const fontFamily = 'Arial';
            const controlsText = [
                'Jump: Upper Arrow',
                'Speed: Space Bar',
                'Slow Motion: Q',
                'Rewind: W'
            ];

            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;

            controlsText.forEach((line) => {
                y += fontSize + 10; // Adjust position for each line of text
                ctx.strokeText(line, x, y);
                ctx.fillText(line, x, y);
            });
        }
    }

 
    drawEndMenu(score) {
        ctx.drawImage(this.backgroundImg, 0, 0, this.width, this.height);

        let highScore = localStorage.getItem('runnerGame');

        console.log(localStorage.getItem('runnerGame'))

        let fontSize = null;
        let fontFamily = null;
        let text = null;
        let x = null;
        let y = null;

        if(isNaN(highScore)==false)
        {
            fontSize = 48;
            fontFamily = 'Arial';
            text = 'HIGH SCORE : '+highScore;
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            x = canvas.width / 2;
            y = (canvas.height / 2 )-100;
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 4;
            ctx.fillStyle = 'black';
            ctx.strokeText(text, x, y);
            ctx.fillText(text, x, y);
        }

        fontSize = 48;
        fontFamily = 'Arial';
        text = 'SCORE : '+score;
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        x = canvas.width / 2;
        y = (canvas.height / 2 );
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'black';
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);


        text = 'PRESS ENTER TO RESTART';
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        x = canvas.width / 2;
        y = ( canvas.height / 2 ) + 100;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'black';
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);

    }

}