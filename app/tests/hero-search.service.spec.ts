//http://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html
//https://angular.io/docs/ts/latest/testing/
//https://github.com/krimple/angular2-unittest-samples-release/blob/master/src/app/services/blog.service.spec.ts
import { TestBed, async, inject } from '@angular/core/testing';
import {
  BaseRequestOptions,
  HttpModule,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HeroSearchService  } from '../hero-search.service';
import 'rxjs/add/operator/map'
describe('Hero Search Service Tests', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        HeroSearchService,
        {
          provide: Http,
          useFactory: (mockBackend:MockBackend, options:BaseRequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    });
  });

  describe('Search heroes search(string:term)', () => {

    it('should return an Observable<Array<Hero>>',
        async(inject([HeroSearchService, MockBackend], 
                    (heroSearchService:HeroSearchService, mockBackend:MockBackend) => {

        heroSearchService.search("ma").subscribe((heroes) => {
          expect(heroes.length).toBe(2);
          expect(heroes[0].name).toEqual('Magneta');
          expect(heroes[1].name).toEqual('Magma');
        });

        const mockResponse = {
          data: [
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
         ]
        };

        mockBackend.connections.subscribe((connection:any) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

    })));
  });
});