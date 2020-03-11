import { Component, OnInit } from '@angular/core';
import { RunningService } from '../services/running.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreClubKeyService } from '../services/store-club-key.service';
import { StoreEventKeyService } from '../services/store-event-key.service';
@Component({
  selector: 'app-club-profile',
  templateUrl: './club-profile.page.html',
  styleUrls: ['./club-profile.page.scss'],
})
export class ClubProfilePage implements OnInit {
  clubs=[]
  saved=false;
  hasAEvent=false
  clubName:String=""
  photoURL:String=""
  events= [];
  isSlide: boolean = true;
  slides: any;
  eventKey
  slideOpts = {
    slidesPerView: 2.5,
    spaceBetween:10,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
    }
  constructor(private router:ActivatedRoute, public route:Router, 
    public navCtrl:NavController, public runn: RunningService, 
    public loadingController: LoadingController,private _event:StoreEventKeyService,
     private _pic: StoreClubKeyService, private _club: StoreClubKeyService) {
    this.clubs=[] 
    this.events= []; 
    this.clubName=null
  this.photoURL=null  
    // this.getdata()
    this.getEES()
   }
  slideChanged()
  {
   this.slides.startAutoplay();
  }
  key;pic;data;
  ngOnInit() {
  this.pic=this._pic.getClubPic();
    this.key = this._club.getClubKey();
    console.log(this.key,"the key***");
    console.log(this.pic,"the pic***");
    this.data=this._club.getEventData();
    console.log("club info",this.data)
  }
  newEvents:[];name;
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
  currentClub()
  {
   
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 4000
    });
    await loading.present();
    
    loading.dismiss()
  }
  update(eventKey, i: number){
    console.log(i);
    console.log(this.events[i]);
    this._event.eventData(this.events[i]);
    
    this.route.navigate(['/eventUpdate']);
    // this._event.storeEventKey(eventKey)
   
  }
 
}