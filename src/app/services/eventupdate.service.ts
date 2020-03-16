import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventupdateService {
  dbfire = firebase.firestore();
  constructor() { }
  async updateName(eventID, editName) {

    return await this.dbfire.collection("events").doc(eventID).update({ name: editName }).then((data) => {

      return editName;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
  async updateOpen(eventID, editOpen) {

    return await this.dbfire.collection("events").doc(eventID).update({ openingHours: editOpen }).then((data) => {

      return editOpen;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  // closing time
  async updateClose(eventID, editClose) {

    return await this.dbfire.collection("events").doc(eventID).update({ closingHours: editClose }).then((data) => {

      return editClose;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

   // closing address
   async updateAddress(eventID, editAddress) {

    return await this.dbfire.collection("events").doc(eventID).update({ address: editAddress}).then((data) => {

      return editAddress;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
   // closing info
   async updateInfo(eventID, editInfo) {

    return await this.dbfire.collection("events").doc(eventID).update({ info: editInfo }).then((data) => {

      return editInfo;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

    // closing distance
    async updateDistance(eventID, editDistance) {

      return await this.dbfire.collection("events").doc(eventID).update({ distance: editDistance }).then((data) => {
  
        return editDistance;
        console.log("Document name successfully updated!", data);
      }).catch(function (error) {
        console.error("Error updating document: ", error);
      });
    }
      // closing price
   async updatePrice(eventID, editPrice) {

    return await this.dbfire.collection("events").doc(eventID).update({ price: editPrice }).then((data) => {

      return editPrice;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
     // closing date
     async updateDate(eventID, editDate) {

      return await this.dbfire.collection("events").doc(eventID).update({ date: editDate }).then((data) => {
  
        return editDate;
        console.log("Document name successfully updated!", data);
      }).catch(function (error) {
        console.error("Error updating document: ", error);
      });
    }

      // closing picture
      async updatepic(eventID, editpic) {

        return await this.dbfire.collection("events").doc(eventID).update({ photoURL: editpic }).then((data) => {
    
          return editpic;
          console.log("Document name successfully updated!", data);
        }).catch(function (error) {
          console.error("Error updating document: ", error);
        });
      }
}
