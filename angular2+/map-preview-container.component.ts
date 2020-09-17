
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { RenderAndPreviewControllerService } from '../../services/render-and-preview-controller.service';
import { MapRendererService } from '../../services/map-renderer.service';
import { ClearDataService } from "../../services/clear-data.service";
import { FiltersService } from "../../services/filters.service";

import { PostOfficeInfo } from 'src/app/interfaces/post-office-info.interface';
import { Day } from '../../interfaces/day.interface';



@Component({
  selector: 'map-preview-container',
  templateUrl: './map-preview-container.component.html',
  styleUrls: ['./map-preview-container.component.sass'],
  animations: [
    trigger('scaleWidth', [

      state('wide', style({
        width: '0px'
      })),
      state('thin', style({
        width: '30%'
      })),
      transition('thin => wide', [
        animate('500ms')
      ]),
      transition('wide => thin', [
        animate('500ms')
      ]),
    ]),
  ]
})

export class MapPreviewContainerComponent implements OnInit {

  public officesData: Array<any> = [];
  public selectedOffice: PostOfficeInfo;
  private selectedOfficeInListID: any;
  private currentDayNumber: number;


  constructor(
    private controller: RenderAndPreviewControllerService,
    private map: MapRendererService,
    private clear: ClearDataService,
    private filter: FiltersService
  ) {

    const d = new Date();
    this.currentDayNumber = d.getDay();


    controller.getFilteredOfficesAndScadulesSubject().asObservable().subscribe(newOffices => {
      if (newOffices) {

        if (newOffices.length === 1) {
          this.selectedOffice = newOffices[0];
        } else {
          this.selectedOffice = null;
        }
        this.officesData = newOffices;

      }
    })



    controller.getSelectedOfficeDataSubject().asObservable().subscribe((newData: { officeChoosenFromList: PostOfficeInfo, officeChoosenOnMap: any, scaledUpMarkerFromList: any, scaledUpMarkerFromMap: any }) => {

      if (newData) {

        if (newData.officeChoosenFromList) {
          this.selectedOffice = newData.officeChoosenFromList;
        }

        if (newData.officeChoosenOnMap) {
          this.selectedOffice = newData.officeChoosenOnMap;
        }

      }
    })


    this.clear.getClearSubject().asObservable().subscribe((whatToClear: { Map: boolean, Dropdown: boolean, previewList: boolean, previewSelected: boolean, clearMapMessage: boolean }) => {
      if (whatToClear) {
        if (whatToClear.previewList) {
          this.officesData = [];
          this.selectedOffice = null;
        }
        if (whatToClear.previewSelected) {
          this.selectedOffice = null;
        }
      }
    })

  }


  ngOnInit() {

  }

  public focusOnOffice(office: PostOfficeInfo): void {
    this.map.FocusAtSpecialOfficeFromList(office);
    this.controller.setOfficeChoosenFromList(office);
  }

  public returnToOfficesList(): void {
    this.selectedOffice = null;
    this.map.deleteScaledUpMarker();
    this.controller.setSelectedOfficeData({ officeChoosenFromList: null, officeChoosenOnMap: null, scaledUpMarkerFromList: null, scaledUpMarkerFromMap: null });
  }

  public getCurrentDayNumber(): number {
    return this.filter.getCurrentDayNumber()
  }

  public isOpenedNow(wF, wT, bF = null, bT = null): boolean {
    return this.filter.isOfficeOpenedNow(wF, wT, bF, bT);
  }

  public isCurrentDayByUserTime(day: Day): boolean {
    return day ? Number.parseInt(day.DAYOFWEEK_NUM) == this.currentDayNumber : false
  }

  public isOpenedNowBySchadule(schadule: Array<any>): boolean {
    return this.filter.isOpenedNowBySchadule(schadule);
  }

  public isBreakTimeNowBySchadule(schadule: Array<any>): boolean {
    return this.filter.isBreakTimeNowBySchadule(schadule);
  }

  public string01ToBoolean(str: string): boolean {
    return Number.parseInt(str.trim()) == 1
  }

}
