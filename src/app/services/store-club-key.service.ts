import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreClubKeyService {

  private clubKey: string;
  private clubPic: string;
  constructor(){}
  public storeClubKey(clubData: string){
      this.clubKey = clubData;
  }
  public storeClubPic(clubData: string){
    this.clubPic = clubData;
}
  public getClubKey(): string{
      return this.clubKey;
  }
  public getClubPic(): string{
    return this.clubPic;
}
}
