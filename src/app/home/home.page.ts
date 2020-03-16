import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RunningService } from '../services/running.service';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { StoreClubKeyService } from '../services/store-club-key.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {
  clubs = [];
  tickets = [];
  theUser = [];
  BE = [];
  hasATicket = false;
  hasAClub = false;
  defaultpic = true;

  isSlide: boolean = true;
  slides: any;
  slideOpts = {
    slidesPerView: 1.2,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 50,
      modifier: 1,
      slideShadows: true,
    }
  }
  slideOptsT = {
    slidesPerView: 2.5,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 85,
      modifier: 1,
      slideShadows: true,
    }
  }
  constructor(  private _club: StoreClubKeyService,private datePipe: DatePipe, private router: Router, public runn: RunningService, public loadingController: LoadingController, ) {
    this.tickets = []
    this.clubs = []
    this.theUser = []
    this.getdata()
    this.getUser()
    this.getTickets()
    this.presentLoading();
  
  }
  ngOnInit() {
    //  this.getBooked();
  }
  k;approved:[];done:[]
  getTickets() {

  
     
      this.runn.rtTickets().subscribe(data => {
        this.tickets = []
        this.approved = []

        this.hasATicket = false;
            this.sum;
            this.kilos;
        console.log(data);
        console.log(data.length);
        for (let x = 0; x < data.length; x++) {
          console.log(x);

          this.tickets.push({
            bookingID: data[x].bookingID,
            eventKey: data[x].eventKey,
            name: data[x].name,
            address: data[x].address,
            openingHours: data[x].openingHours,
            closingHours: data[x].closingHours,
            userID: data[x].userID,
            clubID: data[x].clubKey,
            price: data[x].price,
            date: data[x].date,
            distance: data[x].distance,
            tickets: data[x].tickets,
            total: data[x].total,
            info: data[x].info,
            approved: data[x].approved,
            deposited: data[x].deposited

          })
          console.log(this.tickets, "All tickets under the loged in user")
          console.log(this.tickets.length)
          if(this.tickets[x].approved==true){
            this.hasATicket = true;
            this.sum= this.tickets.length;
            this.dat=this.tickets[x].date;
            this.kilos +=Number.parseInt(this.tickets[x].distance);


            
          if (new Date(this.y) > new Date(this.tickets[x].date)) {
            console.log(this.tickets[x].date,"###")
            this.past += Number.parseInt(this.tickets[x].distance);
          } else {
            console.log("it is not");
            // this.past += Number.parseInt(this.BE[x].info.distance);

          }
          }
        }
     
        // if (this.tickets.length != 0 && this.tickets != null) {
        //   this.hasATicket = true;
        // }
      })

  
  }
  
  getdata() {
    
    this.runn.getclub().subscribe(data=>{
      this.clubs = []
      console.log(data.length);
          for (let x = 0; x < data.length; x++) {
            console.log(x);
  
            this.clubs.push({
              clubKey: data[x].id,
              name: data[x].name,
              openingHours: data[x].openingHours,
              address: data[x].address,
              info: data[x].info,
              closingHours: data[x].closingHours,
              userID: data[x].userID,
              photoURL: data[x].photoURL
            })
  
  
          }
          console.log(this.clubs, "LAST ONE")
  
          if (this.clubs.length != 0 && this.clubs != null) {
            this.hasAClub = true;
          }
        
    })
    
  

  }
  sum = 0;
  kilos = 0;
  past = 0;
  pastkilos = 0;
  dat;
  day: string = new Date().toISOString();
  y: string = this.day.split('T')[0];
  n:'';
  d;t;
 
  getUser() {


    return new Promise((resolve, reject) => {
      this.theUser = []
      this.runn.getUser().subscribe(data => {
        console.log(data);
        console.log(data.length);

        this.theUser = []
        for (let x = 0; x < data.length; x++) {
          console.log(x);

          this.theUser.push({
            userKey: data[x].userKey,
            name: data[x].name,
            age: data[x].age,
            email: data[x].email,
            gender: data[x].gender,
            photoURL: data[x].photoURL
          }

          )
          if (this.theUser[x].photoURL == null) {
            this.defaultpic = false;
  
          }

        }
        // console.log(this.theUser, "the LAST ONE vele")
       
      })

    })

  }
  slideChanged() {
    this.slides.startAutoplay();
  }
  go() {
    this.router.navigateByUrl("book-event")
  }
  goHome() {
    this.router.navigateByUrl("home")
  }
  gotoProfile() {
    this.router.navigateByUrl("profile")
  }
 
 
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      duration: 4000
    });
    await loading.present();

    loading.dismiss()
  }
  
  booking(myevents) {
    this.runn.booking(myevents)
  }

  getAClubsEvents(clubKey,clubPic){
  
    this.router.navigate(['/club-profile']);
    this._club.storeClubKey(clubKey);
    // this._pic.storeClubPic(clubPic)

    // this.router.navigateByUrl('club-profile');


  }
 
  next(eventKey, i: number){
    console.log(i);
    console.log(this.clubs[i]);
    this._club.eventData(this.clubs[i]);
    
    this.router.navigate(['/club-home']);
    // this._event.storeEventKey(eventKey)
   
  }
}
