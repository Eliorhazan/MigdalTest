
import { Component, OnInit  } from "@angular/core";
import { Observable } from "rxjs";
import { cityResponse } from "../interfaces/cityResponse";
import { Garage } from "../interfaces/garage";
import { GarageService } from "../services/garage.service";
import {HebalphabeticallyPipe} from '../pipes/Hebalphabetically.pipe'
@Component({
  selector: 'home',
  template: `

 <h3 class="p-3 text-center">רשימת מוסכים</h3>
<div dir="rtl" class="container">
    <!-- <div class="row p-0">
      <div class="col-md-12">
      <div style="float: right;" class="col-md-7">
          <area-combo  dir="rtl"  [list]="areaList" (selectedArea)="changeArea($event)"></area-combo>
        </div>
        <br>
        <br>
        <br>

        <div class="col-md-3">
          <input class="city"  type="text" placeholder="הזן שם עיר" (keyup)="searchGarages($event)"  >
        </div>

      </div>

    </div>
    <br> -->
    <div>
      <area-combo  dir="rtl"  [list]="areaList" (selectedArea)="changeArea($event)"></area-combo>
    </div>
    <div>
      <input class="city"  type="text" placeholder="הזן שם עיר" (keyup)="searchGarages($event)"  >
    </div>
    <table  style="text-align: center;margin-top: 30px;" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>שם</th>
                <th>כתובת</th>
                <th>עיר</th>
            </tr>
        </thead>
        <tbody>
            <tr  *ngFor="let item of garageList">
                <td>{{item.Name}}</td>
                <td>{{item.Address}}</td>
                <td>{{item.City}}</td>
            </tr>
        </tbody>
        <loader [loading]="isLoad"></loader>
    </table>

</div>

  `
})
export class HomeComponent implements OnInit {
  garageList:Garage [] = [];
  searchTerm:string = "";
  isLoad:boolean = true;
  areaList:string [] = [];
  area:string;
  constructor(private garageService:GarageService,private sortPipe:HebalphabeticallyPipe) { }
  ngOnInit() {
    this.getGarage();
    this.getAreaList();
  }
  getGarage(area?:string){
    this.garageService.getGarage(this.searchTerm,this.area)
    .subscribe((res:Garage[])=>{
      this.garageList = res;
      this.garageList = this.sortPipe.transform([...this.garageList]);
      this.isLoad = false;
      //console.log(res)
    });
  }
  searchGarages(e){
    this.searchTerm = e.target.value;
    this.garageService.getGarage(this.searchTerm)
    .subscribe((res:Garage[])=>{
      this.garageList = res;
      this.isLoad = false;
      //console.log(res)
    });
  }
  getAreaList(){
    this.garageService.getArea().subscribe((res:string[])=>{
      if(res){
        this.areaList = res;
        //console.log(this.areaList)
      }
    })
  }
  changeArea(val){
    this.area = val;
    if(this.searchTerm!=""){
      this.garageList = (this.garageList) ?  [...this.garageList].filter(item => item.Area == this.area) : this.garageList;
      //this.getGarage()
    }
    else
      this.getGarage(this.area);


  }
}
