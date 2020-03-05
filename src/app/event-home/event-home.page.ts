import { Component, OnInit } from '@angular/core';
import { RunningService } from '../services/running.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.page.html',
  styleUrls: ['./event-home.page.scss'],
})
export class EventHomePage implements OnInit {
  eventName;
  bookingID
  eventAddress;
  eventOpeningHours;
  eventClosingHours;
  price:number;
  eventKey;
  name
  date
  distance
 
 tickets:number=0;
 total:number=0;
  hasAEvent=true;
events=[];
  constructor(public route:Router,public navCtrl:NavController,private clubService:RunningService) { 
    this.events= []; 
    this.bookE();
  }

  bookE()
  {
 
  return new Promise((resolve, reject) => {
      this.clubService.rtBooking().then(data =>{
        this.events= [];
        console.log(data.length," book ts selected event",data);
        
       
        this.events.push({ 
          eventKey:  data[0].myevents[0].myevents.eventKey, 
          name:  data[0].myevents[0].myevents.name,
          address:  data[0].myevents[0].myevents.address,
          openingHours:  data[0].myevents[0].myevents.openingHours,
          closingHours:data[0].myevents[0].myevents.closingHours,
          price:data[0].myevents[0].myevents.price,
          date:data[0].myevents[0].myevents.date,
          distance:data[0].myevents[0].myevents.distance,
          clubKey:data[0].myevents[0].myevents.clubKey
        
        })
        // this.eventKey=""
        this.name=  data[0].myevents[0].myevents.name;
         this.eventKey=data[0].myevents[0].myevents.eventKey;
         this.date=data[0].myevents[0].myevents.date;
         this.distance=data[0].myevents[0].myevents.distance;
        
        
 
      console.log(this.events,"the events")
      this.price=data[0].myevents[0].myevents.price;
    

     })
    })
  
  }


back(){
  this.route.navigate(['/home'])
}

  ngOnInit() {
  }

}
