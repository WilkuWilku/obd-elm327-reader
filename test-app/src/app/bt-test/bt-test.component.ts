import { Component, OnInit } from '@angular/core';
import { TextField } from "tns-core-modules/ui/text-field";
import {
    BluetoothNativeConnectionService,
    ReadData
} from "~/app/bluetooth-connection/bluetooth-native-connection.service";

@Component({
  selector: 'ns-bt-test',
  templateUrl: './bt-test.component.html',
  styleUrls: ['./bt-test.component.scss']
})
export class BtTestComponent implements OnInit {

    private command: string;
    private responseArray: Array<number>;
    private responseString: string;
    private exceptionText: string;

    constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService) {
    }

    ngOnInit() {
    }

    updateCommand(args){
        let textField = args.object as TextField;
        this.command = textField.text;
    }

    sendCommand(){
        this.bluetoothNativeConnectionService.sendMessage(this.command);
    }

    sendCommand2(){
        this.bluetoothNativeConnectionService.sendMessage2(this.command);
    }

    readResponse(){
        let resp: ReadData = this.bluetoothNativeConnectionService.readMessage(null);
        this.responseArray = resp.bytes;
        this.responseString = resp.val.toString();
    }

    readResponse2(){
        let resp: ReadData = this.bluetoothNativeConnectionService.readMessage2(null);
        this.responseArray = resp.bytes;
        this.responseString = resp.val.toString();
    }

}
