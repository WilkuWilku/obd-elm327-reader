import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObdTestService} from "~/app/obd-test/obd-test.service";
import {ResponseParserService} from "~/app/bluetooth-connection/response-parser.service";

@Component({
  selector: 'ns-obd-test',
  templateUrl: './obd-test.component.html',
  styleUrls: ['./obd-test.component.scss'],
  moduleId: module.id,
})
export class ObdTestComponent implements OnInit, OnDestroy {
  private revs: string;
  private value: string;

  constructor(private obdTestService: ObdTestService) {
  }

  ngOnInit() {
    //let command = commands.engineRevs;
    console.log("*** on init getRevs()");
    this.revs = this.obdTestService.getRevs();
  }

  getRevs() {
    console.log("*** obd test getRevs()");
    setInterval(() => {
      let revs = this.obdTestService.getRevs();
      if(!revs.startsWith("PARSER ERROR") && !revs.startsWith("NO")){
        this.revs = revs;
      }
    }, 200);
  }

  ngOnDestroy() {
    clearInterval();
  }

}
