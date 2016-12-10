import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { ActivityService } from './activity.service';
import { Activity } from './activity.model';

@Component({
  moduleId: module.id,
  selector: 'activities',
  templateUrl: 'activity.component.html',
  styleUrls: [ '../hero-search.component.css' ],
  providers: [ActivityService]
})

export class ActivityComponent implements OnInit {
  activities: Activity[];
  constructor(
    private activityService: ActivityService,
    private router: Router) {}

  loadActivities(){
        this.activityService.getActivities()
                           .subscribe(
                               activities => 
                               {
                                  this.activities = activities;     
                               }, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
  }

  ngOnInit(): void {
    this.loadActivities();
  }
  
  gotoDetail(activity: Activity): void {
    let link = ['/detail', activity.id];
    this.router.navigate(link);
  }
}