import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreClubKeyService {

  private clubKey: string;
  private clubPic: string;
  private clubInfo:any;
  private eventInfo: any;
  constructor(){}
  public storeClubKey(clubData: string){
      this.clubKey = clubData;
  }
  public storeClubPic(clubData: string){
    this.clubPic = clubData;
}
public eventData(data: any){
  this.eventInfo = data;
}
public getEventData(){
  return this.eventInfo
}
  public getClubKey(): string{
      return this.clubKey;
  }
  public getClubPic(): string{
    return this.clubPic;
}
public clubData(data:any){
  this.clubInfo=data;
}
public getClubData(){
  return this.clubInfo
}


}
