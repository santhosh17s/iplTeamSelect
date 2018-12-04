import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map  } from 'rxjs/operators';
import { IPlayer } from './player.interface';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  [x: string]: any;
  appTitle: String = 'IPL Team Selection';
  private totalBudget: number = 100000000;
  private usedBudget: number = 0;
  private availBudget: number = 0;
  private teamStrength: number = 0;
  private totalPlayer: number = 0;
  private selectPlayerCnt: number = 0;
  availPlayers:IPlayer[];
 
  selectedPlayers:IPlayer[] = [];
  

   constructor(private player: PlayerService) {   }

   ngOnInit() {    

      this.player.getPlayerData()
                  .subscribe( data =>  {
                              this.availPlayers = data;
                              this.initialBudget();
                              this.calculateBudget(); 
                  });
   }

   initialBudget() {

    //Total Budget is sum of all player values
    this.totalBudget = this.availPlayers.map( (data) => data.value )
                                        .reduce( (prev, curr) => prev + curr );

   }

   calculateBudget(){

      let sumValue = 0;
     

      this.totalPlayer = this.availPlayers.length;
      this.selectPlayerCnt = this.selectedPlayers.length;
    
      if(this.selectPlayerCnt > 0) {

        this.usedBudget = this.selectedPlayers.map( (data) => data.value )
                                              .reduce( (prev, curr) => prev + curr ); 
        this.availBudget = this.totalBudget - this.usedBudget;      
        sumValue =  this.selectedPlayers.map( (plr) =>  100 - plr.bowRank + 100 - plr.batRank + 100 - plr.all )
                            .reduce( (pre, cur) => pre + cur);
      }                    
      
      //(Sum of all Strengths ) / # of Players * 3                    
      this.teamStrength = sumValue / (this.selectPlayerCnt * 3);

   }

   drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
          transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
    }

    //Calculate budget again
    this.calculateBudget();

  }

   /**  that only allows less than 15 players to be dropped into a list. */
  specialUseCase(drag?: CdkDrag, drop?: CdkDropList){
    if (drop.data.length < 15) {
      return true;
    }
    console.log("Can't drop you because there is enough items");
    return false;
  }
 

}
