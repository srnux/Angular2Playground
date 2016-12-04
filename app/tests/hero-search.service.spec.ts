
import {
  TestBed,
  getTestBed,
  async,
  inject
} from '@angular/core/testing';
import {
  Headers, BaseRequestOptions,
  Response, HttpModule, Http, XHRBackend, RequestMethod
} from '@angular/http';

import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

import 'rxjs/add/operator/map'

import { HeroSearchService } from '../hero-search.service';
import { Hero }           from '../hero';

describe('Hero search service', function () {
    let mockedService: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        providers: [
            HeroSearchService,
            MockBackend,
            BaseRequestOptions,
            {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory:
                (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                return new Http(backend, defaultOptions);
                }
        }
        ],
        imports: [
            HttpModule
        ]
        });
        
        mockedService = getTestBed().get(MockBackend);
    
    }));

    it('should get Heroes async',
    async(inject([HeroSearchService], (heroService) => {
      mockedService.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    id: 26,
                    contentRendered: '<p><b>Hi there</b></p>',
                    contentMarkdown: '*Hi there*'
                  }]
              }
            )));
        });

        heroService.search("ma").subscribe(
            ( data) => {
            expect(data.length).toBe(1);
            expect(data[0].id).toBe(26);
            expect(data[0].contentMarkdown).toBe('*Hi there*');
        });
    }))
    
    );

});