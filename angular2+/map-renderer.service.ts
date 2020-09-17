import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ApiRequestService } from '../services/api-request.service';
import { DisplayMessageToUserService } from '../services/display-to-user-message.service';

import { PostOfficeInfo } from '../interfaces/post-office-info.interface'
import { MatchCities } from '../interfaces/match-cities.interface'



@Injectable({
  providedIn: 'root'
})
export class MapRendererService {

  private drawOnMapSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  private focusMapOn: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private focusMapByManyPoints: BehaviorSubject<Array<[number, number]>> = new BehaviorSubject<Array<[number, number]>>(null);
  private isShowError: BehaviorSubject<{ isDisplay: boolean, messageText: string }> = new BehaviorSubject<{ isDisplay: boolean, messageText: string }>(null);
  private clearMapSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private focusAtSpecialOfficeFromListSubject: BehaviorSubject<PostOfficeInfo> = new BehaviorSubject<PostOfficeInfo>(null);
  private deleteScaledUpMarkerSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private hidePreviewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);



  constructor(
    private API: ApiRequestService,
    private displayMessage: DisplayMessageToUserService,
  ) {
    this.displayMessage.getDisplayMessageOnMapSubject().asObservable().subscribe((newEvent: { isDisplay: boolean, messageText: string }) => {
      if (newEvent) {
        this.showError(newEvent.isDisplay, newEvent.messageText);
      }
    });



  }


  public getHidePreviewSubject(): BehaviorSubject<boolean> {
    return this.hidePreviewSubject;
  }

  public hidePreview(): void {
    this.hidePreviewSubject.next(true);
  }

  public getDrawOfficesSubject(): BehaviorSubject<Array<any>> {
    return this.drawOnMapSubject;
  }

  public drawOfficesOnMap(officesArray: Array<any>): void {
    this.drawOnMapSubject.next(officesArray)
  }

  public focusMapOnPoint(point: [number, number], zoom: number): void {
    this.focusMapOn.next({ point: [-(- point[0]), -(- point[1])], zoom: zoom })
  }

  public getFocusMapOnPointSubject(): BehaviorSubject<any> {
    return this.focusMapOn;
  }

  public focusMapCenterAtMiddleOfManyPoints(pointsArray: Array<[number, number]>): void {
    let convertedToNumber: Array<[number, number]>;

    convertedToNumber = pointsArray.map(point => {
      return [-(- point[0]), -(- point[1])]
    })

    this.focusMapByManyPoints.next(convertedToNumber)
  }

  public getFocusMapCenterAtMiddleOfManyPointsSubject(): BehaviorSubject<Array<[number, number]>> {
    return this.focusMapByManyPoints;
  }

  public createPointsArrayFromOfficesArray(offices: Array<PostOfficeInfo>): Array<[number, number]> {
    let points: Array<[number, number]> = offices.map((office: PostOfficeInfo) => {
      return [-(-office.LATTITUDE), -(-office.LONGITUDE)]
    })

    return points;
  }

  public showError(toShow: boolean, message: string = ''): void {
    this.isShowError.next({ isDisplay: toShow, messageText: message });
  }

  public getShowErrorSubject(): BehaviorSubject<{ isDisplay: boolean, messageText: string }> {
    return this.isShowError;
  }

  public getClearMapSubject(): BehaviorSubject<boolean> {
    return this.clearMapSubject;
  }

  public clearMap(): void {
    this.clearMapSubject.next(true);
  }


  public getFocusAtSpecialOfficeFromListSubject(): BehaviorSubject<PostOfficeInfo> {
    return this.focusAtSpecialOfficeFromListSubject;
  }

  public FocusAtSpecialOfficeFromList(officeToFocus: PostOfficeInfo): void {
    this.focusAtSpecialOfficeFromListSubject.next(officeToFocus)
  }

  public getDeleteScaledUpMarkerSubject(): void {
    return this.deleteScaledUpMarkerSubject;
  }

  public deleteScaledUpMarker(isDelete: boolean = true): void {
    this.deleteScaledUpMarkerSubject.next(isDelete)
  }

}
