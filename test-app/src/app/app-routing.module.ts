import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import {TestViewComponent} from "~/app/test-view/test-view.component";
import {ObdTestComponent} from "~/app/obd-test/obd-test.component";
import {BluetoothConnectionComponent} from "~/app/bluetooth-connection/bluetooth-connection.component";
import {BtTestComponent} from "~/app/bt-test/bt-test.component";

const routes: Routes = [
    { path: "", redirectTo: "/test-view", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
    { path: "test-view", component: TestViewComponent},
    { path: "obd", component: ObdTestComponent},
    { path: "bt", component:BluetoothConnectionComponent},
    { path: "bt-test", component: BtTestComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
