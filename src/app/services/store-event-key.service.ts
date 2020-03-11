import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreEventKeyService {
  private eventKey: string;
  private eventInfo: any;
  constructor() { }
  public storeEventKey(clubData: string){
    this.eventKey = clubData;
}
  public getEventKey(): string{
      return this.eventKey;
  }

  public eventData(data: any){
    this.eventInfo = data;
  }
  public getEventData(){
    return this.eventInfo
  }
}
