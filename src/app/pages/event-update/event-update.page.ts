import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';

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
  nn:string="";
  tempUser:string="";
  addresses:string[]=[];
  selectedAddress=null;
  coordinates;
  lat;
  lng;
  user : any;
  list:any;
  private uid: string= null;
  constructor(private route:ActivatedRoute,  public loadingController: LoadingController,
    public runn:RunningService,  private altctrl: AlertController,
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
            info:data[0].myevents[0].myevents.info,
            distance:data[0].myevents[0].myevents.distance,
            clubKey:data[0].myevents[0].myevents.clubKey
          
          })
          // this.eventKey=""
           this.eventKey=data[0].myevents[0].myevents.eventKey
          
        console.log(this.events,"the events")
       
       })
      })
    
    }
    back(){
      this.navCtrl.navigateRoot("/club-profile");
    }


    // update event name
    async nameUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'displayName',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: 'displayName'
          },
  
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Ok',
            handler: (inputData) => {
              this.nn=inputData.displayName;
  
              // this.tempUser=this.theUser[0]
              console.log(this.nn+"ddfdddfdfdd",evnt)
              this.runn.updateEName(this.eventKey,this.nn)
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }
//update event address
    async AddressUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'displayName',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: 'Address'
          },
  
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Ok',
            handler: (inputData) => {
              this.nn=inputData.displayName;
  
              // this.tempUser=this.theUser[0]
              console.log(this.nn+"ddfdddfdfdd",evnt)
              this.runn.updateEAddress(this.eventKey,this.nn)
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }
    //update event date

    async DateUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'displayName',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: '01-01-2012'
          },
  
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'Ok',
            handler: (inputData) => {
              this.nn=inputData.displayName;
  
              // this.tempUser=this.theUser[0]
              console.log(this.nn+"ddfdddfdfdd",evnt)
              this.runn.updateEDate(this.eventKey,this.nn)
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }
//update event openHours

async OpenUpdate(evnt) {

    
  const alert = await this.altctrl.create({
    subHeader: 'Add/Edit Name',
    inputs: [
      {
        name: 'displayName',
        type: 'text',
        // value: this.theUser[0].displayName,
        placeholder: '00:00'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Ok',
        handler: (inputData) => {
          this.nn=inputData.displayName;

          // this.tempUser=this.theUser[0]
          console.log(this.nn+"ddfdddfdfdd",evnt)
          this.runn.updateEOpen(this.eventKey,this.nn)
          this.presentLoading();


        }
      }
    ]
  });
  await alert.present();
  let result = await alert.onDidDismiss();

}
//update event closing hours

async CloseUpdate(evnt) {

    
  const alert = await this.altctrl.create({
    subHeader: 'Add/Edit Name',
    inputs: [
      {
        name: 'displayName',
        type: 'text',
        // value: this.theUser[0].displayName,
        placeholder: '00:00'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Ok',
        handler: (inputData) => {
          this.nn=inputData.displayName;

          // this.tempUser=this.theUser[0]
          console.log(this.nn+"ddfdddfdfdd",evnt)
          this.runn.updateEClose(this.eventKey,this.nn)
          this.presentLoading();


        }
      }
    ]
  });
  await alert.present();
  let result = await alert.onDidDismiss();

}

//update event kilo meters

async DistanceUpdate(evnt) {

    
  const alert = await this.altctrl.create({
    subHeader: 'Add/Edit Name',
    inputs: [
      {
        name: 'displayName',
        type: 'text',
        // value: this.theUser[0].displayName,
        placeholder: 'Distance'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Ok',
        handler: (inputData) => {
          this.nn=inputData.displayName;

          // this.tempUser=this.theUser[0]
          console.log(this.nn+"ddfdddfdfdd",evnt)
          this.runn.updateEDistance(this.eventKey,this.nn)
          this.presentLoading();


        }
      }
    ]
  });
  await alert.present();
  let result = await alert.onDidDismiss();

}
//update event price

async PriceUpdate(evnt) {

    
  const alert = await this.altctrl.create({
    subHeader: 'Add/Edit Name',
    inputs: [
      {
        name: 'displayName',
        type: 'text',
        // value: this.theUser[0].displayName,
        placeholder: 'Price'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Ok',
        handler: (inputData) => {
          this.nn=inputData.displayName;

          // this.tempUser=this.theUser[0]
          console.log(this.nn+"ddfdddfdfdd",evnt)
          this.runn.updateEPrice(this.eventKey,this.nn)
          this.presentLoading();


        }
      }
    ]
  });
  await alert.present();
  let result = await alert.onDidDismiss();

}

//update event information

async InfoUpdate(evnt) {

    
  const alert = await this.altctrl.create({
    subHeader: 'Add/Edit Name',
    inputs: [
      {
        name: 'displayName',
        type: 'text',
        // value: this.theUser[0].displayName,
        placeholder: 'Information'
      },

    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
        }
      }, {
        text: 'Ok',
        handler: (inputData) => {
          this.nn=inputData.displayName;

          // this.tempUser=this.theUser[0]
          console.log(this.nn+"ddfdddfdfdd",evnt)
          this.runn.updateEInfo(this.eventKey,this.nn)
          this.presentLoading();


        }
      }
    ]
  });
  await alert.present();
  let result = await alert.onDidDismiss();

}


    async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'loading...',
        duration: 4000
      });
      await loading.present();
      // this.getdata()
      loading.dismiss()
    }

    async filepresentLoading() {
      const loading = await this.loadingController.create({
        message: 'loading...',
        duration: 15000
      });
      await loading.present();
      // this. getdata()
      loading.dismiss()
    }
  ngOnInit() {
   
  }

}
