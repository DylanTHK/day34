import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable, Subject } from "rxjs";
import { Article } from "./model";

const NEWS_URL = "https://newsapi.org/v2/top-headlines"
// FIXME: add key before running
const API_KEY = "ENTER_KEY"

@Injectable()
export class NewsService {

    onNews = new Subject<Article[]>()

    constructor(private http: HttpClient) { }

    // HTTP Request from newsapi.org
    getNewsAsObservable(country: string, category: string): Observable<Article[]> {
        const params = new HttpParams()
            .set('country', country)
            .set('category', category)
            // .set('pageSize', 10)
            .set('apiKey', API_KEY);

        return this.http.get<Article[]>(NEWS_URL, { params }).pipe();
    }

    getNews(country: string, category: string): Promise<Article[]> {
        return firstValueFrom(
            this.getNewsAsObservable(country, category)
        )
        .then((data: any) => {
            console.info(">>> extracted data:", data);
            // convert json to articles
            const articles = data.articles as Article[];
            console.info(">>> extracted articles:", articles);
            return articles;
        })
        .then((data: any) => {
            // firing data to event
            this.onNews.next(data)
            return data; // TODO: returning to avoid error?
        })
    }
}