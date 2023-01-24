import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../interfaces/cityRequest';
import { cityResponse } from '../interfaces/cityResponse';
import { Garage } from '../interfaces/garage';
import { map } from 'rxjs/operators';
import { areaResponse } from '../interfaces/areaResponse';
const headerDict = {
  'Content-Type': 'application/json;charset=utf-8',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin':'*'
}

const requestOptions = {
  headers: new HttpHeaders(headerDict),
};
@Injectable({providedIn: 'root'})
export class GarageService {
  constructor(private httpClient: HttpClient) { }
  URL:string = "https://customersservices.migdal.co.il/api/experts/getgarages"
  getGarage(cityParam:string,area?:string){


    const city:City = {City:cityParam,area:area};
    const body = JSON.stringify(city);
    return this.httpClient.post<cityResponse>(this.URL,body,requestOptions)
        .pipe(map(response => {
          if(area) {
            return response.Data["GaragesList"].filter(item=> item.Area == area || item.city == city.City);
          }
          return response.Data["GaragesList"];
        }));

  }
  getArea(){
    const areaUrl = "https://front.migdal.co.il//experts/api/garageareas"
    return this.httpClient.post<areaResponse>(areaUrl,requestOptions)
    .pipe(map(response => {
         return response.Data;
         console.log(response.Data)
          //else return response.ErrorMsg;
    }));
  }
}
