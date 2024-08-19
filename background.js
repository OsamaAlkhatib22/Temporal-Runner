class Background {
    constructor(x, width, height,character) {

        this.x = x;
        this.width = width;
        this.height = height;

        this.character=character;

        this.backgroundImg = new Image();
        this.backgroundImg.src = './background.jpg'; 

        this.backgroundFrame=[
            {x:this.x},
            {x:this.x+this.width},
            {x:this.x+this.width+this.width},
            {x:this.x+this.width+this.width+this.width},
        ];


    }


    draw(ctx) {

        for (let index = 0; index < this.backgroundFrame.length; index++) {
            const element = this.backgroundFrame[index];
            ctx.drawImage(this.backgroundImg, element.x, 0, this.width, this.height);
        }

        
        if(this.character.x>this.backgroundFrame[2].x+this.width)
        {
            let startX=this.backgroundFrame[2].x;
            this.backgroundFrame[0].x=startX;
            this.backgroundFrame[1].x=startX+this.width;
            this.backgroundFrame[2].x=startX+this.width+this.width;
            this.backgroundFrame[3].x=startX+this.width+this.width+this.width;

        }


    }

}