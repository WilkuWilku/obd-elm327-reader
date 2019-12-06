import {Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import "nativescript-bluetooth"
import {BluetoothNativeConnectionService} from "~/app/bluetooth-connection/bluetooth-native-connection.service";
import BluetoothDevice = android.bluetooth.BluetoothDevice;
import Toast = android.widget.Toast;
import * as applicationModule from "tns-core-modules/application";
import BluetoothAdapter = android.bluetooth.BluetoothAdapter;
import {ObservableArray} from "data/observable-array";


@Component({
  selector: 'ns-bluetooth-connection',
  templateUrl: './bluetooth-connection.component.html',
  styleUrls: ['./bluetooth-connection.component.scss'],
  moduleId: module.id,
})
export class BluetoothConnectionComponent implements OnInit, OnDestroy{

  devices: ObservableArray<BluetoothDevice>;
  connectedDevice: BluetoothDevice;
  selectedDevice: BluetoothDevice;
  isDiscovering: boolean = false;

  @ViewChild('devicesListView', {static: false}) devicesListView;
  @ViewChild('loader', {static: false}) loader;

  constructor(public bluetoothNativeConnectionService: BluetoothNativeConnectionService, private zone: NgZone){}

  ngOnInit() {
        this.devices = new ObservableArray<BluetoothDevice>([]);
      let broadcastReceiverCallback = (androidContext, intent) => {
          let action = intent.getAction();
          console.log("*** !! action !!", action);
          if (BluetoothDevice.ACTION_FOUND == action) {
              let device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE) as BluetoothDevice;
              this.devices.push(device);
              this.devicesListView.nativeElement.refresh();
              console.log("*** new device found - ", device.getName());
          }
          if(BluetoothAdapter.ACTION_DISCOVERY_FINISHED == action){
              this.zone.run(() => {
                this.isDiscovering = false;
              });
              Toast.makeText(applicationModule.android.foregroundActivity, "Device discovery finished", Toast.LENGTH_SHORT).show();
              console.log("*** device discovery finished");
          }
      };
      applicationModule.android.registerBroadcastReceiver(BluetoothDevice.ACTION_FOUND, broadcastReceiverCallback);
      applicationModule.android.registerBroadcastReceiver(BluetoothAdapter.ACTION_DISCOVERY_FINISHED, broadcastReceiverCallback);
  }

  searchDevices() {
      this.devices = new ObservableArray<BluetoothDevice>([]);
      this.selectedDevice = undefined;
      this.isDiscovering = true;
      this.bluetoothNativeConnectionService.searchDevices();
  }

  stopSearching(){
      this.isDiscovering = false;
      this.bluetoothNativeConnectionService.stopSearching();
  }

  selectDevice(device: BluetoothDevice){
    this.zone.run(() => {
      this.selectedDevice = device;
    });
      console.log("*** device seleced: ", this.selectedDevice);
  }

  connectToSelectedDevice() {
      this.bluetoothNativeConnectionService.connectToDevice(this.selectedDevice);
      this.connectedDevice = this.selectedDevice;
      Toast.makeText(applicationModule.android.foregroundActivity, "Połączono z urządzeniem " + this.connectedDevice.getName(), Toast.LENGTH_SHORT).show();
  }

  ngOnDestroy(): void {
      console.log("*** onDestroy");
      this.bluetoothNativeConnectionService.closeAll();
      applicationModule.android.unregisterBroadcastReceiver(BluetoothDevice.ACTION_FOUND);
      applicationModule.android.unregisterBroadcastReceiver(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
  }

}
