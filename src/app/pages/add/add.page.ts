import { Component, OnInit } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { StoreClubKeyService } from 'src/app/services/store-club-key.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  myclubs
  clubs= [];
  hasAClub=false;
  isSlide: boolean = true;
  slides: any;
  clubKey;
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
  constructor(public runn: RunningService, private router: Router, 
    public loadingController: LoadingController,
    private _club: StoreClubKeyService, private _pic: StoreClubKeyService) {

    this.clubs=[]      
    
  
   }
   slideChanged()
   {
    this.slides.startAutoplay();
   }
   getdata()
   {
     
     return new Promise((resolve, reject) => {
       this.runn.rtMyClubs().subscribe(data =>{

        this.clubs = [];
      
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
  ngOnInit() {
    this.clubs = []
    this.getdata()
  }


  getAClubsEvents(clubKey,clubPic){
  
    this.router.navigate(['/club-profile']);
    this._club.storeClubKey(clubKey);
    this._pic.storeClubPic(clubPic)

    // this.router.navigateByUrl('club-profile');


  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 2000
    });
    await loading.present();
    
  }
  next(eventKey, i: number){
    console.log(i);
    console.log(this.clubs[i]);
    this._club.eventData(this.clubs[i]);
    
    this.router.navigate(['/clubUpdate']);
    // this._event.storeEventKey(eventKey)
   
  }
}
