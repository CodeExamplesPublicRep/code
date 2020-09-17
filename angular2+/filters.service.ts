import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostOfficeInfo } from '../interfaces/post-office-info.interface';
import { DisplayMessageToUserService } from '../services/display-to-user-message.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  private changedFieldsStates: { [key: string]: boolean | null; } = {};
  private fieldsChangedSubj: BehaviorSubject<{ [key: string]: boolean | null; }> = new BehaviorSubject<{ [key: string]: boolean | null; }>(null)
  private clearedFilters: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private displayMessages: DisplayMessageToUserService,
  ) { }

  public getSubjectFiltersAfterChange(): BehaviorSubject<{ [key: string]: boolean | null; }> {
    return this.fieldsChangedSubj;
  }

  public setFilterState(filterName: string, newState: boolean | null): void {
    if (filterName) {
      this.changedFieldsStates[filterName] = newState;
      this.emitFieldsToSubscribers()
    }
  }

  public emitFieldsToSubscribers(): void {
    this.fieldsChangedSubj.next(Object.assign({}, this.changedFieldsStates))
  }

  public clearFilter(filterName: string): void {
    this.clearedFilters.next(filterName);
  }

  public getClearedFilterSubject(): BehaviorSubject<string> {
    return this.clearedFilters;
  }


  public filterOfficesByEnabledFilters(officesArray: Array<PostOfficeInfo>): Array<PostOfficeInfo> {
    if (officesArray && officesArray.length) {

      let filtersNamesToApply = Object.keys(this.changedFieldsStates).filter(key => {
        return this.changedFieldsStates[key] == true;
      })

      let convertingProjectionTempObject = {};
      let convertedFieldsNames;

      filtersNamesToApply.forEach(filterName => {
        let eqvivalentKeyInObjectArray: Array<string> = this.convertFilterNameToOfficeKeyNamesArray(filterName);
        eqvivalentKeyInObjectArray.forEach(key => {
          if (key != '')
            convertingProjectionTempObject[key] = ''
        })
      })

      convertedFieldsNames = Object.keys(convertingProjectionTempObject);


      let officesThatLeftAfterFilter = officesArray;

      convertedFieldsNames.forEach(filterName => {

        let startOfficesList: Array<PostOfficeInfo> = officesThatLeftAfterFilter;

        if (filterName != '') {
          startOfficesList = this.filterOfficesByfiltersKeyWithValue(startOfficesList, filterName, true)
          startOfficesList = this.filterOfficesByTimeFilters(startOfficesList, filterName);
        }

        officesThatLeftAfterFilter = startOfficesList;

        if (!officesThatLeftAfterFilter || officesThatLeftAfterFilter.length === 0)
          return []
      })

      return officesThatLeftAfterFilter;
    } else {
      return []
    }

  }

  public isInSchadulePresentDaysOff(schadule: Array<any>, needBoth: boolean = false): boolean {

    if (schadule && schadule.length) {
      let daysOff = schadule.filter((day: any) => {
        return (day.DAYOFWEEK_NUM == 6 || day.DAYOFWEEK_NUM == 7)
      })
      return !!(daysOff.length)
    } else {
      return false;
    }
  }

  public filterOfficesByTimeFilters(officesArray: Array<PostOfficeInfo>, key: string): Array<PostOfficeInfo> {

    if (officesArray && officesArray.length) {

      let resultOffices: Array<PostOfficeInfo> = [];

      resultOffices = officesArray.filter((office: any) => {

        switch (key) {
          case "openedAtDaysOff":
            return this.isInSchadulePresentDaysOff(office.schedule, false);
            break;
          case "nowOpened":
            return this.isOpenedNowBySchadule(office.schedule);
            break;
          case "openedAfter19hours":
            return this.isOpenedAfter19TodayBySchadule(office.schedule);
            break;
          default:
            return officesArray;
            break;
        }
      })
      return resultOffices;


    } else {
      return [];
    }

  }



  public isOpenedAfter19TodayBySchadule(schadule: Array<any>): boolean {
    if (schadule && schadule.length) {

      var d = new Date();
      var n = d.getDay();

      let currentDay: any = schadule.filter(day => {
        return (-(-day.DAYOFWEEK_NUM) == n);
      });
      if (!currentDay || currentDay.length == 0)
        return false;

      let to: string = currentDay[0]['TTO'].split(':');
      if (-(-to[0]) < 19)
        return false;
      if (-(-to[0]) >= 20)
        return true;
      if (-(-to[1]) > 0)
        return true;

      return false;
    } else {
      return false;
    }
  }



  public isOpenedNowBySchadule(schadule: Array<any>): boolean {

    if (schadule && schadule.length) {

      var d = new Date();
      var n = d.getDay();
      var h = d.getHours();
      var m = d.getMinutes();

      let currentDay: any = schadule.filter(day => {
        return (-(-day.DAYOFWEEK_NUM) == n);
      });

      if (!currentDay || currentDay.length == 0)
        return false;

      let from: string = currentDay[0]['TFROM'].split(':');
      let to: string = currentDay[0]['TTO'].split(':');

      if (-(- from[0]) > h || -(- to[0]) < h)
        return false;

      if (-(- from[0]) == h && -(- from[1]) > m || -(- to[0]) == h && -(- to[1]) < m)
        return false;

      if (currentDay[0]['BREAKTFROM'] && currentDay[0]['BREAKTTO']) {
        let breakFrom: string = currentDay[0]['BREAKTFROM'].split(':');
        let breakTo: string = currentDay[0]['BREAKTTO'].split(':');

        if (-(- breakFrom[0]) < h && -(- breakTo[0]) > h)
          return false;

        if (-(- breakFrom[0]) == h && -(- breakFrom[1]) < m || -(- breakTo[0]) == h && -(- breakTo[1]) > m)
          return false;

      }
      return true;
    }
    return false;
  }

  public isBreakTimeNowBySchadule(schadule: Array<any>): boolean {

    if (schadule && schadule.length) {

      var d = new Date();
      var n = d.getDay();
      var h = d.getHours();
      var m = d.getMinutes();

      let currentDay: any = schadule.filter(day => {
        return (-(-day.DAYOFWEEK_NUM) == n);
      });

      if (!currentDay || currentDay.length == 0)
        return false;

      if (currentDay[0]['BREAKTFROM'] && (typeof currentDay[0]['BREAKTFROM'] == 'string') && currentDay[0]['BREAKTFROM'].length > 4 && currentDay[0]['BREAKTTO'] && (typeof currentDay[0]['BREAKTTO'] == 'string') && currentDay[0]['BREAKTTO'].length > 4) { // if both defined
        let breakFrom: Array<string> = currentDay[0]['BREAKTFROM'].split(':');
        let breakTo: Array<string> = currentDay[0]['BREAKTTO'].split(':');

        if (-(- breakFrom[0]) <= h && -(- breakTo[0]) > h)
          return true;

        if (-(- breakFrom[0]) == h && -(- breakFrom[1]) <= m || -(- breakTo[0]) == h && -(- breakTo[1]) >= m)
          return true;

        return false;
      } else {

        return false;
      }
    }
    return false;
  }

  public filterOfficesByfiltersKeyWithValue(officesArray: Array<PostOfficeInfo>, key: string, expectedValue: boolean): Array<PostOfficeInfo> {
    if (key == 'nowOpened' || key == 'openedAfter19hours' || key == 'openedAtDaysOff')
      return officesArray;

    let filtered: Array<PostOfficeInfo> = [];

    if (officesArray && key && expectedValue == true) {

      filtered = officesArray.filter(office => {
        return (office[key] == '1');

      })

      return filtered;
    } else {
      return officesArray;
    }

  }


  public getCurrentDayNumber(): number {
    var d = new Date();
    var n = d.getDay();
    return n;
  }

  public getCurrentMinutes(): number {
    var d = new Date();
    var m = d.getMinutes();
    return m;
  }

  public getCurrentHours(): number {
    var d = new Date();
    var h = d.getHours();
    return h;
  }

  public isOfficeOpenedNow(workFrom, workTo, breakFrom = null, breakTO = null): boolean {

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();

    if (h < -(-workFrom) || h > -(-workTo))
      return false;

    return true;
  }


  public convertFilterNameToOfficeKeyNamesArray(checkboxFilterName: string): Array<string> {

    switch (checkboxFilterName) {
      case 'cardPayment':
        return ['POSTTERMINAL'];
        break;
      case 'cashRecievingFromCard':
        return ['IS_CASH'];
        break;
      case 'businessPriority':
        return [''];
        break;
      case 'expressDeliveryDHL':
        return ['IS_DHL'];
        break;
      case 'hurryPaymentTransfer':
        return ['PELPEREKAZY'];
        break;
      case 'EX':
        return ['IS_AUTOMATED'];
        break;
      case 'openedAfter19hours':
        return ['openedAfter19hours'];
        break;
      case 'openedAtDaysOff':
        return ['openedAtDaysOff'];
        break;
      case 'paymentTransferInForeignCurrency':
        return [''];
        break;
      case 'BOX':
        return ['IS_AUTOMATED', 'IS_BOX'];
        break;
      case 'nowOpened':
        return ['nowOpened'];
        break;
      case 'shippedOffAtSameDay':
        return ['IS_FLAGMAN'];
        break;
      case 'communalPayments':
        return ['']
        break;
      case 'preorderOnline':
        return ['IS_AUTOMATED']
        break;
      case 'interationalDelivery':
        return ['']
        break;
      case 'onlineShopping':
        return ['']
        break;
      default:
        return [''];
        break;
    }


  }






}
