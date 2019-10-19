import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/data-filter.service';
import { DataService } from '../core/data.service';
import { IApartment, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'apartments', 
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  title: string;
  apartments: IApartment[] = [];
  filteredApartments: IApartment[] = [];

  filterAddress: string ="";
  filterPriceMin: number = 0;
  filterPriceMax: number = 9999999;
  filterNbrRooms: number = 99999;

  totalRecords: number = 0;
  pageSize: number = 5;

  constructor(private router: Router, 
              private dataService: DataService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Apartments';
    this.getApartmentsPageFiltered(1);
  }


  applyFilter(event: Event) {
    this.getApartmentsPageFiltered(1);
  }

  resetFilters(event: Event){

    this.filterAddress = "";
    this.filterPriceMin = 0;
    this.filterPriceMax = 9999999;
    this.filterNbrRooms = 99999;

    this.getApartmentsPageFiltered(1);
}

  pageChanged(page: number) {
    this.getApartmentsPageFiltered(page);


  }

  getApartmentsPage(page: number) {
    this.dataService.getApartmentsPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IApartment[]>) => {
          this.apartments = this.filteredApartments = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getApartmentsPage() retrieved apartments'));
  }


  getApartmentsPageFiltered(page: number) {


    if (this.filterAddress == "") {

      this.dataService.getApartmentsPageFiltered((page - 1) * this.pageSize, this.pageSize, this.filterPriceMin, this.filterPriceMax, "defaultAddress", this.filterNbrRooms)
        .subscribe((response: IPagedResults<IApartment[]>) => {
          this.apartments = this.filteredApartments = response.results;
          this.totalRecords = response.totalRecords;
        },
          (err: any) => console.log(err),
          () => console.log('getApartmentsPage() retrieved apartments'));
    }

    else {

      this.dataService.getApartmentsPageFiltered((page - 1) * this.pageSize, this.pageSize, this.filterPriceMin, this.filterPriceMax, this.filterAddress, this.filterNbrRooms)
        .subscribe((response: IPagedResults<IApartment[]>) => {
          this.apartments = this.filteredApartments = response.results;
          this.totalRecords = response.totalRecords;
        },
          (err: any) => console.log(err),
          () => console.log('getApartmentsPage() retrieved apartments'));
    }
  }

}
