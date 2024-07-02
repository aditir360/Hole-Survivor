/*
@title: Hole Survivor
@author: Aditi Ranjan
*/

const player = "p";
const obstacle = "o";
const goal = "g";
const hole = "x";
const ground = "l";

setLegend(
  [player, bitmap`
444DDDDDDDDDDDDD
DDDDDDDDDDDDD44D
DD444DCCCCCDDDDD
DDDDDD33333DDDDD
DDDDCCCCCCCCCDDD
DDDDDD08880D00DD
DDDD000C8C0D0DDD
DDDD0D0888000DDD
44D00D05550DDDDD
DDDDD008880DDDDD
DDDDD088880D44DD
DDDDD088800DDDDD
D44DD00000DDDDDD
DDDDDD0D0DDDDDDD
DDDDD00D00DDDDDD
44DDDDDDDDDDDD44`],
  [obstacle, bitmap`
0000000000000000
033CCCC0CCCCC330
0CCC33C033CCCCC0
0000000000000000
0333CCC0333CCCC0
0CCCC330CCCCCCC0
0CCCCCC0CCC33CC0
0000000000000000
0CCCCCC0CCCCCCC0
033CCCC033CCCCC0
0CCCC330CCCCCCC0
0CCCCCC0CCC33CC0
0000000000000000
033CCCCCCCCC33C0
0CCCCC33CC3CCCC0
0000000000000000`],
  [goal, bitmap`
DDDDDDDDDDDD44DD
DDDDDDDDDDDDDDDD
D4400000D000000D
DDD044000004440D
DDD044D444D4440D
DDD044D444D4440D
DDD044D444D4440D
DDD044D444D4440D
DDD000044400000D
DDD0DD00000DDD4D
44D0DDDDDDDDDDDD
DDD0DD444DDDDDDD
DDD0DDDDDDDD44DD
DDD0DDDDD44DDDDD
DDD0DDDDDDDDDDDD
DDD0DDDDDDDDDDDD`],
  [hole, bitmap`
DDDDDDDDDDDDDD44
D444DDDDDDDDDDDD
DDDDDD44DDDD44DD
DDDDDDDDDDDDDDDD
DDDDDCCCCCCDDDDD
DDDCCCCCCCCCDDDD
DDCCCCCCCCCCCDDD
DCCCCLLLLLLCCCDD
DCCCLLLLLLLLCCDD
DCCCLLLLLLLLCCDD
DCCCCLLLLLLCCCDD
DDCCCCCCCCCCCDDD
DDDCCCCCCCCCDDDD
DDDDDDDDDDDDDDDD
DDDDD44DDDDD44DD
D44DDDDDDDDDDDDD`],
  [ground, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDD4444D
DD444DDDDDDDDDDD
DDD4444DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD444444DDDD
DDDDDDDD4444DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD444DDDDDDDDD
DDDDD44DDDDDDDDD
DDDDDDDDDDD44DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
);

setSolids([player, obstacle]);

let level = 0;
const levels = [
  map`
plxolooooooooooo
olloxlolxlllllxo
oolololllollollo
oolooollllxlllxo
oolllloollllollo
ooloolllxllllloo
ooloooooololxloo
lollollxollllxlo
oxllxllloxllxllo
lxlllllxlloollxo
ololllolooooxlll
olooloolxlllolol
ooooxoooooolxgox`
];


setMap(levels[level]);

setPushables({
  [player]: []
});


onInput("w", () => {
  getFirst(player).y -= 1;
  checkCollision();
});

onInput("a", () => {
  getFirst(player).x -= 1;
  checkCollision();
});

onInput("s", () => {
  getFirst(player).y += 1;
  checkCollision();
});

onInput("d", () => {
  getFirst(player).x += 1;
  checkCollision();
});

function checkCollision() {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  // Check if player collides with an obstacle
  const isCollidingWithObstacle = getTile(playerPos.x, playerPos.y).some(sprite => sprite.type === hole);
  if (isCollidingWithObstacle) {
    addText("You Died!", { x: 4, y: 4, color: color`2` });
    setTimeout(() => setMap(levels[level]), 1000); // Reset the level after a short delay
    return;
  }

  // Check if player reaches the goal
  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { x: 4, y: 4, color: color`2` });
    }
  }
}
