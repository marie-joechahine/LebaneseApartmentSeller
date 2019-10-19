"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var apartments_component_1 = require("./apartments/apartments.component");
var apartments_grid_component_1 = require("./apartments/apartments-grid.component");
var apartment_edit_reactive_component_1 = require("./apartments/apartment-edit-reactive.component");
var purchase_success_dialog_component_1 = require("./purchase-success-dialog/purchase-success-dialog.component");
var purchase_fail_dialog_component_1 = require("./purchase-fail-dialog/purchase-fail-dialog.component");
var apartment_purchase_component_1 = require("./apartments/apartment-purchase.component");
var routes = [
    { path: 'api/apartments', component: apartments_component_1.ApartmentsComponent },
    { path: 'apartments/:id', component: apartment_edit_reactive_component_1.ApartmentEditReactiveComponent },
    { path: 'purchase/:id', component: apartment_purchase_component_1.ApartmentPurchaseComponent },
    { path: 'success', component: purchase_success_dialog_component_1.PurchaseSuccessDialogComponent },
    { path: 'fail', component: purchase_fail_dialog_component_1.PurchaseFailDialogComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'api/apartments' } //catch any unfound routes and redirect to home page
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule.components = [apartments_component_1.ApartmentsComponent, apartments_grid_component_1.ApartmentsGridComponent, apartment_edit_reactive_component_1.ApartmentEditReactiveComponent, apartment_purchase_component_1.ApartmentPurchaseComponent, purchase_fail_dialog_component_1.PurchaseFailDialogComponent, purchase_success_dialog_component_1.PurchaseSuccessDialogComponent];
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map