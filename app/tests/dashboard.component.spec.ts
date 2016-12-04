import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


import { Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from '../dashboard.component';
import { HeroSearchComponent } from '../hero-search.component'

import { HeroSearchService } from '../hero-search.service';

@NgModule({
    declarations: [DashboardComponentModule],
    exports:      [DashboardComponentModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

class DashboardComponentModule { }
class MockHeroSearchService { }

describe('DashboardComponent', function () {
        let de: DebugElement;
        let comp: DashboardComponent;
        let fixture: ComponentFixture<DashboardComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ HeroSearchComponent, DashboardComponent ],
                providers: [HeroSearchService],
                imports: [
                    RouterTestingModule.withRoutes([
                        {
                            path: 'heroes',
                            component: DashboardComponentModule
                        }
                    ]),

                ]
            })
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DashboardComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement.query(By.css('h1'));
        });

        it('should create component', () => expect(comp).toBeDefined() );

        it('should have expected <h1> text', () => {
            fixture.detectChanges();
            const h1 = de.nativeElement;
            expect(h1.innerText).toMatch('Tour of Heroes');
        });
});