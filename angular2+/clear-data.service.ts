import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClearObject } from '../interfaces/clear-object.interface'


@Injectable({
  providedIn: 'root'
})
export class ClearDataService {
  private clearSubject: BehaviorSubject<ClearObject> = new BehaviorSubject<ClearObject>(null)

  constructor() { }

  public getClearSubject(): BehaviorSubject<ClearObject> {
    return this.clearSubject;
  }

  public emitCreatedClearObjectFromArgs(Map: boolean = false, Dropdown: boolean = false, previewList: boolean = false, previewSelected: boolean = false, clearMapMessage: boolean = false): void {
    this.clearSubject.next({ Map: Map, Dropdown: Dropdown, previewList: previewList, previewSelected: previewSelected, clearMapMessage: clearMapMessage });
  }

  public emitClearObject(obj: ClearObject): void {
    this.clearSubject.next(obj);
  }

  public emitClearObjectOptional(obj: { Map?: boolean, Dropdown?: boolean, previewList?: boolean, previewSelected?: boolean, clearMapMessage?: boolean }): void {
    var def = { Map: false, Dropdown: false, previewList: false, previewSelected: false, clearMapMessage: false };
    if (obj.Map !== undefined) {
      def.Map = obj.Map;
    }
    if (obj.Dropdown !== undefined) {
      def.Dropdown = obj.Dropdown;
    }
    if (obj.previewList !== undefined) {
      def.previewList = obj.previewList;
    }
    if (obj.previewSelected !== undefined) {
      def.previewSelected = obj.previewSelected;
    }
    if (obj.clearMapMessage !== undefined) {
      def.clearMapMessage = obj.clearMapMessage;
    }

    this.clearSubject.next(def);
  }


}
