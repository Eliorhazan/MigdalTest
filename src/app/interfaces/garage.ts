export interface Garage {
  Name:string,
  Type: string,
  Address: string,
  City: string,
  PhoneNumber: string,
  FaxNumber: string,
  Area: string,
  IsFix: boolean,
  AdditionalDesc:string,
  VehicleModel: string,
  Location: Location
}

interface Location{
  Latitude:number,
  Longitude:number,
  Address:string
}
