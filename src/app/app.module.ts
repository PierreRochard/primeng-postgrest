import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {RouterStoreModule} from "@ngrx/router-store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

import {ButtonModule, DataTableModule, FieldsetModule, GrowlModule, InputTextModule, MenubarModule, PasswordModule} from 'primeng/primeng';

import { environment } from '../environments/environment';

import {RestEffects} from "./rest/rest.effects";

import {GrowlContainer} from "./common/growl.container";
import {MenubarContainer} from "./common/menubar.container";

import {PathContainer} from "./paths/path.container";
import {HomeContainer} from "./home/home.container";
import {RpcContainer} from "./rpc/rpc.container";
import {TableContainer} from "./table/table.container";


import {FormComponent} from "./form/form.component";
import {FormContainer} from "./form/form.container";
import {FormElementComponent} from "./form/form-element.component";
import {FormCreationService} from "./form/form-creation.service";

import {TableDatatableComponent} from "./table/table-datatable.component";

import {RestClient} from "./rest/rest.service";

import {SchemaGuard} from "./schema/schema.guard";
import {SchemaEffects} from "./schema/schema.effects";

import {reducer} from './app.reducers';
import {routing} from "./app.routing";
import {AppComponent} from "./app.component";
import {AuthEffects} from "./auth/auth.effects";
import {TableEffects} from "./table/table.effects";

import {WebsocketEffects} from "./websocket/websocket.effects";
import {WebsocketService} from "./websocket/websocket.service";

const optionalImports = [];

if (!environment.production) {
  // Note that you must instrument after importing StoreModule
  optionalImports.push(StoreDevtoolsModule.instrumentOnlyWithExtension());
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeContainer,
    MenubarContainer,
    PathContainer,
    RpcContainer,
    FormComponent,
    FormContainer,
    FormElementComponent,
    GrowlContainer,
    TableContainer,
    TableDatatableComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    DataTableModule,
    EffectsModule.run(AuthEffects),
    EffectsModule.run(RestEffects),
    EffectsModule.run(SchemaEffects),
    EffectsModule.run(TableEffects),
    EffectsModule.run(WebsocketEffects),
    FieldsetModule,
    FormsModule,
    GrowlModule,
    HttpModule,
    InputTextModule,
    MenubarModule,
    PasswordModule,
    ReactiveFormsModule,
    RouterStoreModule.connectRouter(),
    routing,
    StoreModule.provideStore(reducer),
    ...optionalImports,
  ],
  providers: [
    RestClient,
    FormCreationService,
    SchemaGuard,
    WebsocketService,
  ]
})
export class AppModule { }
