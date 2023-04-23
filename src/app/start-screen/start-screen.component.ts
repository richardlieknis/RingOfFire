import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { collection, collectionData, doc, Firestore, setDoc, docData, CollectionReference, DocumentData, getFirestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit  {
  private gameCollection: CollectionReference<DocumentData>;
  existingGameId: string[] = [];
  existingGamePlayers: string[] = [];
  showLobby: boolean = false;

constructor(private router: Router, private firestore: Firestore){
  this.gameCollection = collection(this.firestore, 'games');
}

  ngOnInit() {
    collectionData(this.gameCollection, { idField: 'id' }).subscribe((data) => {
      data.forEach(game => {
        this.existingGameId.push(game['id']);        
        this.existingGamePlayers.push(game['players'].length);        

      })
    })
    console.log(this.existingGameId);
    console.log(this.existingGamePlayers);

  }
  newGame() {
    let game = new Game();
    addDoc((this.gameCollection), game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl("/game/" + gameInfo.id);
  });   
  }
  
  joinGame(gameId) {
    console.log(gameId);
  }

  toggleLobby() {
    this.showLobby =! this.showLobby;
  }
}
