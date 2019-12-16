export abstract class AbstractObdCommand {
  commandCode: string;
  responseLength: number;
  calculateValue: Function;
  unitString: string;
}

export abstract class AbstractElmCommand {
  commandCode: string;
}

class EngineRevsCommand extends AbstractObdCommand {
  constructor() {
    super();
    this.commandCode = "010C";
    this.responseLength = 2;
    this.calculateValue = (bytes => (256 * bytes[0] + bytes[1]) / 4);
    this.unitString = "rpm";
  }
}

class VehicleSpeedCommand extends AbstractObdCommand {
  constructor() {
    super();
    this.commandCode = "010D";
    this.responseLength = 1;
    this.calculateValue = (bytes => bytes[0]);
    this.unitString = "km/h";
  }
}

class ThrottlePositionCommand extends AbstractObdCommand {
  constructor() {
    super();
    this.commandCode = "0111";
    this.responseLength = 1;
    this.calculateValue = (bytes => 100 * bytes[0] / 255);
    this.unitString = "%";
  }
}


class BatteryVoltageCommand extends AbstractElmCommand {
  constructor() {
    super();
    this.commandCode = "AT RV";
  }
}

export var commands = {
  engineRevs: new EngineRevsCommand(),
  vehicleSpeed: new VehicleSpeedCommand(),
  throttle: new ThrottlePositionCommand(),
  batteryVoltage: new BatteryVoltageCommand()
};
