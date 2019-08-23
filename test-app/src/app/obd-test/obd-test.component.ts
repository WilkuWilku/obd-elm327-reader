import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObdTestService, ResponseData} from "~/app/obd-test/obd-test.service";
import {requestCoarseLocationPermission} from "nativescript-bluetooth";

@Component({
  selector: 'ns-obd-test',
  templateUrl: './obd-test.component.html',
  styleUrls: ['./obd-test.component.scss'],
  moduleId: module.id,
})
export class ObdTestComponent implements OnInit, OnDestroy {
    private revs: ResponseData;
  constructor(private obdTestService: ObdTestService) { }

  ngOnInit() {
      this.revs = this.obdTestService.getRevs();
  }

  getRevs(){
      setInterval(() => this.revs = this.obdTestService.getRevs(), 700);
  }

  ngOnDestroy() {
      clearInterval();
  }

}
