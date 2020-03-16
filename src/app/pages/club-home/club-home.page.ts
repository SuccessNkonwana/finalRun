import { Component, OnInit } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';
import { StoreClubKeyService } from 'src/app/services/store-club-key.service';
import { StoreEventKeyService } from 'src/app/services/store-event-key.service';

@Component({
  selector: 'app-club-home',
  templateUrl: './club-home.page.html',
  styleUrls: ['./club-home.page.scss'],
})
export class ClubHomePage implements OnInit {
club=[]
saved=false;
events=[]
hasAEvent=false
eventData;
  constructor( private _event: StoreEventKeyService,private _club: StoreClubKeyService,public runn: RunningService) { 
    this.club=[] 
   
   
    
  }
  key;pic;data;clubData
  ngOnInit() {
    // this.pic=this._club.getClubPic();
  
    this.data=this._club.getEventData();

    console.log("club info",this.data)
    this.clubData=this._club.getEventData()
    console.log(this.clubData,"the event key")
    this.key = this.clubData.clubKey;
    console.log(this.key,"the key***");
   
  }
x;
  
    getAClubsEvents() {
      this.saved=true;
       this.runn.getEvent().subscribe(data=>{
        console.log(data)
        this.events=[]
         for(let x=0;x<data.length;x++){
            console.log(data[x])
           if(data[x].clubKey== this.key){
            console.log("The events of the current club",data)
            this.events.push(data[x])
            console.log("The events",this.events)
           }
         
         }
        
       })
    
      
  }
 
  booking(myevents){
    this.runn.booking(myevents)
   }
  clearEvents()
  {

    this.events=[]
    this.saved=false;
  }
}
