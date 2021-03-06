import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
    inject,
    async,
    TestBed,
    ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
    BaseRequestOptions,
    ConnectionBackend,
    Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../../app.service';
import { AccountService } from '../account.service';
import { ResetPasswordComponent } from './resetpassword.component';

describe(`Home`, () => {
    let comp: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ResetPasswordComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                AppState,
                AccountService,
            ]
        })
            .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges(); // trigger initial data binding
    });

    it('should have default data', () => {
        expect(comp.localState).toEqual({ value: '' });
    });

    it('should have a title', () => {
        expect(!!comp.title).toEqual(true);
    });

    it('should log ngOnInit', () => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

        comp.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    });

});
