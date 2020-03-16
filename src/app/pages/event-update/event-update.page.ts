import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { StoreEventKeyService } from 'src/app/services/store-event-key.service';
import { EventupdateService } from 'src/app/services/eventupdate.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

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
    public afs:AngularFirestore, private storage: AngularFireStorage,public eventUpdate:EventupdateService,public loadingController: LoadingController,
    public runn:RunningService,  private altctrl: AlertController,
    private navCtrl: NavController) {
      this.events= []; 
    // this.bookE();
     }
 
    back(){
      this.navCtrl.navigateRoot("/club-profile");
    }


      // update club name
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
                this.eventUpdate.updateName(this.eventData.eventKey,this.nn).then(results=>{
                   this.eventData = this._event.getEventData()
                    console.log(this._event.getEventData);
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
    // update open hour
    
     
      async openUpdate(evnt) {
  
      
        const alert = await this.altctrl.create({
          subHeader: 'Add/Edit open time',
          inputs: [
            {
              name: 'openingHours',
              type: 'text',
              // value: this.theUser[0].displayName,
              placeholder: 'Open time'
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
    
                // this.tempUser=this.theUser[0]
                console.log(this.nn,evnt)
                this.eventUpdate.updateOpen(this.eventData.eventKey,this.nn).then(results=>{
                   this.eventData = this._event.getEventData()
                    console.log(this._event.getEventData);
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
  
      // update close hour
    
     
      async closeUpdate(evnt) {
  
      
        const alert = await this.altctrl.create({
          subHeader: 'Add/Edit close time',
          inputs: [
            {
              name: 'closingHours',
              type: 'text',
              // value: this.theUser[0].displayName,
              placeholder: 'Close time'
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
    
                // this.tempUser=this.theUser[0]
                console.log(this.nn,evnt)
                this.eventUpdate.updateClose(this.eventData.eventKey,this.nn).then(results=>{
                   this.eventData = this._event.getEventData()
                    console.log(this._event.getEventData);
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
  
      // update address
    
     
      async addressUpdate(evnt) {
  
      
        const alert = await this.altctrl.create({
          subHeader: 'Add/Edit address',
          inputs: [
            {
              name: 'address',
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
                this.nn=inputData.address;
    
                // this.tempUser=this.theUser[0]
                console.log(this.nn,evnt)
                this.eventUpdate.updateAddress(this.eventData.eventKey,this.nn).then(results=>{
                   this.eventData = this._event.getEventData()
                    console.log(this._event.getEventData);
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
  
      // update open info
    
     
      async infoUpdate(evnt) {
  
      
        const alert = await this.altctrl.create({
          subHeader: 'Add/Edit info',
          inputs: [
            {
              name: 'info',
              type: 'text',
              // value: this.theUser[0].displayName,
              placeholder: 'Info'
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
    
                // this.tempUser=this.theUser[0]
                console.log(this.nn,evnt)
                this.eventUpdate.updateInfo(this.eventData.eventKey,this.nn).then(results=>{
                   this.eventData = this._event.getEventData()
                    console.log(this._event.getEventData);
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

         // update open distance
    
     
         async kmUpdate(evnt) {
  
      
          const alert = await this.altctrl.create({
            subHeader: 'Add/Edit distance',
            inputs: [
              {
                name: 'distance',
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
                  this.nn=inputData.distance;
      
                  // this.tempUser=this.theUser[0]
                  console.log(this.nn,evnt)
                  this.eventUpdate.updateDistance(this.eventData.eventKey,this.nn).then(results=>{
                     this.eventData = this._event.getEventData()
                      console.log(this._event.getEventData);
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

           // update open price
    
     
      async priceUpdate(evnt) {
  
      
        const alert = await this.altctrl.create({
          subHeader: 'Add/Edit price',
          inputs: [
            {
              name: 'price',
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
                this.nn=inputData.info;
    
                // this.tempUser=this.theUser[0]
                console.log(this.nn,evnt)
                this.eventUpdate.updatePrice(this.eventData.eventKey,this.nn).then(results=>{
                   this.eventData = this._event.getEventData()
                    console.log(this._event.getEventData);
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

  // update open price
    

  async dateUpdate(evnt) {


    const alert = await this.altctrl.create({
      subHeader: 'Add/Edit date',
      inputs: [
        {
          name: 'date',
          type: 'text',
          // value: this.theUser[0].displayName,
          placeholder: 'DD-MM-YYYY'
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

            // this.tempUser=this.theUser[0]
            console.log(this.nn,evnt)
            this.eventUpdate.updateDate(this.eventData.eventKey,this.nn).then(results=>{
                this.eventData = this._event.getEventData()
                console.log(this._event.getEventData);
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

  uniqkey;fileRef;task;uploadPercent; photoURL:'';
    // update pictire
    picUpdate(evnt){
     

      this.file = evnt.target.files[0];
    
   this.uniqkey ='event' +  Math.random().toString(36).substring(2);
   const filePath = this.uniqkey;
   this.fileRef = this.storage.ref(filePath);
  //  this.task = this.storage.upload(filePath, this.file);
  this.task = this.storage.upload("eventPictures/"+ filePath +"/", this.file);
   this.uploadPercent = this.task.percentageChanges();
   this.task.then(results => {

    return results.ref.getDownloadURL().then(url => {
      console.log(url);

      this.photoURL = url
      this.afs.doc('events/' + this.thisevnt).update({
                photoURL: url
              })
      this.uploadPercent = null;
      console.log(this.photoURL, "event profile picture");

      this.eventUpdate.updatepic(this.thisevnt,url).then(results=>{
        this.eventData = this._event.getEventData()
        console.log(this._event.getEventData);
        console.log(results);
        this.eventData.photoURL = results;
      },
      error =>{
        console.log(error);
        
      }
      )
    
    }
    
    )

  });
 
      
    }
    file(filePath: any, file: any): any {
      throw new Error("Method not implemented.");
      //
      // this.presentLoading();
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
    thisevnt
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
    this.thisevnt=this.eventData.eventKey;  
    console.log(this.thisevnt,"the xevent")
    if(this.eventData.photoURL==null)
    {
       this.defaultpic=false;
     
    }
  }
  

}
