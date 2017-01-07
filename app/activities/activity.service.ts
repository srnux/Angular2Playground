import { Injectable }     from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Activity } from './activity.model';

@Injectable()
export class ActivityService {
    private activitiesUrl = 'app/activities';
    constructor(private http: Http) {}
    
    getActivities(): Observable<Activity[]>{
        return this.http
                .get(this.activitiesUrl)
                .map((r: Response) => r.json().data as Activity[] );
    }

    getHero(id: number): Promise<Activity> {
        return this.getActivities()
             .toPromise().then(heroes => 
                heroes.find(hero => hero.id === id));
    }

    private headers = new Headers({'Content-Type': 'application/json'});

    update(hero: Activity): Promise<Activity> {
        const url = `${this.activitiesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Activity> {
        return this.http
            .post(
                this.activitiesUrl, 
                JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.activitiesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
