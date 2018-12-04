import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from './player.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http:HttpClient) { }

  getPlayerData(): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>('assets/data/data.json');
  }
}
