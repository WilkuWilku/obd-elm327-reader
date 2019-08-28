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

@Injectable({
  providedIn: 'root'
})
export class BluetoothNativeConnectionService {
    private readonly BT_REQUEST_CODE: number = 1;
    private readonly BUFFER_SIZE: number = 128;
    private bluetoothAdapter: BluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    private _connectedDevice: BluetoothDevice;
    private inputStream: InputStream;
    private outputStream: OutputStream;
    private bluetoothSocket: BluetoothSocket;
    get connectedDevice(): android.bluetooth.BluetoothDevice {
        return this._connectedDevice;
    }

    constructor() { }

  enableBluetooth(){
      console.log("*** checking if bluetooth is enabled...");
      if(this.bluetoothAdapter == null || !this.bluetoothAdapter.isEnabled()){
          console.log("*** bluetooth is disabled. Starting REQUEST_ENABLE activity");
          let enableBluetoothIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
          applicationModule.android.foregroundActivity.startActivityForResult(enableBluetoothIntent, this.BT_REQUEST_CODE);
      }
  }

  isDiscovering(): boolean{
        return this.bluetoothAdapter.isDiscovering();
  }

  searchDevices(){
      this.enableBluetooth();
      if(this.bluetoothAdapter.isDiscovering()){
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

  sendMessage(message: string){
        try {
            console.log("*** sending message: " + message);
            let javaMessage: java.lang.String = new java.lang.String(message + '\r');
            console.log("*** casting to java String");
            this.outputStream.write(javaMessage.getBytes());
            console.log("*** outputstream write java String bytes");
            this.outputStream.flush();
            console.log("*** outputstream flush");
        } catch (e) {
            Toast.makeText(applicationModule.android.foregroundActivity, "ERROR: "+e, Toast.LENGTH_SHORT).show();
        }
  }

  readMessage(bytesNum: number){
        try {
            console.log("*** reading message");
            let bytes: Array<number> = new Array<number>(this.BUFFER_SIZE);
            console.log("*** available: "+this.inputStream.available());
            let readNum: number = this.inputStream.read(bytes);
            console.log("** response: " + bytes);
            console.log("*** read " + readNum + " bytes");
            return new ReadData(readNum, bytes);
        } catch (e) {
            Toast.makeText(applicationModule.android.foregroundActivity, "ERROR: "+e, Toast.LENGTH_SHORT).show();
        }
  }

  closeAll(){
        if(this.inputStream != null){
            this.inputStream.close();
        }
        if(this.outputStream != null){
          this.outputStream.close();
        }
        if(this.bluetoothSocket != null){
            this.bluetoothSocket.close();
        }
  }

}
export class ReadData{
    constructor(readNum, bytes) {
        this.readNum = readNum;
        this.bytes = bytes;
    }
    public readNum: number;
    public bytes: Array<number>;
}
