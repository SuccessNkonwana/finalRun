import { Component, OnInit } from '@angular/core';
import { RunningService } from 'src/app/services/running.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {
  names: any;
  eventKey: any;
  name:'';


  constructor(private route:ActivatedRoute) { 

  }


  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      console.log(data);
      this.name=data.names;
      this.names=data.name;
      this.eventKey= data.eventKey;
   
    
    })
 
 
 
   console.log(this.name);
   
  }
}
