class Character {
    constructor(x, y, width, height) {
        this.x = x + 35;
        this.y = y;

        this.orignalY = y;
        this.initialX = x;

        this.width = width;
        this.height = height;

        this.acceleration = 0.3;
        this.speed = 0;
        this.jump = 0;

        this.maxSpeed = 5;

        this.controller = new Controller();
        this.increaseSpeedFactorValue = 0;

        this.img = new Image();
        this.img.src = "./character_sprites.png";

        this.frame = 0;
        this.staginFrame = 6;

        this.reset = false;

    }

    update() {
        this.move();
    }

    move() {

        if(this.controller.rewind==true)
        {
            this.x -=500;
            this.initialX -=500;
            this.controller.rewind=false; 
        }


        if (this.controller.jump) {

            if (this.jump < 10) {
                this.jump += 0.3;
            }
            else {
                this.controller.jump = false;
                this.controller.down = true;
                this.jump = 0;
            }

        } else if (this.controller.down) {

            if (this.y < this.orignalY) {
                this.jump -= 0.3;
            }
            else {

                this.controller.down = false;
                this.jump = 0;
                this.controller.busy = false;
            }

        }


        if (this.controller.forward) {
            if (this.speed < this.maxSpeed) {
                this.speed += this.acceleration;
            }
        }



        if (this.x < this.initialX + 750 && this.controller.increaseSpeedFactor == true) {


            if (this.increaseSpeedFactorValue == 0) {
                setTimeout(() => {

                    this.controller.increaseSpeedFactor = false;

                }, 1500);

            }

            this.increaseSpeedFactorValue += 0.1;
            this.reset = false;

        } else if (this.controller.increaseSpeedFactor == false && this.x - 50 > this.initialX) {

            this.increaseSpeedFactorValue -= this.acceleration;
            this.reset = true;

        }
        else {


            if (this.reset == true) {
                this.increaseSpeedFactorValue = 0;
                this.controller.speedBusy = false;
                this.reset = false;
            }
        }


        if(this.controller.slow)
        {
            this.x += 0.1;
            this.initialX += 0.1;
            this.staginFrame=50;
        }
        else
        {
            this.x += this.speed + this.increaseSpeedFactorValue;
            this.initialX += this.speed;
            this.staginFrame=6;
        }


        if (this.controller.jump || this.controller.down) {
            this.y -= this.jump;
        }

    }


    getSprite() {
        if (this.controller.forward == true && this.controller.jump == false && this.controller.down == false) {

            if (this.frame == 3) {
                this.frame = 4;
            }

            return {
                sx: 15 + 85 * this.frame,
                sy: 170,
                sWidth: 78,
                sHeight: 147,
                dWidth: 96,
                dHeight: 150,
                dy: this.y - this.height / 2
            };
        } else if (this.controller.jump) {
            return {
                sx: 0,
                sy: 300,
                sWidth: 120,
                sHeight: 147,
                dWidth: 130,
                dHeight: 150,
                dy: (this.y - this.height / 2) - 20
            };
        }
        else if (this.controller.down) {
            return {
                sx: 105,
                sy: 300,
                sWidth: 100,
                sHeight: 147,
                dWidth: 130,
                dHeight: 150,
                dy: (this.y - this.height / 2) - 20
            };
        }

        return {
            sx: 15 + 85 * this.frame,
            sy: 170,
            sWidth: 78,
            sHeight: 147,
            dWidth: 96,
            dHeight: 150,
            dy: this.y - this.height / 2
        };
    }

    draw(ctx, grameFrame) {
        ctx.beginPath();

        const { sx, sy, sWidth, sHeight, dWidth, dHeight, dy } = this.getSprite();

        const dx = this.x - this.width / 2; // X position on the canvas

        // Draw the image
        ctx.drawImage(this.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        ctx.fillStyle = "white";

        ctx.fill();

        if (grameFrame % this.staginFrame == 0) {
            if (this.frame < 4) {
                this.frame += 1;
            } else {
                this.frame = 0;
            }
        }
    }

    autoPilot() {
        this.controller.forward = true;
    }

    getObsticleCondition()
    {
        return this.controller.increaseSpeedFactor;
    }
}
