import { Component, NgModule } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

/*@Component({
    template:''
})*/

@NgModule({
    declarations: [MockLoginComponent],
    exports:      [MockLoginComponent]
})

class MockLoginComponent { }
class MockModule { }

describe('AppComponentWithRoutes', function () {
        let de: DebugElement;
        let comp: AppComponent;
        let fixture: ComponentFixture<AppComponent>;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ AppComponent ],
                providers: [ ],
                imports: [
                    //MockModule,
                    RouterTestingModule.withRoutes([
                        {
                            path: 'heroes',
                            component: MockLoginComponent
                        }
                    ]),
                ]
            })
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AppComponent);
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