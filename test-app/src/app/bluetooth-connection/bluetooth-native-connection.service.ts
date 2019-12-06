import { Injectable } from '@angular/core';
import Intent = android.content.Intent;
import BluetoothAdapter = android.bluetooth.BluetoothAdapter;
import BluetoothDevice = android.bluetooth.BluetoothDevice;
import BluetoothSocket = android.bluetooth.BluetoothSocket;
import InputStream = java.io.InputStream;
import OutputStream = java.io.OutputStream;
import UUID = java.util.UUID;
import * as applicationModule from "tns-core-modules/application";
import Toast = android.widget.Toast;
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BluetoothNativeConnectionService {
  private readonly BT_REQUEST_CODE: number = 1;
  private readonly BUFFER_SIZE: number = 64;
  private bluetoothAdapter: BluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
  private _connectedDevice: BluetoothDevice;
  private inputStream: InputStream;
  private outputStream: OutputStream;
  private bluetoothSocket: BluetoothSocket;

  get connectedDevice(): android.bluetooth.BluetoothDevice {
    return this._connectedDevice;
  }

  constructor() {
  }

  enableBluetooth() {
    console.log("*** checking if bluetooth is enabled...");
    if (this.bluetoothAdapter == null || !this.bluetoothAdapter.isEnabled()) {
      console.log("*** bluetooth is disabled. Starting REQUEST_ENABLE activity");
      let enableBluetoothIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
      applicationModule.android.foregroundActivity.startActivityForResult(enableBluetoothIntent, this.BT_REQUEST_CODE);
    }
  }

  isDiscovering(): boolean {
    return this.bluetoothAdapter.isDiscovering();
  }

  stopSearching() {
    this.bluetoothAdapter.cancelDiscovery();
  }

  searchDevices() {
    this.enableBluetooth();
    if (this.bluetoothAdapter.isDiscovering()) {
      console.log("*** cancelling current discovery");
      this.bluetoothAdapter.cancelDiscovery();
    }
    console.log("*** starting new discovery");
    let status = this.bluetoothAdapter.startDiscovery();
    console.log("*** discovery status: ", status);
  }

  connectToDevice(device: BluetoothDevice) {
    this.bluetoothAdapter.cancelDiscovery();
    let uuid: UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    console.log("*** connecting to device " + device.getName());
    this.bluetoothSocket = device.createRfcommSocketToServiceRecord(uuid);
    this.bluetoothSocket.connect();
    this._connectedDevice = device;
    this.outputStream = this.bluetoothSocket.getOutputStream();
    this.inputStream = this.bluetoothSocket.getInputStream();
    console.log("*** connected to bluetooth socket");
  }

  sendMessage(message: string) {
    try {
      console.log("*** sending message: " + message);
      let javaMessage: java.lang.String = new java.lang.String(message + '\r');
      //console.log("*** casting to java String");
      this.outputStream.write(javaMessage.getBytes("UTF-8"));
      //console.log("*** outputstream write java String bytes ascii");
      this.outputStream.flush();
      //console.log("*** outputstream flush");
    } catch (e) {
      Toast.makeText(applicationModule.android.foregroundActivity, "ERROR: " + e, Toast.LENGTH_LONG).show();
    }
  }

  readMessage() {
    try {
      console.log("*** reading message");
      let bytesArray = Array.create("byte", this.BUFFER_SIZE);
      let available = this.inputStream.available();
      let bytesCount: number = this.inputStream.read(bytesArray);
      let bytesArrayLog: string = "";
      for(let b of bytesArray){
        bytesArrayLog += " "+(b ? b.toString() : "x");
      }
      console.log("*** response data: " + bytesArrayLog);
      let responseString: string = new java.lang.String(bytesArray, 0, bytesCount, "UTF-8").toString();
      console.log("*** response string:" + "\'"+responseString+"\'");
      return new ResponseData(bytesCount, bytesArray, responseString, available);
    } catch (e) {
      Toast.makeText(applicationModule.android.foregroundActivity, "ERROR: " + e, Toast.LENGTH_LONG).show();
    }
  }

  closeAll() {
    if (this.inputStream != null) {
      this.inputStream.close();
    }
    if (this.outputStream != null) {
      this.outputStream.close();
    }
    if (this.bluetoothSocket != null) {
      this.bluetoothSocket.close();
    }
  }

}
export class ResponseData {
  constructor(bytesCount, bytesArray, responseString, available) {
    this.bytesCount = bytesCount;
    this.bytesArray = bytesArray;
    this.responseString = responseString;
    this.available = available;
  }

  public bytesCount: number;
  public bytesArray: Array<number>;
  public responseString: string;
  public available: number;
}
