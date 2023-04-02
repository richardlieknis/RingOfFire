import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { collection, collectionData, doc, Firestore, setDoc, docData, CollectionReference, DocumentData, getFirestore } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { addDoc } from '@firebase/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit  {
  private gameCollection: CollectionReference<DocumentData>;

constructor(private router: Router, private firestore: Firestore){
  this.gameCollection = collection(this.firestore, 'games');
}

ngOnInit() {

}
  newGame() {
    let game = new Game();
    addDoc((this.gameCollection), game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl("/game/" + gameInfo.id);
  }); 
  
}
}
