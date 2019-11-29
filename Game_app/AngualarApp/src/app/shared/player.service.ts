import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  selectedPlayer: Player;
  players: Player[];
  readonly baseURL = 'http://localhost:3000/players';

  constructor(private http: HttpClient) { }

  
  statusArray =['UNAVAILABLE','AVAILABLE'];
  rankArray = [1,2,3,4,5,6,7,8,9,10];

  //in order to consume edit,add, delete route from the nodeJS, we use the following
  postPlayer(pl: Player){
    //returns an observer
    return this.http.post(this.baseURL, pl);
  }

  getPlayerList(){
    return this.http.get(this.baseURL);
  }
  putPlayer(pl: Player){
    return this.http.put(this.baseURL + `/${pl._id}`,pl);
  }
  deletePlayer(id:String){
    return this.http.delete(this.baseURL + `${id}`);
  }
}
