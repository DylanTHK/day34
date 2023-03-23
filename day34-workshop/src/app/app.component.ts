import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Day34 Workshop - Weather App';

  form!: FormGroup;

  constructor(private fb:FormBuilder, private weatherSvc: WeatherService) { };

  ngOnInit(): void {
      this.form = this.fb.group({
        city: this.fb.control('singapore', [Validators.required])
      });
  }
  // method to call
  getWeather() {
    const city = this.form.get("city")?.value;
    console.info(">>> City Detected: ", city);
    // make call from Service
    this.weatherSvc.getWeatherRequest(city);

  }
}
