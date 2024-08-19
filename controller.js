class Controller {
    constructor() {
        this.jump = false;
        this.down = false;
        this.forward = false;
        this.increaseSpeedFactor = false;
        this.busy = false;
        this.speedBusy = false;
        this.slow = false;
        this.rewind = false;
        this.addKeyBoardListner();

        // speedBoost=5;
        // slowMotion=15;
        // rewind=60;

        this.speedBoost = 0;
        this.slowMotion = 0;
        this.rewindTime = 0;


    }

    addKeyBoardListner() {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "Enter":
                    if (GameStateManager.gamOver == true) {
                        location.reload(true);
                    }
                    else {
                        GameStateManager.gameStart = true;
                    }
                    break;
                case "ArrowUp":
                    if (this.busy == false) {
                        this.busy = true;
                        this.jump = true;
                    }
                    break;
                case "ArrowDown":
                    if (this.busy == false) {
                        this.busy = true;
                        this.down = true;
                    }
                    break;
                case " ":
                    if (this.speedBusy == false && this.speedBoost == 0) {
                        this.speedBusy = true;
                        this.increaseSpeedFactor = true;
                    }
                    break;
                case "q":
                    if (this.speedBusy == false && this.slowMotion == 0) {
                        this.speedBusy = true;
                        this.slow = true;

                        setTimeout(() => {

                            this.slow = false;
                            this.speedBusy = false

                            this.slowMotion = 15;

                        }, 5000);

                    }
                    break;
                case "w":
                    if (this.busy == false && this.rewind != true && this.rewind == 0) {

                        this.rewind = true;
                        this.rewindTime = 60;


                    }
                    break;

                default:
                    break;
            }
        });

    }


    decreaseCoolDown() {
        if (this.rewindTime > 0) {
            this.rewindTime -= 1;
        }

        if (this.slowMotion > 0) {
            this.slowMotion -= 1;
        }

        if (this.speedBoost > 0) {
            this.speedBoost -= 1;
        }
    }


    drawCoolDown(ctx) {


        ctx.fillStyle = 'rgba(128, 128, 128, 0.5)'; // Gray with 50% transparency
        ctx.fillRect(canvas.width - 200, 0, 200, 100); // Parameters: x, y, width, height

        let text = "";

        if (this.slowMotion == 0 && this.slow==false) {
            text = "READY"
        }
        else {
            
            if(this.slow==true)
            {
                text = "IN USE";
            }
            else
            {
                text = this.slowMotion;
            }

        }

        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillText('SLOW MOTION (Q): ' + text, canvas.width - 165, 60);


        if (this.speedBoost == 0 && this.increaseSpeedFactor==false) {
            text = "READY"
        }
        else {

            if(this.increaseSpeedFactor==true)
            {
                text = "IN USE"
            }
            else
            {
                text = this.speedBoost;
            }

        }

        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillText('SPEED BOOST : ' + text, canvas.width - 165, 72);



        if (this.rewindTime == 0 && this.rewind==false) {
            text = "READY"
        }
        else {

            if(this.rewind)
            {
                text = "IN USE"
            }
            else
            {
                text = this.rewindTime;
            }

        }


        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'black';
        ctx.lineWidth = 4;
        ctx.fillText('REWIND (W): ' + text, canvas.width - 165, 84);


    }



}
