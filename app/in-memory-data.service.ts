import { Injectable }     from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    let activities = [
      {id: 11, name: 'Programming', desc:'Select this when Programming'},
      {id: 12, name: 'Analysis', desc:'Select this when Analysing'},
      {id: 13, name: 'Testing', desc:'Select this when Testing'},
      {id: 14, name: 'Deploying', desc:'Select this when Deploying'}
    ];
    return {heroes, activities};
  }
}
