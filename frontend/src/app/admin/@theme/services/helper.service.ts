import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {}

  // the time inserted as : 02:14:30
  public static timeToMillisecond(time) {
    var timeParts = time.split(":");
    let result = (+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000) + (+timeParts[2] * 1000);
    return result;
  }


  // Convert Seconds To Time In Hours:Minutes:Seconds
  public static convertSecondsToHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours:any   = Math.floor(sec / 3600); // get hours
    let minutes:any = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds:any = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
  }


  // Convert millisecond To Time
  public static millisecondToTime(duration: number) {
    let milliseconds = Number((duration % 1000) / 100);
    let seconds: any = Math.floor((duration / 1000) % 60);
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60);
    let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }





}
