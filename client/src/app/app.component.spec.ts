import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';

describe('AppComponentTest', () => {
  let router: Router;
  @Component({})
  class BlankComponent { }

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  let spy: jasmine.SpyObj<AuthService>;
  const loginStatus = new BehaviorSubject(false);

  beforeEach(async () => {
    spy = jasmine.createSpyObj('AuthService', ['getLoginStatus', 'getLoggedAccount']);
    spy.getLoginStatus.and.returnValue(loginStatus.asObservable());

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: AuthService, useValue: spy }],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: BlankComponent },
          { path: 'banker', component: BlankComponent },
        ]),
        MatToolbarModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Should have default values', () => {
    const links = fixture.nativeElement.querySelectorAll('a') as NodeList;

    expect(component.account).toBeUndefined();
    expect(links.length).toBe(0);
    expect(component.addMargin).toBeTrue();
  });

  it('Should display players link', () => {
    spy.getLoggedAccount.and.returnValue({ isBanker: true } as Account);
    loginStatus.next(true);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[title="Manage Players"]');

    expect(component.account.isBanker).toBeTrue();
    expect(link).not.toBeNull();
  });

  it('Should not add margin on banker route', fakeAsync(async () => {
    const harness = await loader.getHarness(MatToolbarHarness);
    const toolbar = await harness.host();

    const fs = await toolbar.getCssValue('font-size');
    let mb = '';

    expect(component.addMargin).toBeTrue();
    mb = await toolbar.getCssValue('margin-bottom');
    expect(mb).toBe(fs);

    router.initialNavigation();
    router.navigateByUrl('/banker');
    tick();
    fixture.detectChanges();
    mb = await toolbar.getCssValue('margin-bottom');
    expect(component.addMargin).toBeFalse();
    expect(mb).toBe('0px');

    router.navigateByUrl('/');
    tick();
    fixture.detectChanges();
    mb = await toolbar.getCssValue('margin-bottom');
    expect(component.addMargin).toBeTrue();
    expect(mb).toBe(fs);
  }));
});
