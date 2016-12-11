import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
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
}
