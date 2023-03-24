import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatButtonModule } from '@angular/material/button';
 import {MatDialog, MatDialogRef} from '@angular/material/dialog'; 
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
      this.game = new Game();
      console.log(this.game);
  }
  newGame(){
      this.game = new Game();
  }
  takeCard(){
    if (!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop();
     
      this.pickCardAnimation = true;
      setTimeout(() => {
         this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 2500 )
    }
  }

   openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
