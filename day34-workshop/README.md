# Day34Workshop - Weather App

## Generate new components
ng g c components/display --flat --skip-tests

## Elements of service
1. inject HttpClient to constructor
2. method to make API call

## Making API Call from open weather
URL = "https://api.openweathermap.org/data/2.5/weather"
appid = {API_KEY}
params: ?q={city name}&appid={API key}
- preparing params
```
const params = new HttpParams()
    .set('q', city)
    .set('appid', API_KEY);
```
- making API call with url and params
```
const response = this.httpClient.get<Weather[]>(URL, {params});
```
- retrieving promise from observable (import firstValueFrom rxjs)
```
firstValueFrom(resopnse)
    // extract weather from json payload
    .then((data:any) => {
        const w = data["weather"] as Weather[]
    })
    // fire Weather[] to subject
    .then(data => {
        this.weatherSubject.next(data);
    })
```

## Subscribing to WeatherService's subject 
- code inside display.component.ts
```
weather:Weather[];
weatherSub: Subscription;
constructor(private weatherSvc: WeatherService) { };

ngOnInit(): void {
    this.weatherSub = this.weatherSvc.weatherSubject.subscribe(
        data => this.weather = data
    );
}

```

## sample API request
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
https://api.openweathermap.org/data/2.5/weather?q=singapore&appid=a09057affb6e66963f18700222170122

Response 
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
    "icon": "04d"
    }
],
"base": "stations",
"main": {
    "temp": 305.71,
    "feels_like": 310.91,
    "temp_min": 303.77,
    "temp_max": 307.12,
    "pressure": 1008,
    "humidity": 58
},
"visibility": 10000,
"wind": {
    "speed": 4.12,
    "deg": 20
},
"clouds": {
    "all": 75
},
"dt": 1679552406,
"sys": {
    "type": 1,
    "id": 9470,
    "country": "SG",
    "sunrise": 1679526477,
    "sunset": 1679570084
},
"timezone": 28800,
"id": 1880252,
"name": "Singapore",
"cod": 200
}
```

## URL for images
https://openweathermap.org/img/wn/{{ icon }}@2x.png