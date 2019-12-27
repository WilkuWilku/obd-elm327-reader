import { Injectable } from '@angular/core';
import {
    BluetoothNativeConnectionService,
    ResponseData
} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import {commands} from "~/app/commands/commands";
import {ResponseParserService} from "~/app/bluetooth-connection/response-parser.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BatteryVoltageService {
  private readonly sendReadDelayInMillis: number = 250;

  constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService, private responseParserService: ResponseParserService) { }

  public getBatteryVoltage(): Observable<string> {
    return new Observable<string>(subscriber => {
      this.bluetoothNativeConnectionService.clearInputStream();
      this.tryToGetBatteryVoltage(subscriber, 0);
    });
  }

  private tryToGetBatteryVoltage(subscriber, iteration) {
    console.log("tryToGetBatteryVoltage iteration: "+iteration);
    let command = commands.batteryVoltage;
    console.log("sending command: "+command);
    this.bluetoothNativeConnectionService.sendMessage(command.commandCode);
    setTimeout(() => {
      let response: ResponseData = this.bluetoothNativeConnectionService.readMessage();
      let parsedResponse = this.responseParserService.parseElmCommand(response.responseString, command);
      console.log("parsedResponse: "+parsedResponse);
      if(!parsedResponse.startsWith("PARSER ERROR")) {
        subscriber.next(parsedResponse);
        subscriber.complete();
      } else {
        if(iteration < 5)
          this.tryToGetBatteryVoltage(subscriber, iteration+1);
        else {
          subscriber.next("ERROR: parsedResponse: '"+parsedResponse+"', bytes read: "+response.bytesCount);
          subscriber.complete();
        }
      }
    }, this.sendReadDelayInMillis);
  }

  public getBatteryVoltageAsync(bytes?: number): Observable<string> {
    return new Observable<string>(subscriber => {
      this.bluetoothNativeConnectionService.clearInputStream();
      let command = commands.batteryVoltage;
      console.log("sending command: "+command);
      this.bluetoothNativeConnectionService.sendMessage(command.commandCode);

      let responseString: string = "";
      this.bluetoothNativeConnectionService.readMessageAsync().subscribe(responseChunk => {
        responseString += responseChunk.responseString;
      }, error => {
        subscriber.error(error)
      }, () => {
        console.log("entire responseString: "+responseString);
        let parsedResponse = this.responseParserService.parseElmCommand(responseString, command);
        console.log("parsedResponse: " + parsedResponse);
        subscriber.next(parsedResponse);
        subscriber.complete();
      })
    });
  }
}
