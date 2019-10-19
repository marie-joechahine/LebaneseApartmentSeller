import { ModuleWithProviders } from '@angular/core';

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IApartment {

  id?: string;
  title: string;
  address: string;
  nbrRooms: number;
  price: number;
  OwnerId: number;

}

export interface IBuyer {

  id: string
  fullname: string;
  credit: number;

}

export interface IApartmentResponse {
  status: boolean;
  apartment: IApartment;
}
