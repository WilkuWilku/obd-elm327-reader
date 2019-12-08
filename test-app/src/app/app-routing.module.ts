import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import {MainPageComponent} from "~/app/main-page/main-page.component";
import {EngineRpmComponent} from "~/app/engine-rpm/engine-rpm.component";
import {BluetoothConnectionComponent} from "~/app/bluetooth-connection/bluetooth-connection.component";
import {BtTestComponent} from "~/app/bt-test/bt-test.component";

const routes: Routes = [
    { path: "", redirectTo: "/test-view", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
    { path: "test-view", component: MainPageComponent},
    { path: "engine-rpm", component: EngineRpmComponent},
    { path: "bt", component:BluetoothConnectionComponent},
    { path: "bt-test", component: BtTestComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
