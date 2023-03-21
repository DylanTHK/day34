import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Day34AM Weather App';

  weatherForm!: FormGroup;
  
  constructor(private fb:FormBuilder, private weatherSvc: WeatherService) { }

  // initialise form
  ngOnInit(): void {
      this.weatherForm = this.fb.group({
        city: this.fb.control('singapore', [Validators.required])
      })
  }

  getWeather() {
    const city = this.weatherForm.get("city")?.value;
    console.info(">>> getting weather:", city);

    // call getWeather from service
    this.weatherSvc.getCurrentWeather(city);
  }

}
