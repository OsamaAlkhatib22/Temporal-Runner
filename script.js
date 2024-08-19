const canvas = document.getElementById("canvas");
canvas.width=1000;
canvas.height=500;


const ctx = canvas.getContext("2d");

const character = new Character(100,(canvas.height-100)-120,35,60);

const background = new Background(0,canvas.width,canvas.height,character);

const obsticlesManager = new ObsticlesManager((canvas.height-220),canvas.width,canvas.height,ctx);

const coinsManager = new CoinsManager(canvas.width,canvas.height,ctx);

const gameStateManager = new GameStateManager(canvas.width,canvas.height);

let grameFrame=0;

animate();

function drawScore(score)
{

    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center'; 
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.strokeText('SCORE : ' + score, canvas.width -100, 30);
    ctx.fillText('SCORE : ' + score, canvas.width -100, 30);

    
}


function decreaseCoolDown()
{


    if (grameFrame % 60) {

        character.controller.decreaseCoolDown();

    }

}

setInterval(() => {

    decreaseCoolDown()


}, 1000);

function animate()
{

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    if(GameStateManager.gameStart==true)
    {
        character.update();
        ctx.save();
        ctx.translate(-character.initialX ,0);
        background.draw(ctx);
        obsticlesManager.draw(ctx,character,coinsManager.score);
        coinsManager.draw(ctx,character,grameFrame);
        character.draw(ctx,grameFrame);
        ctx.restore();
        character.autoPilot();
        grameFrame +=1;
        character.controller.drawCoolDown(ctx);
        drawScore(coinsManager.score);
    }
    else
    {
        if(GameStateManager.gamOver==false)
        {
            gameStateManager.drawStartMenu();
        }
        else
        {
            gameStateManager.drawEndMenu(coinsManager.score);
        }
    }


    requestAnimationFrame(animate);

}