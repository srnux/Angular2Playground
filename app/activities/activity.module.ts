import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }     from '../app-routing.module';

import '../rxjs-extensions';

// todo: replace with server api - Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryActivityService }  from './in-memory-activities.service';
//import { InMemoryActivityService }  from '../in-memory-data.service';

import { ActivityComponent }          from './activity.component';
import { ActivityService }          from './activity.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryActivityService),
    AppRoutingModule
  ],
  declarations: [
    ActivityComponent
  ],
  providers: [ ActivityService ],
  exports:[
    ActivityComponent
  ],
})

export class ActivityModule { }
