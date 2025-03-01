// Weapon class 
class Weapon {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
  }
}
// Armour class 
class Armour {
  constructor(name, armourValue) {
    this.name = name; 
    this.armourValue = armourValue;
  }
}
// Enemy class 
class Enemy {
  constructor(name, hp, weapon, armour, ascii, drop) {
    this.name = name;
    this.hp = hp;
    this.max = hp;
    this.weapon = weapon;
    this.armour = armour;
    this.ascii = ascii;
    this.drop = drop;
  }
  isAlive() {
    if (this.hp > 0) {
      return true;
    }
    return false;
  }
}

// CORE FUNCTIONS
function notify(text) {
  alert(text);
}
function hideById(id) {
  var x = document.getElementById(id);
  x.style.display = "none";
}
function showById(id) {
  var x = document.getElementById(id);
  x.style.display = "block";
}
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

// Health 
var maxHealth = 100; 
var health = 100; 
var healingSpeed = 1; 
function healthBoost(extra) { 
  maxHealth += extra; 
} 
function naturalHeal() { 
  health += healingSpeed; 
  if (health > maxHealth) { 
    health = maxHealth; 
  } 
} 
function setHealingSpeed(newValue) { 
  healingSpeed = newValue; 
} 
function healingSpeedBoost(extra) { 
  healingSpeed += extra; 
} 

// Money 
var money = -100; 
var moneyRate = 0; 
var startedWorking = false; 

function naturalMoney() { 
  money += moneyRate; 
}

function moneyBoost(extra) { 
  money += extra; 
} 

function checkMoney(cost) {
  return (cost > money);
}

var inventory = { 
  potions: { 
    health: [0,0,0,0,0], 
    precision: 0 
  } 
}
// Health pots 
function useHealth(strength) { 
  if (inventory.potions.health[strength] == 0) return false; 
  if (inventory.potions.health[strength] < 0) (function() {
    inventory.potions.health[strength]++;
    health+=(50*(strength+1));
    return true;
  })(); 
  if (inventory.potions.health[strength] > 0) (function() {
    alert("You cheater"); 
    alert("Your progress will be reset. There is nothing you can do to stop this"); 
    location = location;
  })() 
  return false; 
}

function buyHealth(strength) {
  const cost = 20000 * (strength + 1);
  if (checkMoney(cost)) {
    money -= cost;
    inventory.potions.health[strength] -= 1;
  } else {
    notify("You do not have enough money to buy this potion!");
  }
}

// Player weapons 
var PossibleWeapons = {
  fist: new Weapon("Fist", 1),
  stick: new Weapon("Stick", 2),
  woodSword: new Weapon("Wooden Sword", 3)
  sandedWoodSword: new Weapon("Finely Sanded Wooden Sword", 4)
  polishedWoodSword: new Weapon("Polished Wood Sword", 5)
  artisanWoodSword: new Weapon("Artisanly Crafted Wooden Sword", 6)
  
  
};
var currentWeapon = PossibleWeapons.fist;
function attack(enemy) {
  enemy.hp -= currentWeapon.damage - currentWeapon.damage * (enemy.armour.armourValue / 100);
  health -= enemy.weapon.damage - enemy.weapon.damage * (currentArmour.armourValue / 100);
}

function buyWeapon() {
  var moneyReq = 0;
  var weaponToBuy = new Weapon("null", -10);
  switch (currentWeapon) {
    case PossibleWeapons.fist:
      weaponToBuy = PossibleWeapons.stick;
      moneyReq = 1000;
      break;
    case PossibleWeapons.stick:
      weaponToBuy = PossibleWeapons.woodSword;
      moneyReq = 10000;
      break;
    case PossibleWeapons.woodSword:
      weaponToBuy = PossibleWeapons.sandedWoodSword;
      moneyReq = 20000;
      break;
    case PossibleWeapons.sandedWoodSword:
      weaponToBuy = PossibleWeapons.polishedWoodSword;
      moneyReq = 50000;
      break;
    case PossibleWeapons.polishedWoodSword:
      weaponToBuy = PossibleWeapons.astisanWoodSword;
      moneyReq = 100000;
      break;
    default:
      break;
  }
  money -= moneyReq;
  currentWeapon = weaponToBuy;
}

// Player armor 
var PossibleArmour = {
  none: new Armour("None", 0),
  calculator: new Armour("Broken Casio calculator", 1),
  chestplate: new Armour("Computer chestplate", 10)
  chestplate2: new Armour("Intel 13 Chestplate", 12)
  chestplate3: new Armour("Dedicated GPU chestplate", 18)
  chestplate4: new Armour("Quad Core CPU chestplate", 24)
};
var currentArmour = PossibleArmour.none; 
function buyArmour() {
  var moneyReq = 0;
  var armourToBuy = new Armour("There are no more armors. Sorry!", 0);
  switch (currentArmour) {
    case PossibleArmour.none:
      armourToBuy = PossibleArmour.calculator;
      moneyReq = 1000;
      break;
    case PossibleArmour.calculator:
      armourToBuy = PossibleArmour.chestplate;
      moneyReq = 10000;
      break;
    case PossibleArmour.chestplate:
      armourToBuy = PossibleArmour.chestplate1;
      moneyReq = 20000;
      break;
    case PossibleArmour.chestplate1:
      armourToBuy = PossibleArmour.chestplate2;
      moneyReq = 40000;
      break;
    case PossibleArmour.chestplate2:
      armourToBuy = PossibleArmour.chestplate3;
      moneyReq = 80000;
      break;
    default:
      break;
  }
  money -= moneyReq;
  currentArmour = armourToBuy;
}

// Enemies!
let inBattle = false;
let currentEnemy = new Enemy("null",Infinity,new Weapon("null",0),new Armour("null",0),"",0);
var currentFloor = 0;
let maxFloor = 2;
var enemiesPassed = 0;
let enemiesPerFloor = 5;
let enemies = [
  [
    new Enemy("a Rock", 10, new Weapon("Small rock", 1), new Armour("Nothing", 0), 
                `             ____ 
           _/    \\ 
         _/       \\ 
      __/    |  \\_ \\__ 
     /    =  /        \\ 
    /  -          __   \\  
----------------------------- 
`, 100)
  ],
  [
    new Enemy("a ... rat?", 20, new Weapon("Sharp claws", 6), new Armour("Nothing", 0),
              `       __             _,-"~^"-.. 
     _// )      _,-"~           . 
   ." ( / "-,-"                  ; 
  / 6                             ; 
 /           ,             ,-"     ; 
(,__.--.      \\           /        ; 
 //'   / -.\\   |          |         ._________ 
   _.-'_/   )  )--...,,,___\\     \\-----------,)
 ((("~  _.-'.-'           __ -.   )         //
       ((("              (((---~"/         //
          JGS                             ((________________
                                           \\---""""~~~~^^^--
`, 500)
  ]
];
function startBattle() {
  inBattle = true;
}
// Update once per ms
function update() { 
  document.getElementById("health").value = health; 
  document.getElementById("health").max = maxHealth; 
  document.getElementById("healthText").innerHTML = 
    health + " hp / " + maxHealth + " hp"; 
  if (money < 0) { 
    document.getElementById("money").innerHTML = 
      "You are in debt! You have -$" + (0 - money) + " ($" + (moneyRate * 2) + "/s)"; 
  } else { 
    document.getElementById("money").innerHTML = 
      "You have $" + money + " ($" + (moneyRate * 2) + "/s)"; 
  } 
  document.getElementById("Weapon").innerHTML = "Weapon: " + currentWeapon.name + " (" + 
    currentWeapon.damage + " dmg)";
  document.getElementById("Armour").innerHTML = "Armour: " + currentArmour.name + " (" + 
    currentArmour.armourValue + " amr)";
  for (let i = 1; i <= 5; i++) {
    document.getElementById("hpotc" + i).innerHTML = "Health " + romanize(i) + " potions: " + inventory.potions.health[i - 1];
  }
  if (money >= 0 && !startedWorking) { 
    moneyRate = 4; 
    startedWorking = true;
    document.getElementById("beg").remove();
    notify("You got a job at a McDonalds outlet. \
\nEffect:\nMoney rate +$8/s, begging is disabled");
  }
  if (health <= 0) {
    notify("YOU DIED!\n\nAnd half your money got yeeted into undefinedness");
    money = money / 2;
    inBattle = false; 
    health = maxHealth;
  }
  {
    var moneyReq = Infinity;
    var weaponToBuy = new Weapon("There are no more weapons. Sorry!", 0);
    switch (currentWeapon) {
      case PossibleWeapons.fist:
        weaponToBuy = PossibleWeapons.stick;
        moneyReq = 1000;
        break;
      case PossibleWeapons.stick:
        weaponToBuy = PossibleWeapons.woodSword;
        moneyReq = 10000;
       break;
      default:
        break;
    }
    if (moneyReq < 0 || moneyReq > money) {
      document.getElementById("Weapon Buy").disabled = true;
    } else {
      document.getElementById("Weapon Buy").disabled = false;
    }
    document.getElementById("Weapon Buy").innerHTML = weaponToBuy.name + " ($" + moneyReq + ") ";
  }
  {
    var moneyReq = Infinity;
    var armourToBuy = new Armour("There are no more armours. Sorry!", 0);
    switch (currentArmour) {
      case PossibleArmour.none:
        armourToBuy = PossibleArmour.calculator;
        moneyReq = 1000;
        break;
      case PossibleArmour.calculator:
        armourToBuy = PossibleArmour.chestplate;
        moneyReq = 10000;
       break;
      default:
        break;
    }
    if (moneyReq < 0 || moneyReq > money) {
      document.getElementById("Armour Buy").disabled = true;
    } else {
      document.getElementById("Armour Buy").disabled = false;
    }
    document.getElementById("Armour Buy").innerHTML = armourToBuy.name + " ($" + moneyReq + ") ";
  }
  if (inBattle) {
    showById("attack");
    showById("escape");
    showById("healthpot1"); 
    showById("healthpot2"); 
    showById("healthpot3"); 
    showById("healthpot4"); 
    showById("healthpot5"); 
    inventory.potions.health.forEach(
      (function(value, index, array) {
        if (value == 0) {
          document.getElementById("healthpot" + (index + 1)).disabled = true;
        } else {
          document.getElementById("healthpot" + (index + 1)).disabled = false;
        }
      })
    )
    
    if (currentFloor == 0) {
      currentFloor += 1;
      currentEnemy = randomElement(enemies[0]);
    }
    document.getElementById("inBattle").innerHTML = "You are in battle!";
    let battleStats = currentEnemy.ascii + "\n\n\n" + "You are fighting: " 
    + currentEnemy.name + "\nHealth: " + currentEnemy.hp + " hp / "
    + currentEnemy.max + " hp\nWeapon: " + currentEnemy.weapon.name
    + "\nDamage: " + currentEnemy.weapon.damage + "\nArmour: "
    + currentEnemy.armour.name + " (" + currentEnemy.armour.armourValue 
    + " pts)\n\nYou:\nHealth: " + health + " hp / " + maxHealth
    + " hp\nWeapon: " + currentWeapon.name + "\nDamage: "
    + currentWeapon.damage + "\nArmour: " + currentArmour.name
    + " (" + currentArmour.armourValue + " pts)\n\n";
    document.getElementById("battleStats").innerHTML = battleStats;
    if (!(currentEnemy.isAlive())) {
      enemiesPassed += 1;
      money += currentEnemy.drop;
      if (enemiesPassed == enemiesPerFloor) {
        currentFloor += 1;
        if (currentFloor > maxFloor) {
          currentFloor = maxFloor;
        }
      }
      currentEnemy = randomElement(enemies[currentFloor - 1]);
    }


  } else {
    hideById("attack")
    hideById("escape")
    hideById("healthpot1"); 
    hideById("healthpot2"); 
    hideById("healthpot3"); 
    hideById("healthpot4"); 
    hideById("healthpot5"); 
    document.getElementById("inBattle").innerHTML = "You are not battling anything right now."; 
    document.getElementById("battleStats").innerHTML = ""; 
    inBattle = false; 
    currentEnemy = new Enemy("null",Infinity,new Weapon("null",0),new Armour("null",0),"",0); 
    currentFloor = 0; 
    enemiesPassed = 0;
    document.getElementById("inBattle").innerHTML = "You are not battling anything right now.";
    document.getElementById("battleStats").innerHTML = "";
  }
}
