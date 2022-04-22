import {Component} from '@angular/core'
import { DataService } from './api.data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  url: string = '';
  latlong: Array<string> = '';
  revgeo: string = '';
  weather_data: any = '';
  icon_source: string = '';
  error: boolean = false;
  msgExist: boolean = false;

  constructor(private _Serv: DataService) { }

  getWeatherData(place: string) {
    this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=cf002751564a4c78f5f7ed479f1b9ba3";

    this._Serv.getData(this.url).subscribe(data => {
      // console.log(typeof data);
      this.weather_data = data;
      this.error = false;
      this.msgExist = true;
      this.icon_source = "https://openweathermap.org/img/w/"+this.weather_data.weather[0].icon+".png"
    },
      error => {
        console.log(error);
        this.error = true;
        this.msgExist = true;
      });

      if (this.error) {
        // try user input as GPS coords
        this.error = false;
        this.msgExist = false;
        this.getWeatherDataByGPS(place)
      }

  }
  
  getWeatherDataByGPS(txt: string) {

    this.latlong = txt.split(/[;,]\s*|\s+/)
    this.url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.latlong[0] + "&lon=" +    this.latlong[1] + "&appid=cf002751564a4c78f5f7ed479f1b9ba3";

    this._Serv.getData(this.url).subscribe(data => {
      this.weather_data = data;
      this.error = false;
      this.msgExist = true;
      this.icon_source = "https://openweathermap.org/img/w/"+this.weather_data.weather[0].icon+".png"
    },
      error => {
        console.log(error);
        this.error = true;
      });
  
  }
}
