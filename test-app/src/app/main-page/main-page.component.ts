import {Component, OnDestroy, OnInit} from '@angular/core';
import {BluetoothNativeConnectionService} from "~/app/bluetooth-connection/bluetooth-native-connection.service";

@Component({
  selector: 'ns-test-view',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  moduleId: module.id,
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(public bluetoothNativeConnectionService: BluetoothNativeConnectionService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      console.log("*** main page onDestroy");
      this.bluetoothNativeConnectionService.closeAll();
  }

}
