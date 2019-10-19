"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../core/data.service");
var trackby_service_1 = require("../core/trackby.service");
var ApartmentPurchaseComponent = /** @class */ (function () {
    //purchaseSuccessDialogRef: MatDialogRef<PurchaseSuccessDialogComponent>;
    //purchaseFailDialogRef: MatDialogRef<PurchaseFailDialogComponent>;
    function ApartmentPurchaseComponent(router, route, dataService, trackby
    //private dialog: MatDialog
    ) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.trackby = trackby;
        this.buyers = [];
    }
    ApartmentPurchaseComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        this.getApartment(id);
        this.getBuyers();
    };
    ApartmentPurchaseComponent.prototype.cancel = function (event) {
        event.preventDefault();
        console.log('Cancelled?');
        this.router.navigate(['/apartments']);
    };
    ApartmentPurchaseComponent.prototype.purchase = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.buyApartment(this.buyerID, this.apartment.id)
            .subscribe(function (status) {
            if (status) {
                console.log(status);
                console.log(_this.apartment.OwnerId);
                //this.purchaseSuccessDialogRef = this.dialog.open(PurchaseSuccessDialogComponent);
                _this.router.navigate(['/success']);
                //this.router.navigate(['/apartments']);
            }
            else {
                //this.purchaseFailDialogRef = this.dialog.open(PurchaseFailDialogComponent);
                _this.errorMessage = 'Unable to buy apartment'; //not enough credits, or show that before?
                _this.router.navigate(['/fail']);
            }
        }, function (err) { return console.log(err); });
    };
    ApartmentPurchaseComponent.prototype.getApartment = function (id) {
        var _this = this;
        this.dataService.getApartment(id)
            .subscribe(function (apartment) {
            _this.apartment = apartment;
        }, function (err) { return console.log(err); });
    };
    ApartmentPurchaseComponent.prototype.getBuyer = function (id) {
        var _this = this;
        this.dataService.getBuyer(id)
            .subscribe(function (buyer) {
            _this.buyer = buyer;
        }, function (err) { return console.log(err); });
    };
    ApartmentPurchaseComponent.prototype.getBuyers = function () {
        var _this = this;
        this.dataService.getBuyers()
            .subscribe(function (response) {
            _this.buyers = response;
        }, function (err) { return console.log(err); }, function () { return console.log('getBuyers() retrieved buyers'); });
    };
    ApartmentPurchaseComponent = __decorate([
        core_1.Component({
            selector: 'apartment-purchase',
            templateUrl: './apartment-purchase.component.html',
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService,
            trackby_service_1.TrackByService
            //private dialog: MatDialog
        ])
    ], ApartmentPurchaseComponent);
    return ApartmentPurchaseComponent;
}());
exports.ApartmentPurchaseComponent = ApartmentPurchaseComponent;
//# sourceMappingURL=apartment-purchase.component.js.map