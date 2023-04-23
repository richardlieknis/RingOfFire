import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit, OnChanges{
@Input() name: string;
  @Input() playerImg: string = '2.jpg';
  @Input() playerActive: boolean = false;
  @Input() moreThanFive: boolean = false;


  game: Game;

  constructor(){}

  ngOnInit() {
    
  } 

  ngOnChanges(changes: SimpleChanges): void { }
}
