import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObdTestService} from "~/app/obd-test/obd-test.service";

@Component({
  selector: 'ns-obd-test',
  templateUrl: './obd-test.component.html',
  styleUrls: ['./obd-test.component.scss'],
  moduleId: module.id,
})
export class ObdTestComponent implements OnInit, OnDestroy {
  private revs: string = "0";
  private value: string;
  private interval;

  constructor(private obdTestService: ObdTestService) {
  }

  ngOnInit() {
    //let command = commands.engineRevs;
    console.log("*** on init getRevs()");
    this.revs = this.obdTestService.getRevs();
  }

  getRevs() {
    console.log("*** obd test getRevs()");
    this.interval = setInterval(() => {
      let revs = this.obdTestService.getRevs();
      if(!revs.startsWith("PARSER ERROR") && !revs.startsWith("NO")){
        this.revs = revs;
      }
    }, 700);
  }

  stopRevs(){
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
