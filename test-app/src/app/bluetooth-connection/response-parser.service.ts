import {Injectable} from '@angular/core';
import {AbstractCommand} from "~/app/commands/commands";

@Injectable({
  providedIn: 'root'
})
export class ResponseParserService {

  constructor() {
  }

  parse(response: string, commandData: AbstractCommand): string {
    let command = commandData.commandCode;
    let calculateValueFunc = commandData.calculateValue;
    // 010C\r41 0C 10 A4 \r\r>
    console.log("*** PARSER: start parsing response: C/R \'" + command + "\' / \'" + response + "\'");
    let filteredResponse: string = response.replace(/>/g, "")
      .replace("SEARCHING...", "").trim();
    console.log("*** PARSER: response after > CR SEARCHING filter and trim: \'" + filteredResponse + "\'");
    if (filteredResponse.indexOf("NO") >= 0) {
      console.warn("*** PARSER WARN: NO DATA", "\'" + command + "\'", "\'" + response + "\'");
      return "NO DATA";
    }
    let commandEcho: string = filteredResponse.substring(0, 4);
    if (commandEcho != command) {
      console.error("*** PARSER ERROR - response not starting with command echo: \'" + commandEcho + "\' vs \'" + command + "\'");
      return "PARSER ERROR - command echo: \'" + commandEcho + "\' != \'" + command + "\'";
    }
    filteredResponse = filteredResponse.substring(5);
    console.log("*** PARSER: response after command echo filter: \'" + filteredResponse + "\'");

    if (filteredResponse.substring(0, 2) != "4" + command[1]) {
      console.error("*** PARSER ERROR - repeated command invalid 1st (C/FR): \'" + filteredResponse.substring(0, 2) + "\' \'4" + command[1] + "\'");
      return "PARSER ERROR - repeated command 1st (C/FR): \'" + filteredResponse.substring(0, 2) + "\' \'4" + command[1] + "\'";
    }
    if (filteredResponse.substring(3, 5) != command.substring(2, 4)) {
      console.error("*** PARSER ERROR - repeated command invalid 2nd (C/FR): \'" + filteredResponse.substring(3, 5) + "\' \'" + command.substring(2, 4) + "\'");
      return "PARSER ERROR - repeated command 2nd (C/FR): \'" + filteredResponse.substring(3, 5) + "\', \'" + command.substring(2, 4) + "\'";
    }

    filteredResponse = filteredResponse.substring(6);
    console.log("*** PARSER: response after repeated command filter: \'" + filteredResponse + "\'");
    let bytes: Array<number> = filteredResponse.split(" ").map(value => parseInt(value, 16));
    console.log("*** PARSER: calculated bytes: " + bytes);
    return calculateValueFunc(bytes);
  }
}
