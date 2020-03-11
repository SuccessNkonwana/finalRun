import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { StoreEventKeyService } from 'src/app/services/store-event-key.service';

@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.page.html',
  styleUrls: ['./event-update.page.scss'],
})
export class EventUpdatePage implements OnInit {

 
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
  urlPath:'';
  eventData
  defaultpic=true
  private uid: string= null;
  constructor(private route:ActivatedRoute, private _event: StoreEventKeyService,
      public loadingController: LoadingController,
    public runn:RunningService,  private altctrl: AlertController,
    private navCtrl: NavController) {
      this.events= []; 
    // this.bookE();
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
              console.log(this.nn,evnt)
              this.runn.updateEName(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.name = results;
              }, error =>{
                console.log(error);
                
              })
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }

    //update address
    async addressUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'address',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: 'displayAddress'
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
              this.nn=inputData.address;
  
           
              console.log(this.nn,evnt)
              this.runn.updateEAddress(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.address = results;
              }, error =>{
                console.log(error);
                
              })
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }

    //update date

    async dateUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'date',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: '01-12-2022'
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
              this.nn=inputData.date;
  
           
              console.log(this.nn,evnt)
              this.runn.updateEDate(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.date = results;
              }, error =>{
                console.log(error);
                
              })
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }

    //update open
    async openUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'openingHours',
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
              this.nn=inputData.openingHours;
  
           
              console.log(this.nn,evnt)
              this.runn.updateEOpen(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.openingHours = results;
              }, error =>{
                console.log(error);
                
              })
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }
    
    //update close

    async closeUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'closingHours',
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
              this.nn=inputData.closingHours;
  
           
              console.log(this.nn,evnt)
              this.runn.updateEClose(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.closingHours = results;
              }, error =>{
                console.log(error);
                
              })
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }

    //update price

    async priceUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'price',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: '00,00'
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
              this.nn=inputData.price;
  
           
              console.log(this.nn,evnt)
              this.runn.updateEPrice(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.price = results;
              }, error =>{
                console.log(error);
                
              })
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }

    //update distance

    async distanceUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'distance',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: 'kilo meter'
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
              this.nn=inputData.distance;
  
           
              console.log(this.nn,evnt)
              this.runn.updateEDistance(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.distance = results;
              }, error =>{
                console.log(error);
                
              })
              this.presentLoading();
  
  
            }
          }
        ]
      });
      await alert.present();
      let result = await alert.onDidDismiss();
  
    }

    //update info

    async infoUpdate(evnt) {

    
      const alert = await this.altctrl.create({
        subHeader: 'Add/Edit Name',
        inputs: [
          {
            name: 'info',
            type: 'text',
            // value: this.theUser[0].displayName,
            placeholder: 'description'
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
              this.nn=inputData.info;
  
           
              console.log(this.nn,evnt)
              this.runn.updateEInfo(this.eventData.eventKey,this.nn).then(results=>{
                 this.eventData = this._event.getEventData()
                  console.log(this._event.getEventData());
                  console.log(results);
                  this.eventData.info = results;
              }, error =>{
                console.log(error);
                
              })
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
    this.eventData=this._event.getEventData();
    console.log(this.eventData,"the event key")
    console.log(this.eventData.photoURL,"the event name")
    if(this.eventData.photoURL==null)
    {
       this.defaultpic=false;
     
    }
  }

}
