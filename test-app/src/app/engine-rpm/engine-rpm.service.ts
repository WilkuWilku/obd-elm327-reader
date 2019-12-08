import {Injectable} from '@angular/core';
import {
  BluetoothNativeConnectionService,
  ResponseData
} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import {commands} from "~/app/commands/commands";
import {ResponseParserService} from "~/app/bluetooth-connection/response-parser.service";

@Injectable({
  providedIn: 'root'
})
export class EngineRpmService {
  constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService, private responseParserService: ResponseParserService) {
  }

  public getRevs(): string {
    let command = commands.engineRevs;
    this.bluetoothNativeConnectionService.sendMessage(command.commandCode);
    let response: ResponseData = this.bluetoothNativeConnectionService.readMessage();
    return this.responseParserService.parse(response.responseString, command) + " " + command.unitString;
  }
}
