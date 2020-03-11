import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ClubupdateService {
  dbfire = firebase.firestore();
  constructor() { }
  async updateName(clubID, editName) {

    return await this.dbfire.collection("clubs").doc(clubID).update({ name: editName }).then((data) => {

      return editName;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
  async updateOpen(clubID, editOpen) {

    return await this.dbfire.collection("clubs").doc(clubID).update({ openingHours: editOpen }).then((data) => {

      return editOpen;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

  // closing time
  async updateClose(clubID, editClose) {

    return await this.dbfire.collection("clubs").doc(clubID).update({ closingHours: editClose }).then((data) => {

      return editClose;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }

   // closing address
   async updateAddress(clubID, editAddress) {

    return await this.dbfire.collection("clubs").doc(clubID).update({ address: editAddress}).then((data) => {

      return editAddress;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
   // closing info
   async updateInfo(clubID, editInfo) {

    return await this.dbfire.collection("clubs").doc(clubID).update({ info: editInfo }).then((data) => {

      return editInfo;
      console.log("Document name successfully updated!", data);
    }).catch(function (error) {
      console.error("Error updating document: ", error);
    });
  }
}
