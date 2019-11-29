import { Component, OnInit } from '@angular/core';
import {NgForm } from '@angular/forms';

import { PlayerService } from '../shared/player.service'
import { from } from 'rxjs';
import { Player } from '../shared/player.model';

declare var M: any;  //for a toast msg.its of type any. from materialize online

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers: [PlayerService]
})
export class PlayerComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshPlayerList();
  }


  resetForm(form?: NgForm){
    if(form)
        form.reset();
        this.playerService.selectedPlayer = {
          _id: "",
          player: "",
          rank: null,
          score: null,
          time: "",
          favourite_game:"",
          status:""

        }
  }
  onSubmit(form: NgForm){
    if(form.value._id==""){
    //to valiues from the form from player.service.ts
    //subscribes to the observer  return by postplayer
    this.playerService.postPlayer(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshPlayerList();
      M.toast({html: 'Saved successfully', classes: ' rounded'});
    });
  }
    else{
      this.playerService.putPlayer(form.value).subscribe((res) => {
        this.resetForm(form);  //reset the form
        this.refreshPlayerList(); // get the updated list
        M.toast({html: 'Updated successfully', classes: ' rounded'});
      });
  }
}

  refreshPlayerList(){
      this.playerService.getPlayerList().subscribe((res) => {
      //assigning res obj to an array,so we hv to cast it to player array
      this.playerService.players = res as Player[];
    });
  }

  onEdit(pl:Player){
    //populates the form field for u to edit for the selected player
      this.playerService.selectedPlayer = pl;
  }

  onDelete(_id:String, form:NgForm){
    if(confirm('Are u sure you want to delete? ')== true){
          this.playerService.deletePlayer(_id).subscribe((re)=>{
            this.refreshPlayerList();
            this.resetForm();
            M.toast({html: 'deleted successfully', classes: ' rounded'});
          });
    }

  }
}
