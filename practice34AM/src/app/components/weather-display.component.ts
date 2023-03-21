import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from '../model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent implements OnInit, OnDestroy {


  weather: Weather[] = [];

  // temp variable to subscribe to WeatherService > onWeather
  weatherSub!: Subscription;

  constructor(private weatherSvc: WeatherService) { }

  ngOnInit(): void {
      console.info(">>> Subscribing to weatherSvc");
      this.weatherSub = this.weatherSvc.onWeather.subscribe(
        // pushes data to weather array
        data => this.weather = data
      );
  }

  ngOnDestroy(): void {
      this.weatherSub.unsubscribe();
  }
}
