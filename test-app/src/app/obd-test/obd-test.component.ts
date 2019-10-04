import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ObdTestService} from "~/app/obd-test/obd-test.service";
import * as applicationModule from "application";
import Toast = android.widget.Toast;

@Component({
  selector: 'ns-obd-test',
  templateUrl: './obd-test.component.html',
  styleUrls: ['./obd-test.component.scss'],
  moduleId: module.id,
})
export class ObdTestComponent implements OnInit, OnDestroy {
  private revs: string = "0";
  private revValue: number = 0;
  private interval;


  constructor(private obdTestService: ObdTestService) {
  }

  ngOnInit() {
    //let command = commands.engineRevs;
    console.log("*** on init getRevs()");
    //this.revs = this.obdTestService.getRevs();

  }

  getRevs() {
    //console.log("*** obd test getRevs()");
    this.interval = setInterval(() => {
      //this.revs = (parseInt(this.revs)+100).toString();
      let revs = this.obdTestService.getRevs();

      if(!revs.startsWith("PARSER ERROR") && !revs.startsWith("NO")){
       this.revs = revs;
        this.revValue = parseInt(this.revs.split(" ")[0]);
      }
    }, 270);
  }

  stopRevs(){
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


}
