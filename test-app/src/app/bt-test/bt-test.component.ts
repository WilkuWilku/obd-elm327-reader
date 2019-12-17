import {Component, OnInit} from '@angular/core';
import {TextField} from "tns-core-modules/ui/text-field";
import {
  BluetoothNativeConnectionService,
  ResponseData
} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import {ResponseParserService} from "~/app/bluetooth-connection/response-parser.service";
import {commands} from "~/app/commands/commands";

@Component({
  selector: 'ns-bt-test',
  templateUrl: './bt-test.component.html',
  styleUrls: ['./bt-test.component.scss']
})
export class BtTestComponent implements OnInit {

  private command: string;
  private responseArray: string;
  private responseString: string;
  private available: number;
  private value: string;

  constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService, private responseParserService: ResponseParserService) {
  }

  ngOnInit() {
  }

  updateCommand(args) {
    let textField = args.object as TextField;
    this.command = textField.text;
  }

  sendCommand() {
    //console.log("*** BT test send");
    this.bluetoothNativeConnectionService.sendMessage(this.command);
  }

  readResponse() {
    //console.log("*** BT test read");
    let resp: ResponseData = this.bluetoothNativeConnectionService.readMessage();
    this.responseArray = "";
    for (let b of resp.bytesArray) {
      this.responseArray += " " + (b ? b.toString() : "x");
    }
    this.responseString = resp.responseString;
    this.available = resp.available;
    this.value = this.responseParserService.parseObdCommand(this.responseString, commands.engineRevs)
  }
}
