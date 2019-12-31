import {Injectable} from '@angular/core';
import {
  BluetoothNativeConnectionService,
  ResponseData
} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import {commands} from "~/app/commands/commands";
import {ResponseParserService} from "~/app/bluetooth-connection/response-parser.service";
import {Observable} from "rxjs";
import {ENGINE_REVS_READ_WRITE_DELAY} from "~/app/utils/constants";

@Injectable({
  providedIn: 'root'
})
export class EngineRpmService {
  private readonly sendReadDelayInMillis: number = 250;

  constructor(private bluetoothNativeConnectionService: BluetoothNativeConnectionService, private responseParserService: ResponseParserService) {
  }

  public getRevs(): Observable<string> {
    return new Observable<string>(subscriber => {
      let command = commands.engineRevs;
      this.bluetoothNativeConnectionService.sendMessage(command.commandCode);
      setTimeout(() => {
        let response: ResponseData = this.bluetoothNativeConnectionService.readMessage();
        subscriber.next(this.responseParserService.parseObdCommand(response.responseString, command) + " " + command.unitString);
        subscriber.complete();
      }, this.sendReadDelayInMillis);
    })
  }

  public getRevsAsync(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let command = commands.engineRevs;
      let responseString: string = "";
      this.bluetoothNativeConnectionService.sendMessage(command.commandCode);
      this.bluetoothNativeConnectionService.readMessageAsync().subscribe(responseChunk => {
        console.log("received chunk: "+responseChunk.responseString.replace("\r", "")+", responseString: "+responseString.replace("\r", ""));
        responseString += responseChunk.responseString;
        console.log("response string: "+responseString.replace("\r", ""));
      }, error => {
        console.error(error);
        reject(error);
      }, () => {
        setTimeout(() => {
          console.log("all revs response string: "+responseString.replace("\r", ""));
          resolve(this.responseParserService.parseObdCommand(responseString, command) + " " + command.unitString);
        }, ENGINE_REVS_READ_WRITE_DELAY)
      })
    });
  }

  public getRevsAsyncMock(): Observable<string> {
    return new Observable<string>(subscriber => {
      let delay = Math.floor(Math.random()*50)+50;
      setTimeout(() => {
        subscriber.next((delay+1000).toString());
        subscriber.complete();
      }, delay+ENGINE_REVS_READ_WRITE_DELAY)
    })
  }
}
