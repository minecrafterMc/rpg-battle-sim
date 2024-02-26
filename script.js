const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
ctx.textAlign = "left";

const CanvasHeight = 2 * OutlineSize + (Rows - 1) * BorderSize + Rows * CellHeight;
const CanvasWidth = 2 * OutlineSize + (Columns - 1) * BorderSize + Columns * CellWidth;
const SpacesOnGrid = Rows * Columns;
document.getElementById("canvas").width = CanvasWidth;
document.getElementById("canvas").height = CanvasHeight;
var Board = [];
var Background = new Cell(1,1,"blue",true,"assets/images/background1.png","cellEngine",1,false,1,1);
var UI = new Cell(1,1,"blue",true,"assets/images/ui.png","cellEngine",2,false,1,1);
var attacksel = new Cell(1,1,"blue",true,"assets/images/attackui.png","cellEngine",2,false,1,1);
var descUI = new Cell(1,1,"blue",true,"assets/images/descui.png","cellEngine",2,false,1,1);
var PHealth = new Cell(20,1,"red",false,"","UI",3,true,15,150)
var PStamina = new Cell(1,8.6,"yellow",false,"","UI",3,true,400,8)
var emptyhbar = new Cell(20,1,"black",false,"","UI",3,true,15,150)
var PDurability = new Cell(5.2,1,"blue",false,"","UI",3,true,220,8)
var emptydbar = new Cell(5.2,1,"black",false,"","UI",3,true,220,8)
var attackButton = new Button(10,315,195,75,0,"","", function(){if (GUI != 1){GUI = 1;}else{GUI = 0;}renderframe();guibuttons();});
var itemButton = new Button(215,315,165,75,0,"","", function(){if (GUI != 3){GUI = 3;}else{GUI = 0;}renderframe();guibuttons();});
var switchButton = new Button(390,315,205,75,0,"","", function(){console.log('switch');});
var switchButton = new Button(605,315,185,75,0,"","", function(){console.log('info');});
var attackInfoText = [
    new Label(10.7,2.3,"test",12,"arial","center","black"),
    new Label(4.2,3.1,"test",12,"arial","left","black"),
    new Label(4.2,4.3,"test",12,"arial","left","black"),
    new Label(4.2,5.3,"test",12,"arial","left","black"),
    new Button(318,235,150,25,100,"Confirm","grey",function(){endTurn("attack");})
]
var attackselbuttons = [
    new Button(230,60,370,27,100,"text","grey", function(){if (GUI != 2){GUI = 2;}else{GUI = 0;}selectedAttack = 0;renderframe();guibuttons();tick();}),
    new Button(230,95,370,27,100,"text","grey", function(){if (GUI != 2){GUI = 2;}else{GUI = 0;}selectedAttack = 1;renderframe();guibuttons();tick();}),
    new Button(230,130,370,27,100,"text","grey", function(){if (GUI != 2){GUI = 2;}else{GUI = 0;}selectedAttack = 2;renderframe();guibuttons();tick();}),
    new Button(230,165,370,27,100,"text","grey", function(){if (GUI != 2){GUI = 2;}else{GUI = 0;}selectedAttack = 3;renderframe();guibuttons();tick();}),
    new Button(230,200,370,27,100,"text","grey", function(){if (GUI != 2){GUI = 2;}else{GUI = 0;}selectedAttack = 4;renderframe();guibuttons();tick();})
]
var itemcatselbuttons = [
    new Button(230,60,370,27,100,"text","grey", function(){if (GUI != 4){GUI = 4;}else{GUI = 0;}selecteditemcat = 0;renderframe();guibuttons();tick();}),
    new Button(230,95,370,27,100,"text","grey", function(){if (GUI != 4){GUI = 4;}else{GUI = 0;}selecteditemcat = 1;renderframe();guibuttons();tick();}),
    new Button(230,130,370,27,100,"text","grey", function(){if (GUI != 4){GUI = 4;}else{GUI = 0;}selecteditemcat = 2;renderframe();guibuttons();tick();}),
    new Button(230,165,370,27,100,"text","grey", function(){if (GUI != 4){GUI = 4;}else{GUI = 0;}selecteditemcat = 3;renderframe();guibuttons();tick();}),
    new Button(230,200,370,27,100,"text","grey", function(){if (GUI != 4){GUI = 4;}else{GUI = 0;}selecteditemcat = 4;renderframe();guibuttons();tick();})
]
var itemselbuttons = [
    new Button(230,60,370,27,100,"text","grey", function(){if (GUI != 5){GUI = 5;}else{GUI = 0;}selecteditem = 0;renderframe();guibuttons();tick();}),
    new Button(230,95,370,27,100,"text","grey", function(){if (GUI != 5){GUI = 5;}else{GUI = 0;}selecteditem = 1;renderframe();guibuttons();tick();}),
    new Button(230,130,370,27,100,"text","grey", function(){if (GUI != 5){GUI = 5;}else{GUI = 0;}selecteditem = 2;renderframe();guibuttons();tick();}),
    new Button(230,165,370,27,100,"text","grey", function(){if (GUI != 5){GUI = 5;}else{GUI = 0;}selecteditem = 3;renderframe();guibuttons();tick();}),
    new Button(230,200,370,27,100,"text","grey", function(){if (GUI != 5){GUI = 5;}else{GUI = 0;}selecteditem = 4;renderframe();guibuttons();tick();})
]
var selectedPMember = 0;
var selectedAttack = 0;
var selecteditemcat = 0;
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
                     player = data.player)
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
    if (GUI != 3)
    {
      itemcatselbuttons[0].hide();
      itemcatselbuttons[1].hide();
      itemcatselbuttons[2].hide();
      itemcatselbuttons[3].hide();
      itemcatselbuttons[4].hide();
    }
    else if (GUI == 3)
    {
      itemcatselbuttons[0].show();
      itemcatselbuttons[1].show();
      itemcatselbuttons[2].show();
      itemcatselbuttons[3].show();
      itemcatselbuttons[4].show();
    }
    if (GUI != 4)
    {
      itemselbuttons[0].hide();
      itemselbuttons[1].hide();
      itemselbuttons[2].hide();
      itemselbuttons[3].hide();
      itemselbuttons[4].hide();
    }
    else if (GUI == 4)
    {
      itemselbuttons[0].show();
      itemselbuttons[1].show();
      itemselbuttons[2].show();
      itemselbuttons[3].show();
      itemselbuttons[4].show();
    }
}
function rendergui()
{
    if (GUI == 1 || GUI == 3 || GUI == 4)
    {
        attacksel.drawCell();
    }
    if (GUI == 2 || GUI == 5)
    {
        descUI.drawCell();
    }
    if (GUI == 2)
    {
        attackInfoText[0].drawLabel();
        attackInfoText[1].drawLabel();
        attackInfoText[2].drawLabel();
        attackInfoText[3].drawLabel();
    }
    guibuttons()
}
function renderframe()
{
    Background.drawCell();
    UI.drawCell();
    emptyhbar.drawCell();
    emptydbar.drawCell();
    PHealth.drawCell();
    PStamina.drawCell();
    PDurability.drawCell();
    rendergui();
}
function tick()
{
    
    PHealth.height = (player.party[selectedPMember].hp / player.party[selectedPMember].maxhp) * 150;
    PStamina.width = (player.party[selectedPMember].stamina / player.party[selectedPMember].maxStamina) * 400;
    PDurability.width = (player.weapons[player.party[selectedPMember].weapon].durability / player.weapons[player.party[selectedPMember].weapon].maxDurability) * 220;
    attackselbuttons[0].buttonElement.innerHTML = player.weapons[player.party[selectedPMember].weapon].attacks[0].name;
    attackselbuttons[1].buttonElement.innerHTML = player.weapons[player.party[selectedPMember].weapon].attacks[1].name;
    attackselbuttons[2].buttonElement.innerHTML = player.weapons[player.party[selectedPMember].weapon].attacks[2].name;
    attackselbuttons[3].buttonElement.innerHTML = player.weapons[player.party[selectedPMember].weapon].attacks[3].name;
    attackselbuttons[4].buttonElement.innerHTML = player.weapons[player.party[selectedPMember].weapon].attacks[4].name;
    itemcatselbuttons[0].buttonElement.innerHTML = player.itemTypes[0].name;
    itemcatselbuttons[1].buttonElement.innerHTML = player.itemTypes[1].name;
    itemcatselbuttons[2].buttonElement.innerHTML = player.itemTypes[2].name;
    itemcatselbuttons[3].buttonElement.innerHTML = player.itemTypes[3].name;
    itemcatselbuttons[4].buttonElement.innerHTML = player.itemTypes[4].name;
    itemselbuttons[0].buttonElement.innerHTML = player.items[selecteditemcat][0].name;
    itemselbuttons[1].buttonElement.innerHTML = player.items[selecteditemcat][1].name;
    itemselbuttons[2].buttonElement.innerHTML = player.items[selecteditemcat][2].name;
    itemselbuttons[3].buttonElement.innerHTML = player.items[selecteditemcat][3].name;
    itemselbuttons[4].buttonElement.innerHTML = player.items[selecteditemcat][4].name;
    attackInfoText[0].text = player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].name;
    attackInfoText[1].text = player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].desc;
    attackInfoText[2].text = "type: " + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].type + "; Damage: " + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].damageMin + "-" + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].damageMax + "; Accuracy: " + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].accuracy + ";";
    attackInfoText[3].text = "stamina: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaRecovery - player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaCost) + "; Health: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery - player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost) + "; Durability: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityRecovery - player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityCost) + ";";
    renderframe();
    guibuttons();
}
function OnLoad()
{
    document.getElementById("main").requestFullscreen()
}
function endTurn(action)
{
    if (action == "attack")
    {
    GUI = 0;
    if (player.party[selectedPMember].stamina > 0 && player.weapons[player.party[selectedPMember].weapon].durability > 0 || player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].type == "recovery")
    {
    player.party[selectedPMember].hp -= player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost;
    player.party[selectedPMember].hp += player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery;
    if (player.party[selectedPMember].hp > player.party[selectedPMember].maxhp){player.party[selectedPMember].hp = player.party[selectedPMember].maxhp}
    else if (player.party[selectedPMember].hp < 0){player.party[selectedPMember].hp = 0}
    player.party[selectedPMember].stamina -= player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaCost;
    player.party[selectedPMember].stamina += player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaRecovery;
    if (player.party[selectedPMember].stamina > player.party[selectedPMember].maxStamina){player.party[selectedPMember].stamina = player.party[selectedPMember].maxStamina}
    else if (player.party[selectedPMember].stamina < 0){player.party[selectedPMember].stamina = 0}
    player.weapons[player.party[selectedPMember].weapon].durability -= player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityCost;
    player.weapons[player.party[selectedPMember].weapon].durability += player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityRecovery;
    if (player.weapons[player.party[selectedPMember].weapon].durability > player.weapons[player.party[selectedPMember].weapon].maxDurability){player.weapons[player.party[selectedPMember].weapon].durability = player.weapons[player.party[selectedPMember].weapon].maxDurability}
    else if (player.weapons[player.party[selectedPMember].weapon].durability < 0){player.weapons[player.party[selectedPMember].weapon].durability = 0}
    }
}
}
setup()
const ticks = setInterval(tick, 1000 / TicksPerSec)