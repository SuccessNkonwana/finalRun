import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, PickerController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';
import { StoreEventKeyService } from 'src/app/services/store-event-key.service';
import { Key } from 'protractor';
import { database } from 'firebase';

@Component({
  selector: 'app-more-popover',
  templateUrl: './more-popover.page.html',
  styleUrls: ['./more-popover.page.scss'],
})
export class MorePopoverPage implements OnInit {
  _club: any;
  _pic: any;
  name;
  clubs=[];
  events= [];
  hasAClub=false;
  isSlide: boolean = true;
  slides: any;
  clubKey;
  newEvents: any;

  constructor(
   
    private popoverController:PopoverController,
    private navC : NavController,
    private _event: StoreEventKeyService,
    private router:Router,
    public runn: RunningService 
  ) { 
    this.clubs=[] 
    this.getEES()
  }

  getdata()
  {
    
    return new Promise((resolve, reject) => {
      this.runn.rtMyClubs().subscribe(data =>{

       this.clubs = [];
         console.log(data);      
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.clubs.push({ 
          clubKey:  data[x].id,
          name:  data[x].name,
          address:  data[x].address,
          info:  data[x].info,
          openingHours:  data[x].openingHours,
          closingHours:  data[x].closingHours,
          userID:  data[x].userID,
          photoURL:data[x].photoURL})
          
          this.clubKey=this.clubs[x].clubKey
        }
      console.log(this.clubs,"LAST ONE")
      console.log(this.clubKey,"the master key")

   
      if(this.clubs!=null)
      {
        this.hasAClub=true;
      }

     })
     
    })

  }


  getEES()
  {
   this.events; 
  
     this.runn.rtE().subscribe(data =>{
      console.log( data);
       console.log( data.length);
       this.events=[]
       for( let x = 0; x < data.length; x++ )
       {
        console.log(x);
        
        this.events.push({ 
          // info:data[x]
        //  clubKey:  data[x].clubKey,
        eventKey:  data[x].id,
         name:  data[x].name,
         address:  data[x].address,
         date: data[x].date,
         openingHours:  data[x].openingHours,
         closingHours:data[x].closingHours,
         price:data[x].price,
         info:data[x].info,
         photoURL:data[x].photoURL,
         clubKey:data[x].clubKey
       
       })
       console.log('**all events**',this.events[x])
       if(this.key==this.events[x].clubKey){
         this.name=this.events[x].name;
        console.log('**the choosen one**', this.name)
        // this.name=this.events[x].name;
      
        console.log(this.name)
       }
     
       }
     
     console.log(this.newEvents,"LAST ONE")
    })
   
   
  }
  
  
  eventData;defaultpic=true;key;pic;data;clubData
  ngOnInit() {
    this.clubs = []
    this.getdata()
    this.eventData=this._event.getEventData();
    console.log(this.eventData,"the event key")
    console.log(this.eventData.photoURL,"the event name")
    if(this.eventData.photoURL==null)
    {
       this.defaultpic=false;
     
    }

    
    this.pic=this._club.getClubPic();
    this.key = this._club.getClubKey();
    console.log(this.key,"the key***");
    console.log(this.pic,"the pic***");
    this.data=this._club.getEventData();

    console.log("club info",this.data)
    this.clubData=this._club.getEventData()
    console.log(this.clubData,"the event key")

   
    
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }
  // repayments(){
  //   this.navC.navigateForward("fullscreen")
  //   this.DismissClick();
  // }

  getAClubsEvents(clubKey,clubPic){
  
    this.router.navigate(['/club-profile']);
    this._club.storeClubKey(clubKey);
    this._pic.storeClubPic(clubPic)

    this.DismissClick();


  }
  next(eventKey, i: number){
    console.log(i);
    console.log(this.clubs[i]);
    this._club.eventData(this.clubs[i]);
    
    this.router.navigate(['/clubUpdate']);
    this.DismissClick();
   
  }

}
