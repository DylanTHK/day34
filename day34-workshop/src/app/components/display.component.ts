import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Weather } from '../model';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy{

  // to hold data from subscription
  weather: Weather[] = [];
  weatherSub!: Subscription;

  constructor(private weatherSvc: WeatherService) { };

  // upon intialise, subscribe to weatherService's Subject
  ngOnInit(): void {
      this.weatherSub = this.weatherSvc.weatherSubject.subscribe(
        // push subscribed data to local weather array
        data => this.weather = data
      );
  }

  // once done, unsubscribe
  ngOnDestroy(): void {
      this.weatherSub.unsubscribe();
  }
}
