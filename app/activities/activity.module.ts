import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }     from '../app-routing.module';

import '../rxjs-extensions';

// todo: replace with server api - Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryActivityService }  from './in-memory-activities.service';
import { InMemoryDataService }  from '../in-memory-data.service';

import 'hammerjs';
import { MaterialModule } from '@angular/material';

import { ActivityComponent }          from './activity.component';
import { ActivityService }          from './activity.service';
// import { PopupDirective} from '../directives/popup.directive'
import { ActivityFormComponent } from './activity-form.component';

import {Drag} from "../directives/drag.directive";
import {Drop} from "../directives/drop.directive";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    MaterialModule.forRoot(),
  ],
  declarations: [
    ActivityComponent,
    ActivityFormComponent,
    Drag,
    Drop
  ],
  providers: [ ActivityService ],
  exports:[
    ActivityComponent
  ],
})

export class ActivityModule { }
