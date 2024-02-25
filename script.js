const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
ctx.textAlign = "center";

const CanvasHeight = 2 * OutlineSize + (Rows - 1) * BorderSize + Rows * CellHeight;
const CanvasWidth = 2 * OutlineSize + (Columns - 1) * BorderSize + Columns * CellWidth;
const SpacesOnGrid = Rows * Columns;
document.getElementById("canvas").width = CanvasWidth;
document.getElementById("canvas").height = CanvasHeight;
var Board = [];
var Background = new Cell(1,1,"blue",true,"assets/images/background1.png","cellEngine",1,false,1,1);
var UI = new Cell(1,1,"blue",true,"assets/images/ui.png","cellEngine",2,false,1,1);
var attacksel = new Cell(1,1,"blue",true,"assets/images/attackui.png","cellEngine",2,false,1,1);
var PHealth = new Cell(20,1,"red",false,"","UI",3,true,15,150)
var PStamina = new Cell(1,8.6,"yellow",false,"","UI",3,true,400,8)
var emptybar = new Cell(20,1,"black",false,"","UI",3,true,15,150)
var attackButton = new Button(10,315,195,75,0,"","", function(){if (GUI != 1){GUI = 1;}else{GUI = 0;}renderframe();guibuttons();});
var itemButton = new Button(215,315,165,75,0,"","", function(){console.log('item');});
var switchButton = new Button(390,315,205,75,0,"","", function(){console.log('switch');});
var switchButton = new Button(605,315,185,75,0,"","", function(){console.log('info');});
var attackselbuttons = [
    new Button(230,60,370,27,100,"text","grey", function(){if (GUI != 2){GUI = 2;}else{GUI = 0;}selectedAttack = 0;renderframe();guibuttons();})
]
var selectedPMember = 0;
var selectedAttack;
var player;
fetch("./database.json")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            (`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => 
                     player = data)
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
var GUI = 1;

function guibuttons()
{
    if (GUI != 1)
    {
        attackselbuttons[0].hide();
        attackselbuttons[1].hide();
        attackselbuttons[2].hide();
        attackselbuttons[3].hide();
        attackselbuttons[4].hide();
    }
    else if (GUI == 1)
    {
        attackselbuttons[0].show();
        attackselbuttons[1].show();
        attackselbuttons[2].show();
        attackselbuttons[3].show();
        attackselbuttons[4].show();
    }
}
function rendergui()
{
    if (GUI == 1)
    {
        attacksel.drawCell();
    }
}
function renderframe()
{
    Background.drawCell();
    UI.drawCell();
    emptybar.drawCell();
    PHealth.drawCell();
    PStamina.drawCell();
    rendergui();
}
function tick()
{
    renderframe();
    PHealth.height = (player.party[selectedPMember].hp / player.party[selectedPMember].maxhp) * 150;
    PStamina.width = (player.party[selectedPMember].stamina / player.party[selectedPMember].maxStamina) * 400;
    attackselbuttons[0].buttonElement.innerHTML = player.weapons[player.party[selectedPMember].weapon].attacks[0].name;
    guibuttons();
}
function OnLoad()
{
    
}
setup()
const ticks = setInterval(tick, 1000 / TicksPerSec)