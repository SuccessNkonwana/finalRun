import { Component, OnInit } from '@angular/core';
import { RunningService } from '../services/running.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
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
  constructor( public route:Router, public navCtrl:NavController, public runn: RunningService, public loadingController: LoadingController) {
    this.clubs=[] 
    this.events= []; 
    this.clubName=null
  this.photoURL=null  
    this.getdata()
    // this.getEES()
   }
  slideChanged()
  {
   this.slides.startAutoplay();
  }
  ngOnInit() {
    // this.presentLoading();
  
  }
 
getEES()
{
 this.events= []; 
 return new Promise((resolve, reject) => {
   this.runn.rtClubEvents().then(data =>{
  
     console.log( data.length);
     for( let x = 0; x < data.length; x++ )
     {
      console.log(x);
      
     this.events.push({ 
       eventKey:  data[x].eventKey,
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
      
     }
     if(this.events.length!=0 && this.events!=null)
     {
       this.hasAEvent=true;
       this.saved=true;
     }
   console.log(this.events,"LAST ONE")
  })
 
 })
}
  getdata()
  {
    this.clubs=[] 
    this.events= []; 
  this.clubName=null
  this.photoURL=null
  this.clubs= this.runn.rtClubName() 
  this.clubName=this.clubs[0].myclubs.name
  this.photoURL=this.clubs[0].myclubs.photoURL
  console.log(this.clubs," $$$$$$$$$$$$");
  console.log(this.clubName," $$$$$$$$$$$$");
  console.log(this.photoURL,"$$$$$$$$$");
    return new Promise((resolve, reject) => {
      this.runn.rtClubEvents().then(data =>{
     
        console.log( data.length);
        for( let x = 0; x < data.length; x++ )
        {
         console.log(x);
         
        this.events.push({ 
          eventKey:  data[x].eventKey,
          name:  data[x].name,
          address:  data[x].address,
          openingHours:  data[x].openingHours,
          closingHours:data[x].closingHours,
          price:data[x].price,
          date:data[x].date,
          info:data[x].info,
          distance:data[x].distance,
          photoURL:data[x].photoURL,
          clubKey:data[x].clubKey
        
        })
       
       
        }
        if(this.events.length!=0 && this.events!=null)
        {
          this.hasAEvent=true;
        }
 
      console.log(this.events,"the event")
     })
     this.presentLoading();
    })
  
  }
  currentClub(myclubs)
  {
    console.log(myclubs+"@@@@@@@@@@")
    this.runn.currentClub(myclubs)
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 4000
    });
    await loading.present();
    
    loading.dismiss()
  }
  update(myevents){
    this.runn.booking(myevents)
    // this.navCtrl.navigateRoot("/eventUpdate");
    // this.route.navigate(['/eventUpdate'],{queryParams:{events:this.getEES()}})


  }
}