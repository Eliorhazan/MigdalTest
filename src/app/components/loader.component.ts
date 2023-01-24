import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  template: `
    <div *ngIf="loading" class="spinner">
    </div>
  `
})

export class loaderComponent implements OnInit {
  constructor() { }
  @Input() loading: boolean;
  ngOnInit() { }
}
