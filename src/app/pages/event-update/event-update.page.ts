import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.page.html',
  styleUrls: ['./event-update.page.scss'],
})
export class EventUpdatePage implements OnInit {
  name:string;
  eventKey
  theName:string;
  events=[];
  constructor(private route:ActivatedRoute, 
    public runn:RunningService,
    private navCtrl: NavController) {
      this.events= []; 
    this.bookE();
     }
    bookE()
    {
   
    return new Promise((resolve, reject) => {
        this.runn.rtBooking().then(data =>{
          this.events= [];
          console.log(data.length," the event to update",data);
          
         
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
          this.eventKey=""
           this.eventKey=data[0].myevents[0].myevents.eventKey
          
        console.log(this.events,"the events")
       
       })
      })
    
    }
    back(){
      this.navCtrl.navigateRoot("/club-profile");
    }
  ngOnInit() {
   
  }

}
