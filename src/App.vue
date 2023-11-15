<template>
  <div id="container">
    <div id="rank">
      <a id="logo" href="https://2048.io">
        <span id="easy">easy</span>
        <span id="egongsapal">2048</span>
      </a>
      <div id="scores">
        <div class="score">
          <div class="scoreText">SCORE</div>
          <div class="scoreNumber">0</div>
        </div>
        <div class="score">
          <div class="scoreText">BEST</div>
          <div class="scoreNumber">0</div>
        </div>
      </div>
    </div>

    <div id="rank2">
      <div id="info">
        <span>Join the numbers and get to the</span>
        <span class="boldInfo">2048 tile!</span>
      </div>
      <div id="newGame" @click="onNewGame">New Game</div>
    </div>

    <div id="gameBoard">
      <table id="gameTable">
        <tbody>
          <tr v-for="i in Array(4)" :key="i">
            <td v-for="j in Array(4)" :key="j">
              <div class="cell"></div>
            </td>
          </tr>
        </tbody>
      </table>
      <The-Cell v-for="cell in cells" :key="cell" :info="cell"></The-Cell>
    </div>

    <div id="howToPlay">
      <span class="boldInfo">HOW TO PLAY:</span>
      <span >Use your</span>
      <span class="boldInfo">arrow keys</span>
      <span>to move the tiles. When two tiles with the same number touch, they</span>
      <span class="boldInfo">merge into one!</span>
    </div>

    <div id="hr"></div>

    <div id="bys">
      <span>Created by</span>
      <span class="boldInfo underline">DennisYun.</span>
      <span>Based on</span>
      <a class="boldInfo underline" href="https://2048.io/" target="_blank">2048 by Gabriele Cirulli</a>
      <span>which is based on</span>
      <a class="boldInfo underline" href="https://apps.apple.com/us/app/1024/id823499224" target="_blank">1024 by Veewo Studio</a>
      <span>and conceptually similar to</span>
      <a class="boldInfo underline" href="https://asherv.com/threes/" target="_blank">Threes by Asher Vollmer.</a>
    </div>
  </div>

</template>

<script setup lang="ts">
  import { Ref, ref } from "vue";
  import TheCell from "./components/TheCell.vue";
  import { Game, Cell } from "./implement/2048";

  let cells: Ref<Cell[]> = ref([]);

  const game = new Game();

  function newGame() {
    for (let i = 0; i < 2; i++) {
      const cell = game.fill();
      if (cell.num != -1) {
        cells.value.push(cell);
      }
    }
  }

  newGame();

  const listener = (e: KeyboardEvent) => {
    cells.value = cells.value.filter(v => v.valid);

    const keys = ["Up", "Down", "Left", "Right"];
    const ndirection = keys.findIndex(v => "Arrow" + v == e.key);

    if (ndirection != -1) {
      const paths = game.move(ndirection);
      if (paths.length > 0) {
        for (let path of paths) {
          for (let cellIndex in cells.value) {
            if (path.from.toString() == cells.value[cellIndex].position.toString()) {
              cells.value[cellIndex].position = path.to;
              if (path.x2) {
                cells.value.push({
                  num: path.result,
                  position: path.to,
                  valid: true,
                  newDueToMerge: true
                });
                cells.value[cellIndex].valid = false;
              }
            }
          }
        }

        const cell = game.fill();
        if (cell.num != -1) {
          cells.value.push(cell);
        }
        if (game.is_over()) {
          console.log("Game is over");
          document.removeEventListener("keydown", listener);
        }
      }
    }
  };

  document.addEventListener("keydown", listener);

  function onNewGame() {
    cells.value = [];
    game.reset();
    newGame();
  }
</script>

<style>
  @import url('https://fonts.cdnfonts.com/css/clear-sans');

  #container {
    width: 503px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 70px;
  }

  #rank {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  #logo {
    font-size: 68px;
    font-family: "Clear Sans";
    font-weight: bold;
    text-decoration: none;
  }

  #easy {
    color: #bbada0;
  }
  #egongsapal {
    color: #776e65;
  }

  #scores {
    display: flex;
    gap: 10px;
  }

  .score {
    background-color: #bbada0;
    text-align: center;
    border-radius: 3px;
    width: 80px;
    align-items: flex-end;
    padding-top: 5px;
  }

  .scoreText {
    color: #eee4da;
    font-family: "Clear Sans";
    font-size: 13px;
    font-weight: bold;
  }
  .scoreNumber {
    color: white;
    font-family: "Clear Sans";
    font-size: 25px;
    font-weight: bold;
  }

  #rank2 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  #info {
    height: 40px;
    line-height: 40px;
    color: #776e65;
    font-size: 18px;
    font-family: "Clear Sans";
  }
  .boldInfo {
    font-weight: bold;
  }

  #newGame {
    border-radius: 3px;
    padding: 0 20px;
    text-decoration: none;
    color: #f9f6f2;
    background-color: #8f7a66;
    height: 40px;
    text-align: center;
    font-family: "Clear Sans";
    font-size: 18px;
    font-weight: bold;
    line-height: 40px;
    user-select: none;
  }
  #newGame:hover {
    cursor: pointer;
  }

  #gameBoard {
    position: relative;
  }

  #gameTable {
    border-collapse: collapse;
    border-radius: 5px;
    background-color: #bbada0;
    overflow: hidden;
    border-spacing: 0;
  }
  #gameTable td {
    width: 107px;
    height: 107px;
    border: 15px solid #bbada0;
    padding: 0;
  }

  #gameTable .cell {
    width: 107px;
    height: 107px;
    border-radius: 3px;
    background-color: #cdc1b4;
  }

  #howToPlay {
    margin-top: 50px;
    color: #776e65;
    font-size: 18px;
    font-family: "Clear Sans";
    margin-bottom: 18px;
  }

  #hr {
    border-top: 1px solid #decebf;
  }

  #bys {
    margin-top: 25px;
    color: #776e65;
    font-size: 18px;
    font-family: "Clear Sans";
  }

  .underline {
    text-decoration: underline;
  }

  span, a {
    padding-right: 4px;
  }
  a {
    color: #776e65;
  }
</style>