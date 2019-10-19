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
var forms_1 = require("@angular/forms");
var data_service_1 = require("../core/data.service");
var ApartmentEditReactiveComponent = /** @class */ (function () {
    function ApartmentEditReactiveComponent(router, route, dataService, formBuilder) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.apartment = {
            //Id: 0,
            title: '',
            address: '',
            nbrRooms: 0,
            price: 0,
            OwnerId: 0
        };
        this.operationText = 'Insert';
        this.priceEnabled = false;
    }
    ApartmentEditReactiveComponent.prototype.ngOnInit = function () {
        this.priceEnabled = false;
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.priceEnabled = true;
            this.getApartment(id);
        }
        this.buildForm();
    };
    ApartmentEditReactiveComponent.prototype.getApartment = function (id) {
        var _this = this;
        this.dataService.getApartment(id)
            .subscribe(function (apartment) {
            _this.apartment = apartment;
            _this.buildForm();
        }, function (err) { return console.log(err); });
    };
    ApartmentEditReactiveComponent.prototype.buildForm = function () {
        this.apartmentForm = this.formBuilder.group({
            //Id: [this.apartment.Id, Validators.required],
            title: [this.apartment.title, forms_1.Validators.required],
            address: [this.apartment.address, forms_1.Validators.required],
            nbrRooms: [this.apartment.nbrRooms, [forms_1.Validators.required, forms_1.Validators.min(1)]],
            price: [this.apartment.price]
        });
    };
    ApartmentEditReactiveComponent.prototype.submit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        value.id = this.apartment.id;
        console.log('ID: ' + value.id);
        // var apartment: IApartment = {
        //   id: this.apartment.id,
        // };
        if (value.id) {
            this.dataService.updateApartment(value)
                .subscribe(function (apartment) {
                if (apartment) {
                    _this.router.navigate(['/apartments']);
                }
                else {
                    _this.errorMessage = 'Unable to save apartment';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertApartment(value)
                .subscribe(function (apartment) {
                if (apartment) {
                    _this.router.navigate(['/apartments']);
                }
                else {
                    _this.errorMessage = 'Unable to add apartment';
                }
            }, function (err) { return console.log(err); });
        }
    };
    ApartmentEditReactiveComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/apartments']);
    };
    //changePrice(event: Event) {
    //  event.preventDefault();
    //  console.log('Changing price?');
    //  this.apartment.price = this.apartment.nbrRooms * 15000;
    //}
    ApartmentEditReactiveComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteApartment(this.apartment.id)
            .subscribe(function (status) {
            if (status) {
                console.log(status);
                _this.router.navigate(['/apartments']);
            }
            else {
                _this.errorMessage = 'Unable to delete apartment';
            }
        }, function (err) { return console.log(err); });
    };
    ApartmentEditReactiveComponent = __decorate([
        core_1.Component({
            selector: 'apartment-edit-reactive',
            templateUrl: './apartment-edit-reactive.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            data_service_1.DataService,
            forms_1.FormBuilder])
    ], ApartmentEditReactiveComponent);
    return ApartmentEditReactiveComponent;
}());
exports.ApartmentEditReactiveComponent = ApartmentEditReactiveComponent;
//# sourceMappingURL=apartment-edit-reactive.component.js.map