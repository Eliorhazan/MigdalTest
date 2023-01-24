import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GarageService } from '../services/garage.service';

@Component({
  selector: 'area-combo',
  template: `
    <div class="combobox">
	<input type="text" [(ngModel)]="inputItem" (ngModelChange)="getFilteredList()" class="combobox-input" (keyup)="onKeyPress($event)"
   (blur)="toggleListDisplay(0)" (focus)="toggleListDisplay(1)" placeholder="בחר איזור"[ngClass]="{'error': showError}">
  <span *ngIf="showError" class="error-text"><i>Invalid Selection.</i></span>
  <div class="combobox-options" *ngIf="!listHidden">
    <list-item *ngFor="let item of filteredList;let i = index" (click)="selectItem(i)" [ngClass]="{'selected': i===selectedIndex}">{{item}}</list-item>
  </div>
</div>
  `
})

export class AreaComboComponent implements OnInit {
  constructor(private garageService:GarageService ) { }


  @Output() selectedArea = new EventEmitter<string>();
  @Input() list: string[];
  // two way binding for input text
  inputItem = '';
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;

  // the list to be shown after filtering
  filteredList: string[] = [];



  ngOnInit() {

    this.filteredList = this.list;
  }

  // modifies the filtered list as per input
  getFilteredList() {

    this.listHidden = false;
    // this.selectedIndex = 0;
    if (!this.listHidden && this.inputItem !== undefined) {
      this.filteredList = this.list.filter((item) => item.toLowerCase().startsWith(this.inputItem.toLowerCase()));
    }
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItem(ind) {

    this.inputItem = this.filteredList[ind];
    console.log(this.inputItem)
    this.listHidden = true;
    this.selectedIndex = ind;
    this.selectedArea.emit(this.inputItem);
  }

  // navigate through the list of items
  onKeyPress(event) {

    if (!this.listHidden) {
      if (event.key === 'Escape') {
        this.selectedIndex = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0);
      }
      if (event.key === 'ArrowDown') {

        this.listHidden = false;
        this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.listHidden = false;
        if (this.selectedIndex <= 0) {
          this.selectedIndex = this.filteredList.length;
        }
        this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

        if (this.filteredList.length > 0 && !this.listHidden) {

          document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplay(sender: number) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHidden = false;
      this.getFilteredList();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItem(this.selectedIndex);
        this.listHidden = true;
        if (!this.list.includes(this.inputItem)) {
          this.showError = true;
          this.filteredList = this.list;
        } else {
          this.showError = false;
        }
      }, 500);
    }
  }
}
