import { Component, OnInit } from '@angular/core';
import {BluetoothNativeConnectionService} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import {BatteryVoltageService} from "~/app/battery-voltage/battery-voltage.service";
import * as dialogs from "ui/dialogs";

@Component({
  selector: 'ns-battery-voltage',
  templateUrl: './battery-voltage.component.html',
  styleUrls: ['./battery-voltage.component.scss'],
  moduleId: module.id
})
export class BatteryVoltageComponent implements OnInit {

  batteryVoltage: string = "---";
  isLoading: boolean = false;
  constructor(private batteryVoltageService: BatteryVoltageService, private bluetoothNativeConnectionService: BluetoothNativeConnectionService) { }

  ngOnInit() {
  }

  readBatteryVoltage() {
    if (!this.bluetoothNativeConnectionService.connectedDevice) {
      dialogs.alert({
        title: "Błąd",
        message: "Nie można odczytać danych - nie połączono z urządzeniem",
        okButtonText: "OK"
      });
      return;
    }
    this.isLoading = true;
    this.batteryVoltageService.getBatteryVoltageAsync().subscribe(batteryValue => {
      this.batteryVoltage = batteryValue;
      this.isLoading = false;
    });
  }

  getColorClass() {
    let cls = "battery-very-high";
    let batteryVoltageValue: number = parseFloat(this.batteryVoltage.replace("V", ""));
    if (batteryVoltageValue < 10) {
      cls = "battery-dead";
    } else if (batteryVoltageValue < 11) {
      cls = "battery-low";
    } else if (batteryVoltageValue < 11.5) {
      cls = "battery-medium-low";
    } else if (batteryVoltageValue < 12.1) {
      cls = "battery-medium";
    } else if (batteryVoltageValue < 12.7) {
      cls = "battery-ok";
    } else if (batteryVoltageValue < 14) {
      cls = "battery-high";
    }
    return "fas icon "+cls;
  }
}
