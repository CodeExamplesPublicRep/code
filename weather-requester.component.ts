import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatTable} from '@angular/material';
import { CustomService } from '../custom.service';

//import { Response } from '@angular/http';
/**
 * @title Basic use of `<table mat-table>`
*/

export interface PeriodicElement {
  dateTime: Date;
  city: string;
  temp: number;
  
}




let allWeatherHistory = [ {dateTime: new Date() , city: 'City', temp: 1.79} ];

const ELEMENT_DATA: PeriodicElement[] = allWeatherHistory;


@Component({
  selector: 'weather-requester',
  templateUrl: './weather-requester.component.html',
  styleUrls: ['./weather-requester.component.css'],
  
})
export class WeatherRequesterComponent implements OnInit {

  
  displayedColumns: string[] = ['dateTime', 'city', 'temp' ];
  dataSource = ELEMENT_DATA;
  //private response: Response,
  constructor( private changeDetectorRefs: ChangeDetectorRef, private customService: CustomService ) { }

  ngOnInit() {}

  @ViewChild(MatTable) table: MatTable<any>;

  async tryAddNewWeatherData(City='Kiev'){
    let newWeather = {dateTime: new Date() , city: 'NULL', temp: 0};
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${City}&APPID=cb88417685857867029078f82803`;
    let resp: any = await this.customService.getJSONRequest( url  );
    newWeather = { dateTime:new Date(), city: resp.name, temp: resp.main.temp } ;
    ELEMENT_DATA.push( newWeather );
    this.dataSource = ELEMENT_DATA;
    this.table.renderRows();
    
  }


  
}










