import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RunningService } from 'src/app/services/running.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-done',
  templateUrl: './done.page.html',
  styleUrls: ['./done.page.scss'],
})
export class DonePage implements OnInit {
  names;
 
  theAccount={
    name:'',
   
    account:0,
    bank:'',
    branch:0,
    recipient:'',
    type:'',
    
  
  }
    theUser=[];
    private uid: string= null;
  email: any;
  myAccount;
  name:string;
  eventKey1;
  eventKey;
  theName:string;
  constructor(private route:ActivatedRoute,     private router: Router,
    private clubService:RunningService, public runn:RunningService,private navCtrl: NavController,) 
  {
   
     this.runn.getAccount().subscribe(data=>{
      this.myAccount=data.map(e=>{
        return{
          key: e.payload.doc.id,
          bank: e.payload.doc.data()['bank'],
          account: e.payload.doc.data()['account'],
          branch: e.payload.doc.data()['branch'],
          type: e.payload.doc.data()['type'],
          recipient: e.payload.doc.data()['recipient'],
          // ...e.payload.doc.data
        }as Account;// the Item is the class name in the item.ts
      });
      console.log(this.myAccount);
    });



    
   }
   user(){
    let user=this.runn.readCurrentSession()
    this.name=user.uid
    this.theName=this.name.substring(0,5)
    console.log("loged in user: ",this.theName)

   }


tickets;price;total;info
  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      console.log(data);
      this.tickets=data.tickets;
      this.price=data.price;
      this.name=data.name;
      this.names=data.name;
      this.eventKey1= data.eventKey;
      this.eventKey=data.eventKey;
      this.info=data.info;
      this.total=this.tickets*this.price;
      console.log(this.price);
      console.log(this.info);
      console.log(this.tickets);
      console.log(this.total);
    })
   this.user();
   console.log(this.price);
   console.log(this.tickets);
   console.log(this.total);
   console.log(this.names);
   
  }
  // updateDeposit()
  // {
  //   this.runn.updateDeposit();
  // }
  
  done(){
    this.clubService.done();
    this.router.navigate(['/complete'],{queryParams:{names:this.names,total:this.total,eventKey:this.eventKey1}})

  }


}
