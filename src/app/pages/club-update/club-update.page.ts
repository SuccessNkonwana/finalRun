import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { RunningService } from 'src/app/services/running.service';
import { StoreClubKeyService } from 'src/app/services/store-club-key.service';
import { ClubupdateService } from 'src/app/services/clubupdate.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-club-update',
  templateUrl: './club-update.page.html',
  styleUrls: ['./club-update.page.scss'],
})
export class ClubUpdatePage implements OnInit {

  clubs=[];
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
clubData
  defaultpic=true
  private uid: string= null;
  constructor(public router:Router, private route:ActivatedRoute, private _club: StoreClubKeyService,
    public afs:AngularFirestore, private storage: AngularFireStorage, public updateClub:ClubupdateService,public loadingController: LoadingController,
    public runn:RunningService,  private altctrl: AlertController,
    private navCtrl: NavController) {
      this.clubs= []; 
    // this.bookE();
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
              this.updateClub.updateName(this.clubData.clubKey,this.nn).then(results=>{
                 this.clubData = this._club.getEventData()
                  console.log(this._club.getEventData);
                  console.log(results);
                  this.clubData.name = results;
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
              this.updateClub.updateOpen(this.clubData.clubKey,this.nn).then(results=>{
                 this.clubData = this._club.getEventData()
                  console.log(this._club.getEventData);
                  console.log(results);
                  this.clubData.openingHours = results;
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
              this.updateClub.updateClose(this.clubData.clubKey,this.nn).then(results=>{
                 this.clubData = this._club.getEventData()
                  console.log(this._club.getEventData);
                  console.log(results);
                  this.clubData.closingHours = results;
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
              this.updateClub.updateAddress(this.clubData.clubKey,this.nn).then(results=>{
                 this.clubData = this._club.getEventData()
                  console.log(this._club.getEventData);
                  console.log(results);
                  this.clubData.address = results;
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
              this.updateClub.updateInfo(this.clubData.clubKey,this.nn).then(results=>{
                 this.clubData = this._club.getEventData()
                  console.log(this._club.getEventData);
                  console.log(results);
                  this.clubData.info = results;
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
    
   this.uniqkey ='club' +  Math.random().toString(36).substring(2);
   const filePath = this.uniqkey;
   this.fileRef = this.storage.ref(filePath);
  //  this.task = this.storage.upload(filePath, this.file);
  this.task = this.storage.upload("clubPictures/"+ filePath +"/", this.file);
   this.uploadPercent = this.task.percentageChanges();
   this.task.then(results => {

    return results.ref.getDownloadURL().then(url => {
      console.log(url);

      this.photoURL = url
      this.afs.doc('clubs/' + this.thisevnt).update({
                photoURL: url
              })
      this.uploadPercent = null;
      console.log(this.photoURL, "club profile picture");

      this.updateClub.updatepic(this.thisevnt,url).then(results=>{
        this.clubData = this._club.getEventData()
        console.log(this._club.getEventData);
        console.log(results);
        this.clubData.photoURL = results;
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

    async filepresentLoading() {
      const loading = await this.loadingController.create({
        message: 'loading...',
        duration: 15000
      });
      await loading.present();
      // this. getdata()
      loading.dismiss()
    }
    key;pic;data;thisevnt
  ngOnInit() {

    this.pic=this._club.getClubPic();
    this.key = this._club.getClubKey();
    console.log(this.key,"the key***");
    console.log(this.pic,"the pic***");
    this.data=this._club.getEventData();

    console.log("club info",this.data)
    this.clubData=this._club.getEventData()
    console.log(this.clubData,"the event key")
    this.thisevnt=this.clubData.clubKey;  
    console.log(this.thisevnt,"the xclub")
   
  }
 

}
