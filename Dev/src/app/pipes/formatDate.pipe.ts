import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'formatDate'})

export class FormatDatePipe implements PipeTransform {
  transform(date: string): string {
    let formatedDate = '';
    const partOne = date.split('(')[1];
    const partTwo = Number(partOne.split('-')[0]);
    const fullDate = new Date(partTwo);
    const year = fullDate.getFullYear().toString();
    const month = fullDate.getMonth() + 1;
    let monthString = '';
    if (month < 10) {
        monthString = `0${month.toString()}`;
    } else {
        monthString = month.toString();
    }
    const day = fullDate.getDate();
    let dayString = '';
    if (day < 10) {
        dayString = `0${day.toString()}`;
    } else {
        dayString = day.toString();
    }
    const hours = fullDate.getHours();
    let hoursString = '';
    if (hours < 10) {
        hoursString = `0${hours.toString()}`;
    } else {
        hoursString = hours.toString();
    }
    const minutes = fullDate.getMinutes();
    let minutesString = '';
    if (minutes < 10) {
        minutesString = `0${minutes.toString()}`;
    } else {
        minutesString = minutes.toString();
    }
    formatedDate = year + '/' + monthString + '/' + dayString + ' ' + hoursString + ':' + minutesString;
    return formatedDate;
  }
}
