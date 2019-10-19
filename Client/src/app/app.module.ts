import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule }   from './core/core.module';
import { SharedModule } from './shared/shared.module';
//import { MatDialogModule } from '@angular/material';
import { PurchaseSuccessDialogComponent } from './purchase-success-dialog/purchase-success-dialog.component';
import { PurchaseFailDialogComponent } from './purchase-fail-dialog/purchase-fail-dialog.component';

@NgModule({
  imports: [
    BrowserModule, 
    AppRoutingModule,
    CoreModule,   //Singleton objects
    SharedModule  //Shared (multi-instance) objects
    //MatDialogModule
  ],
  declarations: [ AppComponent, AppRoutingModule.components, PurchaseSuccessDialogComponent, PurchaseFailDialogComponent ],
  bootstrap: [AppComponent]
  //entryComponents: [PurchaseSuccessDialogComponent, PurchaseFailDialogComponent],
})
export class AppModule { }
