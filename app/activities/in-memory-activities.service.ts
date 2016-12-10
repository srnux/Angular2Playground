import { Injectable }     from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryActivityService implements InMemoryDbService {
  createDb() {
    let activities = [
      {id: 11, name: 'Programming', desc:'Select this when Programming'},
      {id: 12, name: 'Analysis', desc:'Select this when Analysing'},
      {id: 13, name: 'Testing', desc:'Select this when Testing'},
      {id: 14, name: 'Deploying', desc:'Select this when Deploying'}
    ];
    return {activities};
  }
}
