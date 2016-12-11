import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }     from '../app-routing.module';

import '../rxjs-extensions';

// todo: replace with server api - Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryActivityService }  from './in-memory-activities.service';
import { InMemoryDataService }  from '../in-memory-data.service';

import { ActivityComponent }          from './activity.component';
import { ActivityService }          from './activity.service';
import { PopupDirective} from '../directives/popup.directive'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    ActivityComponent,
    PopupDirective

  ],
  providers: [ ActivityService ],
  exports:[
    ActivityComponent
  ],
})

export class ActivityModule { }
