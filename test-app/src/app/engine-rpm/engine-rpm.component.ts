import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EngineRpmService} from "~/app/engine-rpm/engine-rpm.service";
import * as applicationModule from "application";
import * as dialogs from 'tns-core-modules/ui/dialogs'
import Toast = android.widget.Toast;
import {BluetoothNativeConnectionService} from "~/app/bluetooth-connection/bluetooth-native-connection.service";

@Component({
  selector: 'ns-engine-rpm',
  templateUrl: './engine-rpm.component.html',
  styleUrls: ['./engine-rpm.component.scss'],
  moduleId: module.id,
})
export class EngineRpmComponent implements OnInit, OnDestroy {
  private revs: string = "0";
  private revValue: number = 0;
  private interval;
  private isIntervalActive: boolean = false;


  constructor(private engineRpmService: EngineRpmService, private bluetoothNativeConnectionService: BluetoothNativeConnectionService) {
  }

  ngOnInit() {
    console.log("*** on init getRevs()");
  }

  async getRevs() {
    if (!this.bluetoothNativeConnectionService.connectedDevice) {
      dialogs.alert({
        title: "Błąd",
        message: "Nie można odczytać danych - nie połączono z urządzeniem",
        okButtonText: "OK"
      });
      return;
    }
    this.isIntervalActive = true;

    while(this.isIntervalActive) {
      await this.engineRpmService.getRevsAsync().toPromise().then(revsValue => {
        this.revs = revsValue;
        this.revValue = parseInt(this.revs.split(" ")[0]);
      })
    }
  }

  stopRevs() {
    clearInterval(this.interval);
    this.isIntervalActive = false;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
