import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatButtonModule } from '@angular/material/button';
 import {MatDialog, MatDialogRef} from '@angular/material/dialog'; 
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogShowErrorComponent } from '../dialog-show-error/dialog-show-error.component';
import { collection, collectionData, doc, Firestore, setDoc, docData, CollectionReference, DocumentData, getFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from '@angular/fire/app';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { update } from '@firebase/database';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
  
export class GameComponent implements OnInit, OnChanges {
  gameInfoJson: any;
  currentPlayer: number = 0;
  labelSpacing: number = 70;
  lastCard: string;
  lastCardDisplay: boolean = false;
  game: Game;
  gameId: string;
  private gameCollection: CollectionReference<DocumentData>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private firestore: Firestore,
    private gameService: GameService
  ) {
    this.gameCollection = collection(this.firestore, 'games');
  }

  ngOnInit(): void {
    this.gameInfoJson = this.gameService.getGameInfo();
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
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCard = game.playedCard;
      this.game.players = game.players;
      this.game.playerImg = game.playerImg;
      this.game.stack = game.stack;
    })
  }

  checkPlayerAmount() {
    return this.game.players.length;
  }

  newGame() {
    this.game = new Game();;
  }

  backToLobby() {
    this.router.navigateByUrl("/");
  }

  takeCard() {
    if (!this.game.pickCardAnimation && this.checkPlayerAmount() > 1 && !this.gameIsOver()) {
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

  showLastCard() {
    if (this.game.playedCard.length > 1){
      this.lastCardDisplay = true;
      this.lastCard = this.game.playedCard[this.game.playedCard.length - 2];
    }
  }

  hideLastCard() {
    this.lastCardDisplay = false;
  }

  gameIsOver() {
    if (this.game.stack.length === 0) {
        return true;  
    } else return false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

     dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.game.playerImg.push('2.jpg');
        this.updateGame();
        }
     });
  }
  
  editPlayer(playerId) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change === 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playerImg.splice(playerId, 1);
        } else this.game.playerImg[playerId] = change; 
      }
      this.updateGame();
     });
  }
  
  updateGame() {
    const docRef = doc(this.gameCollection, this.gameId);
    setDoc(docRef, this.game.toJson());
  }
}
