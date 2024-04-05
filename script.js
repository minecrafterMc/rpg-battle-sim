const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "12px Arial";
ctx.textAlign = "left";
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
const CanvasHeight = 2 * OutlineSize + (Rows - 1) * BorderSize + Rows * CellHeight;



const CanvasWidth = 2 * OutlineSize + (Columns - 1) * BorderSize + Columns * CellWidth;

const SpacesOnGrid = Rows * Columns;
document.getElementById("canvas").width = CanvasWidth;
document.getElementById("canvas").height = CanvasHeight;
var Board = [];
var weaponIcons = new spriteSheet("assets/spritesheets/smallicons.png",14,16,1,3);
var attackIcons = new spriteSheet("assets/spritesheets/attackIcons.png",240,240,1,4);
var Background = new Cell(1, 1, "blue", true, "assets/images/background1.png", "cellEngine", 1, true, 800, 400);
var UI = new Cell(1, 1, "blue", true, "assets/images/ui.png", "cellEngine", 2, true, 800, 400);
var attacksel = new Cell(1, 1, "blue", true, "assets/images/attackui.png", "cellEngine", 2, true, 800, 400);
var descUI = new Cell(1, 1, "blue", true, "assets/images/descui.png", "cellEngine", 2, true, 800, 400);
var PHealth = new Cell(39, 1.2, "red", false, "", "UI", 3, true, 30, 145);
var EHealth = new Cell(1.3, 1.05, "red", false, "", "UI", 3, true, 30, 150);
var emptyehbar = new Cell(1.3, 1.05, "black", false, "", "UI", 3, true, 30, 300);
var PStamina = new Cell(1, 16.16, "yellow", false, "", "UI", 3, true, 800, 16)
var emptyhbar = new Cell(39, 1.2, "black", false, "", "UI", 3, true, 30, 290)
var PDurability = new Cell(10.4, 1.3, "blue", false, "", "UI", 3, true, 440, 16)
var emptydbar = new Cell(10.4,1.3, "black", false, "", "UI", 3, true, 440, 16)
var attackButton = new Button(10, 315, 195, 75, 0, "", "", function() { if (GUI != 1) { GUI = 1; } else { GUI = 0; } renderframe();
  guibuttons(); });
var itemButton = new Button(215, 315, 165, 75, 0, "", "", function() { if (GUI != 3) { GUI = 3; } else { GUI = 0; } renderframe();
  guibuttons(); });
var switchButton = new Button(390, 315, 205, 75, 0, "", "", function() { console.log('switch'); });
var infoButton = new Button(605, 315, 185, 75, 0, "", "", function() {if (GUI != 6) { GUI = 6; } else { GUI = 0; } renderframe()});
var popupLabel = new Label(10.5,5,"",27,"arial","center","red");
var itemIcons = new spriteSheet("assets/spritesheets/items.png",512,512,1,12)
var attackInfoText = [
    new Label(21, 3.6, "test", 28, "arial", "center", "black"),
    new Label(7.4, 5.2, "test", 21, "arial", "left", "black"),
    new Label(7.4, 6.6, "test", 21, "arial", "left", "black"),
    new Label(7.4, 8, "test", 21, "arial", "left", "black"),
    new Button(318, 235, 150, 25, 100, "Confirm", "grey", function() { endTurn("attack"); })
]
var itemInfoText = [
    new Label(21, 3.6, "test", 28, "arial", "center", "black"),
    new Label(7.4, 5.2, "test", 21, "arial", "left", "black"),
    new Label(7.4, 6.6, "test", 21, "arial", "left", "black"),
    new Label(7.4, 8, "test", 21, "arial", "left", "black"),
    new Button(318, 235, 150, 25, 100, "Confirm", "grey", function() { endTurn("item"); }),
    
    
]
var attackselbuttons = [
    new Button(230, 60, 370, 27, 100, "text", "grey", function() { if (GUI != 2) { GUI = 2; } else { GUI = 0; } selectedAttack = 0;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 95, 370, 27, 100, "text", "grey", function() { if (GUI != 2) { GUI = 2; } else { GUI = 0; } selectedAttack = 1;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 130, 370, 27, 100, "text", "grey", function() { if (GUI != 2) { GUI = 2; } else { GUI = 0; } selectedAttack = 2;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 165, 370, 27, 100, "text", "grey", function() { if (GUI != 2) { GUI = 2; } else { GUI = 0; } selectedAttack = 3;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 200, 370, 27, 100, "text", "grey", function() { if (GUI != 2) { GUI = 2; } else { GUI = 0; } selectedAttack = 4;
    renderframe();
    guibuttons();
    tick(); })
]
var itemcatselbuttons = [
    new Button(230, 60, 370, 27, 100, "text", "grey", function() { if (GUI != 4) { GUI = 4; } else { GUI = 0; } selecteditemcat = 0;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 95, 370, 27, 100, "text", "grey", function() { if (GUI != 4) { GUI = 4; } else { GUI = 0; } selecteditemcat = 1;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 130, 370, 27, 100, "text", "grey", function() { if (GUI != 4) { GUI = 4; } else { GUI = 0; } selecteditemcat = 2;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 165, 370, 27, 100, "text", "grey", function() { if (GUI != 4) { GUI = 4; } else { GUI = 0; } selecteditemcat = 3;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 200, 370, 27, 100, "text", "grey", function() { if (GUI != 4) { GUI = 4; } else { GUI = 0; } selecteditemcat = 4;
    renderframe();
    guibuttons();
    tick(); })
]
var itemselbuttons = [
    new Button(230, 60, 370, 27, 100, "text", "grey", function() { if (GUI != 5) { GUI = 5; } else { GUI = 0; } selecteditem = 0;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 95, 370, 27, 100, "text", "grey", function() { if (GUI != 5) { GUI = 5; } else { GUI = 0; } selecteditem = 1;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 130, 370, 27, 100, "text", "grey", function() { if (GUI != 5) { GUI = 5; } else { GUI = 0; } selecteditem = 2;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 165, 370, 27, 100, "text", "grey", function() { if (GUI != 5) { GUI = 5; } else { GUI = 0; } selecteditem = 3;
    renderframe();
    guibuttons();
    tick(); }),
    new Button(230, 200, 370, 27, 100, "text", "grey", function() { if (GUI != 5) { GUI = 5; } else { GUI = 0; } selecteditem = 4;
    renderframe();
    guibuttons();
    tick(); })
]
var infoScreen = [
  new Label(22,4,"info",22,"arial","center","black"),
  new Label(22,6,"info2",22,"arial","center","black"),
  new Label(22,8,"info3",22,"arial","center","black"),
  new Label(22,10,"info4",22,"arial","center","black")
  ]
var fullscreenButton = new Button(730,1,70,50,80,"fullscreen","grey", function(){document.getElementById("main").requestFullscreen();screen.orientation.lock("landscape");})
var selectedPMember = 0;
var selectedAttack = 0;
var selecteditemcat = 0;
var selecteditem = 0;
var currentEnemy = 0;
var enemyStage = 0;
var enemiesDefeated = 0;
var enemiesInStage = 0;
var enemiesDefeatedInStage = 0;
var player;
var enemy;
var database;
var dungeon;
var sEffect = 0;
function setvar(data)
{
  database = data;
  player = data.player;
  enemy = data.enemy;
  dungeon = data.dungeon
}
fetch("./database.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) =>
    setvar(data))
  .catch((error) =>
    console.error("Unable to fetch data:", error));


var GUI = 0;

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
    attackIcons.drawSpriteCustomSize(10.15,3.65,30,28.2,player.attackTypes[player.weapons[player.party[selectedPMember].weapon].attacks[0].type]);
    attackIcons.drawSpriteCustomSize(10.15,5.45,30,28.2,player.attackTypes[player.weapons[player.party[selectedPMember].weapon].attacks[1].type]);
    attackIcons.drawSpriteCustomSize(10.15,7.25,30,28.2,player.attackTypes[player.weapons[player.party[selectedPMember].weapon].attacks[2].type]);
    attackIcons.drawSpriteCustomSize(10.15,9.05,30,28.2,player.attackTypes[player.weapons[player.party[selectedPMember].weapon].attacks[3].type]);
    attackIcons.drawSpriteCustomSize(10.15,10.95,30,28.2,player.attackTypes[player.weapons[player.party[selectedPMember].weapon].attacks[4].type]);
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
    itemIcons.drawSpriteCustomSize(10.15,3.65,30,28.2,dungeon.items[player.items[0][0].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,5.45,30,28.2,dungeon.items[player.items[1][0].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,7.25,30,28.2,dungeon.items[player.items[2][0].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,9.05,30,28.2,dungeon.items[player.items[3][0].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,10.95,30,28.2,dungeon.items[player.items[4][0].id].texture);
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
    itemIcons.drawSpriteCustomSize(10.15,3.65,30,28.2,dungeon.items[player.items[selecteditemcat][0].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,5.45,30,28.2,dungeon.items[player.items[selecteditemcat][1].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,7.25,30,28.2,dungeon.items[player.items[selecteditemcat][2].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,9.05,30,28.2,dungeon.items[player.items[selecteditemcat][3].id].texture);
    itemIcons.drawSpriteCustomSize(10.15,10.95,30,28.2,dungeon.items[player.items[selecteditemcat][4].id].texture);
  }
  if (GUI != 2)
  {
    attackInfoText[4].hide();
  }
  else if (GUI == 2)
  {
    attackInfoText[4].show();
  }
  if (GUI != 5)
  {
    itemInfoText[4].hide();
  }
  else if (GUI == 5)
  {
    itemInfoText[4].show();
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
  if (GUI == 5)
  {
    itemInfoText[0].drawLabel();
    itemInfoText[1].drawLabel();
    itemInfoText[2].drawLabel();
    itemInfoText[3].drawLabel();
    itemIcons.drawSpriteCustomSize(8,9.5,100,100,dungeon.items[player.items[selecteditemcat][selecteditem].id].texture);
  }
  if (GUI == 6)
{
  infoScreen[0].drawLabel();
  infoScreen[1].drawLabel();
  infoScreen[2].drawLabel();
  infoScreen[3].drawLabel();
}
  guibuttons()
}

function renderframe()
{
  Background.drawCell();
  UI.drawCell();
  emptyhbar.drawCell();
  emptyehbar.drawCell();
  emptydbar.drawCell();
  PHealth.drawCell();
  EHealth.drawCell();
  PStamina.drawCell();
  PDurability.drawCell();
  rendergui();
  popupLabel.drawLabel();
}

function tick()
{
if (document.fullscreenElement == null)
{
  fullscreenButton.show();
}
else{
  fullscreenButton.hide();
}
  PHealth.height = (player.party[selectedPMember].hp / player.party[selectedPMember].maxhp) * 290;
  EHealth.height = (enemy.types[currentEnemy].hp / enemy.types[currentEnemy].maxhp) * 300;
  PStamina.width = (player.party[selectedPMember].stamina / player.party[selectedPMember].maxStamina) * 800;
  PDurability.width = (player.weapons[player.party[selectedPMember].weapon].durability / player.weapons[player.party[selectedPMember].weapon].maxDurability) * 440;
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
  itemselbuttons[0].buttonElement.innerHTML = dungeon.items[player.items[selecteditemcat][0].id].name + " x" + player.items[selecteditemcat][0].amount;
  itemselbuttons[1].buttonElement.innerHTML = dungeon.items[player.items[selecteditemcat][1].id].name+ " x" + player.items[selecteditemcat][1].amount;
  itemselbuttons[2].buttonElement.innerHTML = dungeon.items[player.items[selecteditemcat][2].id].name+ " x" + player.items[selecteditemcat][2].amount;
  itemselbuttons[3].buttonElement.innerHTML = dungeon.items[player.items[selecteditemcat][3].id].name+ " x" + player.items[selecteditemcat][3].amount;
  itemselbuttons[4].buttonElement.innerHTML = dungeon.items[player.items[selecteditemcat][4].id].name+ " x" + player.items[selecteditemcat][4].amount;
  attackInfoText[0].text = player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].name;
  attackInfoText[1].text = player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].desc;
  attackInfoText[2].text = "type: " + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].type + "; Damage: " + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].damageMin + "-" + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].damageMax + "; Accuracy: " + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].accuracy + ";";
  attackInfoText[3].text = "stamina: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaRecovery - player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaCost) + "; Health: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery - player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost) + "; Durability: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityRecovery - player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityCost) + ";";
  
  
  itemInfoText[0].text = dungeon.items[player.items[selecteditemcat][selecteditem].id].name;
  itemInfoText[1].text = dungeon.items[player.items[selecteditemcat][selecteditem].id].desc;
  let itemcompatibilitytext;
  let itemeffectivnesstext;
  if (dungeon.items[player.items[selecteditemcat][selecteditem].id].usableBy == -1)
  {
    itemcompatibilitytext = "everyone";
  }
  else {
    itemcompatibilitytext = player.classes[dungeon.items[player.items[selecteditemcat][selecteditem].id].usableBy].name;
  }
  if (dungeon.items[player.items[selecteditemcat][selecteditem].id].mostEffective == -1)
  {
    itemeffectivnesstext = "none";
  }
  else {
    itemeffectivnesstext = player.classes[dungeon.items[player.items[selecteditemcat][selecteditem].id].mostEffective].name;
  }
  itemInfoText[2].text = "usable by: " + itemcompatibilitytext + "; most effective by: " + itemeffectivnesstext + ";";
  itemInfoText[3].text = "Health: " + (dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.heal - dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.selfDamage) + "; stamina: " + (dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.staminaRecovery - dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.staminaCost) + "; Durability: " + dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.weaponDurabilityRecovery + "; Damage:" + dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.damage;
  renderframe();
  guibuttons();
}

function OnLoad()
{
  
}

function RandomChance(percent)
{
  if (percent > 100)
  {
    percent = 100;
  }
  if (RandomInt(1,100) < percent)
  {
    return true;
  }
  else{
    return false;
  }
}
function round(number)
{
  return Math.round(number);
}
function Critical(damage,attackType)
{
  if (damage != 0)
  {
  let damageMulti = 0;
  switch (attackType) {
    case 'physical':
      damageMulti += player.classes[player.party[selectedPMember].class].physicalMulti;
      break;
    case 'ranged':
damageMulti += player.classes[player.party[selectedPMember].class].rangeMulti;
break;
case 'magic':
damageMulti += player.classes[player.party[selectedPMember].class].magicMulti;
break;
    default:
      damageMulti = 1;
  }
  if ( player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].type != "recovery")
  {
  if (RandomChance(10 + player.sEffects[sEffect].critBonus))
  {
    damageMulti += 0.7;
    infoScreen[1].text += " You delt " + round(damage * damageMulti) + " damage! (critical);";
    return round(damage * damageMulti);
    
  }
  else{
    infoScreen[1].text += " You delt " + round(damage * damageMulti) + " damage!;";
    return round(damage * damageMulti);
  }
  }
  else{
    infoScreen[1].text += " You delt " + round(damage * damageMulti) + " damage!;";
    return round(damage * damageMulti);
  }
  }
  else{
    return 0;
  }
}
function endTurn(action)
{
  let endTurn = true;
  infoScreen[0].text = "";
  infoScreen[1].text = "";
  infoScreen[2].text = "";
  infoScreen[3].text = "";
  if (action == "attack")
  {
    GUI = 6;
    if (player.party[selectedPMember].stamina > 0 && player.weapons[player.party[selectedPMember].weapon].durability > 0 || player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].type == "recovery" && player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaCost < player.party[selectedPMember].stamina)
    {
      if (RandomInt(1,100) < player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].accuracy + player.sEffects[sEffect].accuracyBonus)
      {
        player.weapons[player.party[selectedPMember].weapon].durability
        player.party[selectedPMember].hp -= player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost;
        if (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].type != "recovery")
        {
        player.party[selectedPMember].hp += player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery;
        if (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery != 0)
        {
        infoScreen[0].text += "your hp changed by: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery) + ";";
        }
        }
        else{
          player.party[selectedPMember].hp += player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery * player.classes[player.party[selectedPMember].class].recoveryMulti;
          if (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery * player.classes[player.party[selectedPMember].class].recoveryMulti) != 0)
          {
          infoScreen[0].text += "your hp changed by: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthCost + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].healthRecovery * player.classes[player.party[selectedPMember].class].recoveryMulti) + ";");
          }
        }
        
        if (player.party[selectedPMember].hp > player.party[selectedPMember].maxhp) { player.party[selectedPMember].hp = player.party[selectedPMember].maxhp }
        else if (player.party[selectedPMember].hp < 0) { player.party[selectedPMember].hp = 0 }
        player.party[selectedPMember].stamina -= player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaCost / player.sEffects[sEffect].staminaBonus;
        player.party[selectedPMember].stamina += player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaRecovery ;
        if (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaCost / player.sEffects[sEffect].staminaBonus + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaRecovery != 0)
        {
        infoScreen[0].text += " your stamina changed by: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaCost / player.sEffects[sEffect].staminaBonus + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].staminaRecovery) + ";";
        }
        if (player.party[selectedPMember].stamina > player.party[selectedPMember].maxStamina) { player.party[selectedPMember].stamina = player.party[selectedPMember].maxStamina }
        else if (player.party[selectedPMember].stamina < 0) { player.party[selectedPMember].stamina = 0 }
        player.weapons[player.party[selectedPMember].weapon].durability -= player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityCost;
        player.weapons[player.party[selectedPMember].weapon].durability += player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityRecovery;
        if (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityCost + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityRecovery != 0)
        {
        infoScreen[1].text += "Your weapon's durablilty changed by: " + (player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityCost + player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].durabilityRecovery) + ";";
        }
        if (player.weapons[player.party[selectedPMember].weapon].durability > player.weapons[player.party[selectedPMember].weapon].maxDurability) { player.weapons[player.party[selectedPMember].weapon].durability = player.weapons[player.party[selectedPMember].weapon].maxDurability }
        else if (player.weapons[player.party[selectedPMember].weapon].durability < 0) { player.weapons[player.party[selectedPMember].weapon].durability = 0 }
        enemy.types[currentEnemy].hp -= Critical(RandomInt(player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].damageMin,player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].damageMax) + player.sEffects[sEffect].attackBonus,player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].type);
      }
      else{
        infoScreen[0].text += "You missed!"
      }
    }
    sEffect = player.weapons[player.party[selectedPMember].weapon].attacks[selectedAttack].sEffect;
  }
  else if (action == "item")
  {
    GUI = 6;
    if (player.items[selecteditemcat][selecteditem].amount != 0)
    {
    if (player.party[selectedPMember].class == dungeon.items[player.items[selecteditemcat][selecteditem].id].usableBy || -1 == dungeon.items[player.items[selecteditemcat][selecteditem].id].usableBy)
    {
      player.items[selecteditemcat][selecteditem].amount -= 1;
      player.party[selectedPMember].hp += (dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.heal - dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.selfDamage);
        infoScreen[0].text += "Your hp changed by: " + (dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.heal - dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.selfDamage) + ";";
      player.party[selectedPMember].stamina += (dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.staminaRecovery - dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.staminaCost);
      enemy.types[currentEnemy].hp -= dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.damage;
      infoScreen[0].text += " Your stamina changed by: " + (dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.staminaRecovery - dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.staminaCost) + ";";
      infoScreen[1].text += " You delt " + dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.damage + " damage;";
      if(dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.weaponSwitch != -1)
      {
        player.party[selectedPMember].weapon = dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.weaponSwitch;
      }
      if (player.party[selectedPMember].hp > player.party[selectedPMember].maxhp) { player.party[selectedPMember].hp = player.party[selectedPMember].maxhp }
        else if (player.party[selectedPMember].hp < 0) { player.party[selectedPMember].hp = 0 }
        if (player.party[selectedPMember].stamina > player.party[selectedPMember].maxStamina) { player.party[selectedPMember].stamina = player.party[selectedPMember].maxStamina }
        else if (player.party[selectedPMember].stamina < 0) { player.party[selectedPMember].stamina = 0 }
        sEffect = dungeon.items[player.items[selecteditemcat][selecteditem].id].effects.sEffect;
    }
    else{
      endTurn = false;
      infoScreen[0].text += "this class can't use this item";
    }
  }
  }
  if (enemy.types[currentEnemy].hp < 0)
  {
    enemiesDefeated += 1;
    enemiesDefeatedInStage += 1;
    enemiesInStage = enemy.enemyStages[enemyStage].length;
    if (enemyStage < enemy.enemyStages.length)
    {
    if (enemiesDefeatedInStage == enemiesInStage)
    {
      enemyStage += 1;
      enemiesInStage = enemy.enemyStages[enemyStage].length;
      enemiesDefeatedInStage = 0;
    }
    enemy.types[currentEnemy].hp = enemy.types[currentEnemy].maxhp;
    enemy.types[currentEnemy].defeated = true;
    currentEnemy = currentEnemy = enemy.enemyStages[enemyStage][RandomInt(0,enemy.enemyStages[enemyStage].length - 1)];
    while (enemy.types[currentEnemy].defeated)
    {
      currentEnemy = enemy.enemyStages[enemyStage][RandomInt(0,enemy.enemyStages[enemyStage].length - 1)];
    }
    }
    else{
      enemy.types[currentEnemy].hp = enemy.types[currentEnemy].maxhp;
      currentEnemy = RandomInt(0,enemy.types.length - 1);
    }
  }
  else{
    if (endTurn)
    {
  enemyTurn();
    }
  }
}
function enemyTurn()
{
  let enemyattack = RandomInt(1,enemy.types[currentEnemy].attacks.length) - 1;
  if (RandomInt(1,100) < enemy.types[currentEnemy].attacks[enemyattack].accuracy)
  {
    let enemydamage = RandomInt(enemy.types[currentEnemy].attacks[enemyattack].damageMin,enemy.types[currentEnemy].attacks[enemyattack].damageMax);
  player.party[selectedPMember].hp -= enemydamage;
  infoScreen[2].text += enemy.types[currentEnemy].name + " used " + enemy.types[currentEnemy].attacks[enemyattack].name;
  if (enemydamage != 0)
  {
  infoScreen[2].text += " and delt " + enemydamage + " damage;";
  }
  else {
    infoScreen[2].text += ";";
  }
  enemy.types[currentEnemy].hp += enemy.types[currentEnemy].attacks[enemyattack].healthRecovery - enemy.types[currentEnemy].attacks[enemyattack].healthCost;
  if (enemy.types[currentEnemy].attacks[enemyattack].healthRecovery - enemy.types[currentEnemy].attacks[enemyattack].healthCost != 0)
  {
  infoScreen[3].text += enemy.types[currentEnemy].name + "'s hp changed by " + (enemy.types[currentEnemy].attacks[enemyattack].healthRecovery - enemy.types[currentEnemy].attacks[enemyattack].healthCost);
  }
  if (enemy.types[currentEnemy].attacks[enemyattack].special != "none")
  {
    if (enemy.types[currentEnemy].attacks[enemyattack].special == "steal")
    {
      let stealitemcat = RandomInt(1,5) - 1;
      let stealitem = RandomInt(1,5) - 1;
      player.items[stealitemcat][stealitem].amount -= 1;
      if (player.items[stealitemcat][stealitem].amount < 0)
      {
        player.items[stealitemcat][stealitem].amount = 0;
      }
      else{
        infoScreen[2].text += " " + enemy.types[currentEnemy].name + " stole " + dungeon.items[player.items[stealitemcat][stealitem].id].name + ";";
      }
    }
    else if (enemy.types[currentEnemy].attacks[enemyattack].special == "effect")
    {
      let attackeffect = RandomInt(0,enemy.types[currentEnemy].attacks[enemyattack].effects.length - 1);
      sEffect = enemy.types[currentEnemy].attacks[enemyattack].effects[attackeffect];
      infoScreen[2].text += " " + enemy.types[currentEnemy].name + " made you " + player.sEffects[attackeffect].name;
      
    }
  }
  }
  else{
    infoScreen[2].text = enemy.types[currentEnemy].name + " missed!";
  }
}
function resetPopup()
{
  popupLabel.text = "";
}
setup()
const ticks = setInterval(tick, 1000 / TicksPerSec)