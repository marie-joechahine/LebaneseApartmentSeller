import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'filter-textbox-PriceMax',
  template: `
    <form>
         Filter:
         <input type="text" name="filter"
                [(ngModel)]="model.filter" 
                (keyup)="filterChangedPriceMax($event)"  />
    </form>
  `
})
export class FilterTextboxPriceMaxComponent {

  
    model: { filter: number} = { filter: null };
    
    @Output()
    changed: EventEmitter<number> = new EventEmitter<number>();

    filterChangedPriceMax(event: any) {
      event.preventDefault();
      this.changed.emit(this.model.filter); //Raise changed event
    }
}
