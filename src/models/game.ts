export class Game {
    public pickCardAnimation: boolean = false;
    public currentCard: string = '';
    public players: string[] = [];
    public playerImg: string[] = [];
    public stack: string[] = [];
    public playedCard: string[] = [];
    public currentPlayer: number = 0;

    constructor(){
        for (let i = 1; i < 2; i++) {
            
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }

        shuffle(this.stack);
    }

    public toJson() {
        return {
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
            players: this.players,
            playerImg: this.playerImg,
            stack: this.stack,
            playedCard: this.playedCard,
            currentPlayer: this.currentPlayer
        }
    }
}

function shuffle(array: string[]) {
    let currentIndex = array.length,  randomIndex: number;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }