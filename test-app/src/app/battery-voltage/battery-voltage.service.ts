import { Injectable } from '@angular/core';
import {BluetoothNativeConnectionService} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import {commands} from "~/app/commands/commands";

@Injectable({
  providedIn: 'root'
})
export class BatteryVoltageService {

  constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService) { }

  public getBatteryVoltage(): string {
    let command = commands.batteryVoltage;
    this.bluetoothNativeConnectionService.sendMessage(command.commandCode);
    return this.bluetoothNativeConnectionService.readMessage().responseString;
  }
}
