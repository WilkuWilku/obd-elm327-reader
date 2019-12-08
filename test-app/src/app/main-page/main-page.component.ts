import {Component, OnInit} from '@angular/core';
import {BluetoothNativeConnectionService} from "~/app/bluetooth-connection/bluetooth-native-connection.service";

@Component({
  selector: 'ns-test-view',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  moduleId: module.id,
})
export class MainPageComponent implements OnInit {

  constructor(public bluetoothNativeConnectionService: BluetoothNativeConnectionService) {
  }

  ngOnInit() {
  }

}
