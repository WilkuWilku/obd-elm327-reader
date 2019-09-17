import { Injectable } from '@angular/core';
import {
    BluetoothNativeConnectionService,
    ResponseData
} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import {commands} from "~/app/commands/commands";
import {ResponseParserService} from "~/app/bluetooth-connection/response-parser.service";

@Injectable({
  providedIn: 'root'
})
export class ObdTestService {
  constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService, private responseParserService: ResponseParserService) { }

    public getRevs() : string {
        let command = commands.engineRevs;
        this.bluetoothNativeConnectionService.sendMessage(command.commandCode);
        let response: ResponseData = this.bluetoothNativeConnectionService.readMessage();
        return this.responseParserService.parse(response.responseString, command);
    }
}

// export class ResponseData{
//     constructor(readData, respValue, respArray){
//         this.readData = readData;
//         this.respValue = respValue;
//         this.respArray = respArray;
//     }
//     public readData: ResponseData;
//     public respValue: number;
//     public respArray: string;
// }
