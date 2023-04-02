import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatButtonModule } from '@angular/material/button';
 import {MatDialog, MatDialogRef} from '@angular/material/dialog'; 
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogShowErrorComponent } from '../dialog-show-error/dialog-show-error.component';
import { collection, collectionData, doc, Firestore, setDoc, docData, CollectionReference, DocumentData, getFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
  
export class GameComponent implements OnInit, OnChanges {
  currentPlayer: number = 0;
  labelSpacing: number = 90;
  game: Game;
  gameId: string;
  items: Observable<any>;
  private gameCollection: CollectionReference<DocumentData>;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {
    this.gameCollection = collection(this.firestore, 'games')
    this.items = collectionData(this.gameCollection);
  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.setGameData(this.gameId);
    });
    
  }

  ngOnChanges() {
    this.updateGame();
  }

  setGameData(id: string) {
    const docRef = doc(this.gameCollection, id);
    const gameData = docData(docRef);
    gameData.subscribe((game: any) => {
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCard = game.playedCard;
      this.game.players = game.players;
      this.game.stack = game.stack;
    })
  }

  checkPlayerAmount() {
    return this.game.players.length;
  }

  newGame() {
    this.game = new Game();;
    
  }

  takeCard(){
    if (!this.game.pickCardAnimation && this.checkPlayerAmount() > 1) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.updateGame();
      setTimeout(() => {
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
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
        this.updateGame();
        }
     });
   }
  
  updateGame() {
    const docRef = doc(this.gameCollection, this.gameId);
    setDoc(docRef, this.game.toJson());
  }
}
