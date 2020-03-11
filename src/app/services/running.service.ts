import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
// import * as moment from 'moment';
import 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { switchMap, finalize, map } from 'rxjs/operators';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
// import { eventNames } from 'cluster';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { StoreClubKeyService } from './store-club-key.service';
@Injectable({
  providedIn: 'root'
})
export class RunningService {
  database = firebase.database();
  dbfire = firebase.firestore();
  userProfile = []
  currentState: boolean
  currentUser
  bookingID
  currClub = []
  theCurrentClub
  currentSessionId
  user
  clubs = []
  clubsTemp = []
  usersTemp = []
  events = []
  eventsTemp = []
  tickets = []
  ticketsTemp = []
  users = []
  myclubs = []
  //INI values
  newName: string = "";
  newAddress: string = "";
  newOpeningHours: string = "";
  newClosingHours: string = "";

  newID: string = "";
  fileRef
  editName: string = "";
  editAddress: string = "";
  editOpeningHours: string = "";
  editClosingHours: string = "";
  downloadU: any;
  uniqkey: string;
  dateTime: string;
  uploadPercent: any;
  task: any;
  file: any;
  clubID: String
  clubKey: String
  name: String
  openingHours: String
  closingHours: String
  userID: String
  photoURL: String
  thetickets = []
  clubOne = []
  theprice: string
  ///

  currentBook = [];
  private itemDoc: AngularFirestoreDocument<Item>;
  eventKey: string;
  address: string;
  price: string;
  constructor( private _club: StoreClubKeyService,private auth: AngularFireAuth, public loadingController: LoadingController, public auths: AuthService, private storage: AngularFireStorage, private afs: AngularFirestore, public navCtrl: NavController, public route: Router) {
  }
  currentClub(myclubs) {


    console.log(myclubs, "the current Choosen club ");

    console.log(myclubs.clubKey, "the current Choosen club ID");
    this.currClub = []


    this.currClub.push({
      myclubs
    })
    console.log(this.currClub, "the current club pushed");
    console.log(this.currClub[0].myclubs.clubKey, "the current Choosen club ID");


  }
  chooseClub(myclubs) {

    return new Promise((resolve, reject) => {

      console.log(myclubs, "***");
      this.clubOne = []
      this.clubOne.push({ myclubs })
      console.log(this.clubOne, "oooo");

      resolve(this.clubOne)
    })
  }

  rtClubName() {

    return this.currClub
  }
  async rtAClubs() {
    let result: any
    await this.chooseClub(this.clubOne).then(data => {
      result = data

      console.log(result.length);
    })
    console.log(result);

    return result
  }

  async rtClubs() {
    let result: any
    await this.getClubs().then(data => {
      result = data

      console.log(result.length);
    })
    console.log(result);
    //this.LandMarks()
    return result

    // console.log(this.todos,"hh")
    // return this.todos
  }
  //tickets
  async rtTickets() {
    let result: any
    await this.getTickets().then(data => {
      result = data

      console.log(result.length);
    })
    console.log(result);
    //this.LandMarks()
    return result

    // console.log(this.todos,"hh")
    // return this.todos
  }
  //tickets
  async rtEvents() {
    let result: any
    await this.getEvent().subscribe(data => {
      result = data

      console.log(result.length);
      console.log(result);
    })

    return result


  }
  async rtClubEvents() {
    let result: any
    await this.getAClubsEvents(this.currClub).then(data => {
      result = data

      console.log(result.length);
    })
    console.log(result);

    return result

  }
  


  // async rtUsers() {
  //   let result: any
  //   await this.getUser().then(data => {
  //     result = data

  //     console.log(result.length);
  //   })
  //   console.log(result);
  //   //this.LandMarks()
  //   return result

  //   // console.log(this.todos,"hh")
  //   // return this.todos
  // }

  //add a club
  addClub(newName, newAddress, newOpeningHours, newClosingHours, url) {

    var styt = newOpeningHours.substring(11, 16);
    var etyt = newClosingHours.substring(11, 16);
    let user = this.readCurrentSession()
    let userID = user.uid
    console.log("HOT ", userID)

    this.dbfire.collection("clubs").add({
      name: newName,
      address: newAddress,
      openingHours: styt,
      closingHours: etyt,
      userID: userID,
      photoURL: url

    }).then((data) => {



      console.log(data)
      this.navCtrl.navigateRoot("/tabs/add")
    }).catch((error) => {
      console.log(error)
    })

    this.uploadPercent = null;

  }
  ///update a club
  updateTodo(clubs, editName, editAddress, editOpeningHours, editClosingHours) {

    //name
    this.dbfire.collection("clubs").doc(clubs.clubKey).update('name', editName).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
    //address
    this.dbfire.collection("clubs").doc(clubs.clubKey).update('address', editAddress).then((data) => {

      console.log("Document time successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
    //opening hours
    this.dbfire.collection("clubs").doc(clubs.clubKey).update('address', editOpeningHours).then((data) => {

      console.log("Document time successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
    //closing hours
    this.dbfire.collection("clubs").doc(clubs.clubKey).update('address', editClosingHours).then((data) => {

      console.log("Document time successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
  //retrieve a club
  async rtTodo() {
    let result: any
    await this.getClubs().then(data => {
      result = data

      console.log(result.length);
    })
    console.log(result);
    //this.LandMarks()
    return result
    // console.log(this.todos,"hh")
    // return this.todos
  }
  ///////get todos
  rtMyClubs() {
    let uid = this.auth.auth.currentUser.uid;
    return this.afs.collection("clubs", ref => ref.where('userID', '==', uid))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          console.log("club ID" + id)
          return { id, ...data };

        })))

  }
getUser(){

  let uid = this.auth.auth.currentUser.uid;
  return this.afs.collection("users", ref => ref.where('uid', '==', uid))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        console.log("current user ID" + id,data)
        return { id, ...data };

      })))

}
  // go to booked events
  //  return this.afs.collection('spazashop').valueChanges();
  rtb() {
    let uid = this.auth.auth.currentUser.uid;
    return this.afs.collection("bookedEvents", ref => ref.where('userID', '==', uid))
      .valueChanges();
      

  }
  // return events in 1 user ID
  rtE() {
    let uid = this.auth.auth.currentUser.uid;
    return this.afs.collection("events", ref => ref.where('userID', '==', uid))
    .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        console.log("event ID" + id)
        return { id, ...data };

      })))
      

  }
  getClubs() {
    this.clubs = []
    this.clubsTemp = []
    let ans = []
    let ans2 = []
    let user = this.readCurrentSession()
    let userID = user.uid
    //
    return new Promise((resolve, reject) => {

      this.dbfire.collection("clubs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          // ans.push(doc.data())
          console.log(doc.id, '=>', doc.data());
          this.clubsTemp.push({
            clubKey: doc.id,
            name: doc.data().name,
            address: doc.data().address,
            openingHours: doc.data().openingHours,
            closingHours: doc.data().closingHours,
            userID: doc.data().userID,
            photoURL: doc.data().photoURL
          })
          console.log(this.clubsTemp, "club array")
          console.log(name, "club array")

          console.log(this.clubsTemp.length, "club array SIZE")
          //  this.todoTemp.push()

        });
        console.log(this.clubsTemp.length, "club array SIZE")
        for (let x = 0; x < this.clubsTemp.length; x++) {
          console.log(this.clubsTemp[x].clubKey, "userid at x")

          if (this.clubsTemp[x].clubKey === userID) {
            this.clubs.push(this.clubsTemp[x])

          }

        }
        resolve(this.clubsTemp)
        console.log(this.clubsTemp, "clubs array")
        console.log(ans, "ans array")
      });
    });


  }
  ///////get todos

  ///get a individuals club
  getIndividualsClubs() {
    this.clubs = []
    this.clubsTemp = []
    let ans = []
    let ans2 = []
    let user = this.readCurrentSession()
    let userID = user.uid
    

    return new Promise((resolve, reject) => {
      this.dbfire.collection("clubs").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          // ans.push(doc.data())
          console.log(doc.id, '=>', doc.data());
          this.clubsTemp.push({
            clubKey: doc.id,
            name: doc.data().name,
            openingHours: doc.data().openingHours,
            closingHours: doc.data().closingHours,
            userID: doc.data().userID,
            photoURL: doc.data().photoURL
          })
          console.log(this.clubsTemp, "club array")
          console.log(name, "club array")

          console.log(this.clubsTemp.length, "club array SIZE")
          //  this.todoTemp.push()

        });
        console.log(this.clubsTemp.length, "club array SIZE")
        for (let x = 0; x < this.clubsTemp.length; x++) {
          console.log(this.clubsTemp[x].userID, "CLUB userid ")

          if (this.clubsTemp[x].userID === userID) {
            this.clubs.push(this.clubsTemp[x])

          }

        }
        resolve(this.clubs)
        console.log(this.clubs, "my clubs array")
        console.log(ans, "ans array")
      });
    });


  }

  //single clubs events
  getAClubsEvents(myclubs) {
    this.events = []
    this.eventsTemp = []
    let ans = []
    let ans2 = []
    this.currClub = []
 console.log(myclubs, "the club select");
 
    //push current club
    this.currClub.push({ myclubs})
 
    let clubKey = myclubs.clubKey
    console.log(clubKey, " ClubID vele")
    
    return new Promise((resolve, reject) => {
      this.dbfire.collection("events").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        
          console.log(doc.id, '=>', doc.data());
          this.eventsTemp.push({
            eventKey: doc.id,
            name: doc.data().name,
            price: doc.data().price,
            info: doc.data().info,
            photoURL: doc.data().photoURL,
            address: doc.data().address,
            date:doc.data().date,
            distance:doc.data().distance,
            openingHours: doc.data().openingHours,
            closingHours: doc.data().closingHours,
            userID: doc.data().userID,
            clubKey: doc.data().clubKey
          })
         
         
        });
        console.log(this.eventsTemp.length, "events array SIZE")
        for (let x = 0; x < this.eventsTemp.length; x++) {
          console.log(this.eventsTemp[x].clubKey, "CLUB id at x ")
          if (this.eventsTemp[x].clubKey === clubKey) {
            this.events.push(this.eventsTemp[x])
          }
        }
        console.log(this.events, "my events array")
        console.log(ans, "ans array")
        resolve(this.events)
      });
    });
  }

  ////upload a club pic
  uploadClubPic(event) {

    let user = this.readCurrentSession()
    let userID = user['uid']
    console.log("the user", userID);
    this.file = event.target.files[0];
    console.log(this.file)

  }


  deleteTodo(clubs) {
    this.dbfire.collection("todos").doc(clubs.todoKey).delete().then((data) => {
      console.log("Document successfully deleted!", data);

    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }
  //
  who() {
    this.user = this.auths.who()
    this.setCurrentSession(this.user)
    console.log("logged in user ", this.user)
  }
  ///set user session start
  setCurrentSession(user) {
    console.log("running now", user.currentUser.uid);
    var uid
    if (user !== null) {
      uid = user.currentUser.uid;
      this.user = user.currentUser
      console.log(uid);

      var userRoot = firebase.database().ref("Users").child(uid)
      userRoot.once("value", snap => {
        //console.log(userRoot);
        let values = snap.val()
        console.log(values["name"]);
        console.log(values["email"]);
        this.userProfile.push({
          key: snap.key,
          displayName: values["name"],
          email: values["email"],
        })
      })
    }
    this.currentSessionId = uid
    console.log(uid);
    console.log("last in set ", user);
    console.log("last in set 2", this.user);
  }
  ///set user session end
  destroyUserData() {
    this.userProfile.pop()
    console.log(this.userProfile);

  }
  readCurrentSession() {
    this.who()
    console.log(this.user);
    return this.user
  }
  returnUserProfile() {
    console.log(this.userProfile);
    return this.userProfile
  }

  ///create event 
  addEvent(newName, newAddress, newOpeningHours, newClosingHours, newPrice, newDistance, newDate, url) {
let clubKey = this._club.getClubKey();
    let styt = newOpeningHours.substring(11, 16);
    let etyt = newClosingHours.substring(11, 16);

    let user = this.readCurrentSession()
    let userID = user.uid
    // let clubKey = this.currClub[0].myclubs.myclubs.clubKey
   
    this.dbfire.collection("events").add({
      name: newName,
      address: newAddress,
      distance: newDistance,
      date: newDate,
      openingHours: styt,
      closingHours: etyt,
      userID: userID,
      clubKey: clubKey,
      price: newPrice,
      photoURL: url,
      info:''

    }).then((data) => {
      console.log(data)
      this.presentLoading();
      this.navCtrl.navigateRoot("/club-profile")


    }).catch((error) => {
      console.log(error)
    })
    this.uploadPercent = null;




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
  updateUser() {
    let user = this.readCurrentSession()
    let userID = user.uid

  }
  // getUser() {
  //   this.users = []
  //   this.usersTemp = []
  //   let ans = []
  //   let ans2 = []

  //   let user = this.readCurrentSession()
  //   let userID = user.uid
  //   console.log(userID)
  //   return new Promise((resolve, reject) => {
  //     this.dbfire.collection("users").get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {

  //         // ans.push(doc.data())
  //         console.log(doc.id, '=>', doc.data());
  //         this.usersTemp.push({
  //           userKey: doc.id,
  //           name: doc.data().displayName,
  //           address: doc.data().address,
  //           age: doc.data().Age,
  //           email: doc.data().Email,
  //           gender: doc.data().gender,
  //           photoURL: doc.data().photoURL
  //         })
  //         console.log(this.usersTemp, "users array")
  //         console.log(name, "users array")

  //         console.log(this.usersTemp.length, "users array SIZE")
  //         //  this.todoTemp.push()

  //       });
  //       console.log(this.usersTemp.length, "users array SIZE")

  //       for (let x = 0; x < this.usersTemp.length; x++) {


  //         if (this.usersTemp[x].userKey === userID) {
  //           console.log(this.usersTemp[x].userKey, "userid at x")
  //           this.users.push(this.usersTemp[x])

  //         }

  //       }
  //       resolve(this.users)
  //     });
  //   });

  //   console.log(this.usersTemp, "clubs array")
  //   console.log(ans, "ans array")

  // }
  ///get tickets
  getTickets() {
    this.tickets = []
    this.ticketsTemp = []



    let user = this.readCurrentSession()
    let userID = user.uid
    console.log(userID)
    return new Promise((resolve, reject) => {
      this.dbfire.collection("bookedEvents").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

          // ans.push(doc.data())
          console.log(doc.id, '=>', doc.data());
          this.ticketsTemp.push({
            bookingID: doc.id,
            eventKey: doc.data().eventKey,
            name: doc.data().name,
            address: doc.data().address,
            openingHours: doc.data().openingHours,
            closingHours: doc.data().closingHours,
            userID: doc.data().userID,
            //  clubID:  doc.data().clubID,
            clubKey: doc.data().clubID,
            price: doc.data().price,
            distance: doc.data().distance,
            date: doc.data().date,
            info: doc.data().info,
            //  {{element.data.TimeStamp.toDate() | date:'dd-MM-yyy'}}
            tickets: doc.data().tickets,
            total: doc.data().total,
            approved: doc.data().approved,
            deposited: doc.data().deposited

          })
          console.log(this.ticketsTemp, "ticket array")



          console.log(this.ticketsTemp.length, "all bookings array SIZE")


        });
        for (let t = 0; t < this.ticketsTemp.length; t++) {
          console.log(this.ticketsTemp, "tick %")
          if (this.ticketsTemp[t].userID === userID && this.ticketsTemp[t].approved == true) {
            console.log(this.ticketsTemp[t].userID, "USER at x", userID, " logged in user")
            console.log(this.ticketsTemp[t].approved, "approved at t")


            console.log(this.ticketsTemp[t].approved, "approved at t")
            this.tickets.push(this.ticketsTemp[t])
            console.log(this.tickets, "+++++++++++")
          }

        }


        console.log(this.tickets, "+++++++++++")
        resolve(this.tickets)
      });

    });


  }


  ///get tickets
  ///retrieve event
  ///update event
  ///delete event
  async rtAccount() {

  }
  async rtBooking() {
    //method two
    let result: any
    await this.booking(this.currentBook).then(data => {
      result = data

      console.log(result.length);
    })
    console.log(result);
    return result
  }
  // booking the event
  // approved:boolean=false;
  BookEvent(tickets, price) {
    let user = this.readCurrentSession()
    let userID = user.uid
    // console.log(tickets,price,"=================",userID);
    let total = tickets * price;
    // console.log(total,"total =================",userID);
    ///method three

    return new Promise((resolve, reject) => {
      this.booking(this.currentBook).then(data => {
        console.log("the data>>>>>>>>>>>", data);
        console.log(data[0].myevents[0].myevents[0].myevents, "the selected one vele", data[0].myevents[0].myevents[0].myevents.eventKey);

        this.dbfire.collection("bookedEvents").add({
          eventKey: data[0].myevents[0].myevents[0].myevents.eventKey,
          name: data[0].myevents[0].myevents[0].myevents.name,
          address: data[0].myevents[0].myevents[0].myevents.address,
          openingHours: data[0].myevents[0].myevents[0].myevents.openingHours,
          closingHours: data[0].myevents[0].myevents[0].myevents.closingHours,
          userID: userID,
          clubID: data[0].myevents[0].myevents[0].myevents.clubKey,
          price: data[0].myevents[0].myevents[0].myevents.price,
          date: data[0].myevents[0].myevents[0].myevents.date,
          info: data[0].myevents[0].myevents[0].myevents.info,
          distance: data[0].myevents[0].myevents[0].myevents.distance,
          //  {{element.data.TimeStamp.toDate() | date:'dd-MM-yyy'}}
          tickets: tickets,
          total: total,
          approved: false,
          deposited: false

        }).then((data) => {

          resolve(data)

          //  this.navCtrl.navigateRoot('/done')
          console.log(data)
          this.bookingID = data.id;

        }).catch((error) => {
          console.log(error)
        })

      })

    })
    //   console.log( "somethinf"+event)


  }
  // paying for the event
  payment(eventName, eventAddress, eventPrice, tickets, totalPrice) {


    let user = this.readCurrentSession()
    let userID = user.uid
    // let clubID= this.currClub[0].clubKey
    // console.log("HOT ",clubID)


    this.dbfire.collection("bookedEvents").add({
      event: eventName,
      address: eventAddress,
      userID: userID,
      // clubID: clubID,
      price: eventPrice,
      tickets: tickets,
      total: totalPrice

    }).then((data) => {



      console.log(data)
      //  this.route.navigate(['/edit'],{queryParams:{name: item.name,price:item.price,type:item.type,key:item.key}})

      // this.navCtrl.navigateRoot("/done");
    }).catch((error) => {
      console.log(error)
    })


  }
  update(objectA, key) {

    this.itemDoc = this.afs.doc<Item>('users/' + key);
    this.itemDoc.update(objectA);
  }
  delete(key) {

    this.itemDoc = this.afs.doc<Item>('users/' + key);
    // this.itemDoc.update(objectA);
    this.itemDoc.delete();

  }
  booking(myevents) {
    this.currentBook = []
    console.log(myevents);
    return new Promise((resolve, reject) => {

      this.currentBook.push(

        {
          myevents

        }

      )

      console.log(myevents);
      console.log(this.currentBook);
      resolve(this.currentBook)
    });
  }
  getAccount() {

    return this.afs.collection('account').snapshotChanges();
  }
  getBooked() {

    return this.afs.collection('bookedEvents').snapshotChanges();
  }
  uploadEventPic(event) {
    let user = this.readCurrentSession()
    let userID = user['uid']
    console.log("the user", userID);
    this.file = event.target.files[0];
    console.log(this.file)
  }
  uploadProfilePic(event) {
    let user = this.readCurrentSession()
    let userID = user['uid']
    console.log("the user", userID);
    const file = event.target.files[0];
    this.uniqkey = 'PIC' + this.dateTime;
    const filePath = this.uniqkey;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    // observe percentage changes
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadU = fileRef.getDownloadURL().subscribe(urlPath => {
          console.log(urlPath);

          this.afs.doc('users/' + userID).update({
            photoURL: urlPath
          })
          this.uploadPercent = null;
        });
      })
    ).subscribe();
    return this.uploadPercent = task.percentageChanges();
  }






  updateName(userID, editName) {

    this.dbfire.collection("users").doc(userID).update({ displayName: editName }).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  updateAge(userID, editAge) {

    this.dbfire.collection("users").doc(userID).update({ Age: editAge }).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  updateAddress(userID, editAddress) {

    this.dbfire.collection("users").doc(userID).update({ address: editAddress }).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
 

  getEvents() {
    this.events = []
    this.eventsTemp = []
    let ans = []
    let ans2 = []
    let user = this.readCurrentSession()
    let userID = user.uid


    return new Promise((resolve, reject) => {
      this.dbfire.collection("events").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          // ans.push(doc.data())
          console.log(doc.id, '=>', doc.data());
          this.eventsTemp.push({
            eventKey: doc.id,
            name: doc.data().name,
            address: doc.data().address,
            openingHours: doc.data().openingHours,
            closingHours: doc.data().closingHours,
            price: doc.data().price,
            distance: doc.data().distance,
            userID: doc.data().userID,
            date: doc.data().date.toDate,
            clubKey: doc.data().clubID

          })
          console.log("events>>>>: ", this.eventsTemp)
        });

        resolve(this.eventsTemp)

      });
    });


  }


  getEvent() {
    this.events = []
    this.eventsTemp = []
    let ans = []
    let ans2 = []
    let user = this.readCurrentSession()
    let userID = user.uid

    return this.afs.collection<any>('events').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        const price = a.payload.doc.data().price;
        return { id, ...data };

      }

      ))

    )
      ;
  }
  getclub(){
    return this.afs.collection<any>('clubs').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        const price = a.payload.doc.data().price;
        return { id, ...data };

      }

      ))

    )
  }
  updateDeposit() {
    let dep = true
    console.log(this.bookingID, "oooooooo")
    this.dbfire.collection("bookedEvents").doc(this.bookingID).update('deposited', dep).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });

  }
  // update event name
  async updateEName(eventID, editName) {

    return await this.dbfire.collection("events").doc(eventID).update({ name: editName }).then((data) => {

      return editName;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
   updateEAddress(userID, editAddress) {

    this.dbfire.collection("events").doc(userID).update({ address: editAddress }).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
  updateEDate(userID, editDate) {

    this.dbfire.collection("events").doc(userID).update({ date: editDate }).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
  updateEOpen(userID, editOpeningHours) {

    this.dbfire.collection("events").doc(userID).update({ openingHours: editOpeningHours}).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  updateEClose(userID, editClosingHours) {

    this.dbfire.collection("events").doc(userID).update({ closingHours: editClosingHours}).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  updateEDistance(userID, editDistance) {

    this.dbfire.collection("events").doc(userID).update({ distance: editDistance}).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  updateEPrice(userID, editPrice) {

    this.dbfire.collection("events").doc(userID).update({ price: editPrice}).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  updateEInfo(userID, editInfo) {

    this.dbfire.collection("events").doc(userID).update({ info: editInfo}).then((data) => {

      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  done() {
    let user = this.readCurrentSession()
    let userID = user.uid
    // console.log(tickets,price,"=================",userID);
  
    // console.log(total,"total =================",userID);
    ///method three
    
    return new Promise((resolve, reject) => {
      this.booking(this.currentBook).then(data => {
        console.log("the data>>>>>>>>>>>", data);
        console.log(data[0].myevents[0].myevents[0].myevents, "the selected one vele", data[0].myevents[0].myevents[0].myevents.eventKey);

        this.dbfire.collection("bookedEvents").add({
          eventKey:  data[0].myevents[0].myevents[0].myevents.eventKey,
          name: data[0].myevents[0].myevents[0].myevents.name,
          date: data[0].myevents[0].myevents[0].myevents.date,
        
          mame: name,
          approved: false,
          deposited: false

        }).then((data) => {
            
          resolve(data) 

         
          console.log(data)
          this.bookingID=data.id;

        }).catch((error) => {
          console.log(error)
        })

      })
     
    })
 


  }

}

