import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { MainPageComponent } from './main-page/main-page.component';
import { EngineRpmComponent } from './engine-rpm/engine-rpm.component';
import { BluetoothConnectionComponent } from './bluetooth-connection/bluetooth-connection.component';
import { BtTestComponent } from './bt-test/bt-test.component';
import { ValueBarComponent } from './value-bar/value-bar.component';
import {NativeScriptUIGaugeModule} from "nativescript-ui-gauge/angular";
import { BatteryVoltageComponent } from './battery-voltage/battery-voltage.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUIGaugeModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        MainPageComponent,
        EngineRpmComponent,
        BluetoothConnectionComponent,
        BtTestComponent,
        ValueBarComponent,
        BatteryVoltageComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
