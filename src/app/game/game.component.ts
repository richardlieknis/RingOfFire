import { Component, OnChanges, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatButtonModule } from '@angular/material/button';
 import {MatDialog, MatDialogRef} from '@angular/material/dialog'; 
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogShowErrorComponent } from '../dialog-show-error/dialog-show-error.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnChanges {
  pickCardAnimation: boolean = false;
  enoughPlayers: boolean = false;
  currentCard: string = '';
  currentPlayer: number = 0;
  labelSpacing: number = 90;

  game: Game;

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
      this.game = new Game();
  }

  ngOnChanges() {
    //
  }

  checkPlayerAmount() {
    this.showErrorIfTooLessPlayer();
    return this.game.players.length;
  }

  showErrorIfTooLessPlayer() {
    
  }

  newGame(){
      this.game = new Game();
  }
  takeCard(){
    if (!this.pickCardAnimation && this.checkPlayerAmount() > 1) {
      this.enoughPlayers = true;
        this.currentCard = this.game.stack.pop();
        this.pickCardAnimation = true;
    
      setTimeout(() => {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 2500 )
    } else if (this.checkPlayerAmount() <= 1){
      this.openDialog();
    }
  }

   openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

     dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        }
     });
   }
  
  openErrorDialog(): void {
    const dialogRef = this.dialog.open(DialogShowErrorComponent);
    console.log(dialogRef);
  }

}
