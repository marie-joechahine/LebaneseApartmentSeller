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
var data_filter_service_1 = require("../core/data-filter.service");
var data_service_1 = require("../core/data.service");
var ApartmentsComponent = /** @class */ (function () {
    function ApartmentsComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.apartments = [];
        this.filteredApartments = [];
        this.filterAddress = "";
        this.filterPriceMin = 0;
        this.filterPriceMax = 9999999;
        this.filterNbrRooms = 99999;
        this.totalRecords = 0;
        this.pageSize = 5;
    }
    ApartmentsComponent.prototype.ngOnInit = function () {
        this.title = 'Apartments';
        this.getApartmentsPageFiltered(1);
    };
    ApartmentsComponent.prototype.applyFilter = function (event) {
        this.getApartmentsPageFiltered(1);
    };
    ApartmentsComponent.prototype.resetFilters = function (event) {
        this.filterAddress = "";
        this.filterPriceMin = 0;
        this.filterPriceMax = 9999999;
        this.filterNbrRooms = 99999;
        this.getApartmentsPageFiltered(1);
    };
    ApartmentsComponent.prototype.pageChanged = function (page) {
        this.getApartmentsPageFiltered(page);
    };
    ApartmentsComponent.prototype.getApartmentsPage = function (page) {
        var _this = this;
        this.dataService.getApartmentsPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.apartments = _this.filteredApartments = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getApartmentsPage() retrieved apartments'); });
    };
    ApartmentsComponent.prototype.getApartmentsPageFiltered = function (page) {
        var _this = this;
        if (this.filterAddress == "") {
            this.dataService.getApartmentsPageFiltered((page - 1) * this.pageSize, this.pageSize, this.filterPriceMin, this.filterPriceMax, "defaultAddress", this.filterNbrRooms)
                .subscribe(function (response) {
                _this.apartments = _this.filteredApartments = response.results;
                _this.totalRecords = response.totalRecords;
            }, function (err) { return console.log(err); }, function () { return console.log('getApartmentsPage() retrieved apartments'); });
        }
        else {
            this.dataService.getApartmentsPageFiltered((page - 1) * this.pageSize, this.pageSize, this.filterPriceMin, this.filterPriceMax, this.filterAddress, this.filterNbrRooms)
                .subscribe(function (response) {
                _this.apartments = _this.filteredApartments = response.results;
                _this.totalRecords = response.totalRecords;
            }, function (err) { return console.log(err); }, function () { return console.log('getApartmentsPage() retrieved apartments'); });
        }
    };
    ApartmentsComponent = __decorate([
        core_1.Component({
            selector: 'apartments',
            templateUrl: './apartments.component.html',
            styleUrls: ['./apartments.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            data_service_1.DataService,
            data_filter_service_1.DataFilterService])
    ], ApartmentsComponent);
    return ApartmentsComponent;
}());
exports.ApartmentsComponent = ApartmentsComponent;
//# sourceMappingURL=apartments.component.js.map