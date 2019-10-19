import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApartmentsComponent } from './apartments/apartments.component';
import { ApartmentsGridComponent } from './apartments/apartments-grid.component';
import { ApartmentEditReactiveComponent } from './apartments/apartment-edit-reactive.component';
import { PurchaseSuccessDialogComponent } from './purchase-success-dialog/purchase-success-dialog.component';
import { PurchaseFailDialogComponent } from './purchase-fail-dialog/purchase-fail-dialog.component';
import { ApartmentPurchaseComponent } from './apartments/apartment-purchase.component';

const routes: Routes = [
  { path: 'api/apartments', component: ApartmentsComponent },
  { path: 'apartments/:id', component: ApartmentEditReactiveComponent },
  { path: 'purchase/:id', component: ApartmentPurchaseComponent },
  { path: 'success', component: PurchaseSuccessDialogComponent },
  { path: 'fail', component: PurchaseFailDialogComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'api/apartments' } //catch any unfound routes and redirect to home page

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [ApartmentsComponent, ApartmentsGridComponent, ApartmentEditReactiveComponent, ApartmentPurchaseComponent, PurchaseFailDialogComponent, PurchaseSuccessDialogComponent];
}
