import { Injectable } from '@angular/core';
import {
    BluetoothNativeConnectionService,
    ReadData
} from "~/app/bluetooth-connection/bluetooth-native-connection.service";

@Injectable({
  providedIn: 'root'
})
export class ObdTestService {
  constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService) { }

    public getRevs() : ResponseData {
        this.bluetoothNativeConnectionService.sendMessage("010C");
        let response: ReadData = this.bluetoothNativeConnectionService.readMessage(2);
        let bytes: Array<number> = response.bytes;
        let readNum: number = response.readNum;
        let value = (256*bytes[0]+bytes[1])/4;
        return new ResponseData(bytes, readNum, value);
    }
}

export class ResponseData{
    constructor(respData, readNum, respValue){
        this.respData = respData;
        this.readNum = readNum;
        this.respValue = respValue;
    }
    public respData: Array<number>;
    public readNum: number;
    public respValue: number;
}
