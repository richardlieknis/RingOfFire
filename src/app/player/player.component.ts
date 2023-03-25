import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges{
  @Input() name:string;
  @Input() playerActive: boolean = false;

  constructor(){}

  ngOnInit() {
    //
  } 

  ngOnChanges(changes: SimpleChanges): void {
  }
}
