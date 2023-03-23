# Practice34AM

## Documentation
https://openweathermap.org/current

## img format for Icon
https://openweathermap.org/img/wn/10d@4x.png
https://openweathermap.org/img/wn/{{ icon }}@4x.png

## Built-in API request by city name (API Call format)
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}



## Practice #1
1. import forms and httpmodule
2. create form in html
- input
- fromGroup, ngSubmit
- validation (disabled button if empty)

3. add code in ts (app.component.ts)
- oninit (create form)
- getWeather() method
- form builder

4. create service app (weather.service.ts)
- @Injectable()
- link model.ts to this file (do in app.module.ts > providers)
- constructor( private http: HttpClient) { }
- getWeather()

5. create model.ts (from weather[{...}])
- main
- description
- icon



## Sequence #1
1. input city in form
2. trigger submit event (app.component - getWeather())
- calls method in WeatherService
- this.weatherSvc.getCurrentWeather(city)

3. weatherSvc.getCurrentWeather(city:string) called
- calls getWeatherAsObservable (local method)
- getWeatherAsObservable(city:string) -> returns Observable
    - set parameters (city and api key)
    - make api call with HttpClient, url and parameters
- get first value from Observable -> get promise
- apply resolve functions to stream
    - slice 'weather' attribute from json
    - fire data to onWeather Subject

4. Initiate subscription in display-component.ts
```
weather: Weather[] = [];
weatherSub!: Subscription;

ngOnInit(): void {
    // to subscribe to Subject INSIDE WeatherService
    this.weatherSub = this.weatherSvc.onWeather.subscribe(
        // push data INTO local Weather[] array
        data => this.weather = data
    )
}
```

5. display information with updated weather array for display-component.ts
```
<div *ngFor="let w of weather">
    <div>{{ w. }}</div>
</div>
```

## Practice #2 (Broadcasting received data)
1. broadcast data from weather.service.ts to weather-display.ts


## Tips
1. always subscribe to observables (otherwise, no data will be transferred)
2. Binding & Subscription
    - Event / property binding (communication between components)
    - Broadcasting (reserve for Http requests)
3. Do exercises with promise first (Learn observables later)


## Lessons Learnt
1. Module imports
- add HttpClientModule under imports
- add services under providers
2. Service to outsource methods / business logic


## sample response from query
https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=d1972195e49e953b1600e991eff9724a
```
{
"coord": {
"lon": 103.8501,
"lat": 1.2897
},
"weather": [
{
"id": 803,
"main": "Clouds",
"description": "broken clouds",
"icon": "04n"
}
],
"base": "stations",
"main": {
"temp": 301.51,
"feels_like": 305.32,
"temp_min": 301.07,
"temp_max": 302.12,
"pressure": 1007,
"humidity": 75
},
"visibility": 10000,
"wind": {
"speed": 4.63,
"deg": 20
},
"clouds": {
"all": 75
},
"dt": 1679399948,
"sys": {
"type": 1,
"id": 9470,
"country": "SG",
"sunrise": 1679353719,
"sunset": 1679397317
},
"timezone": 28800,
"id": 1880252,
"name": "Singapore",
"cod": 200
}
```