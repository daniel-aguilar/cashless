import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { Account } from './auth/account';
import { AuthService } from './auth/auth.service';

describe('AppComponentTest', () => {
  let router: RouterTestingHarness;

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  let spy: jasmine.SpyObj<AuthService>;
  const loginStatus = new BehaviorSubject(false);

  beforeEach(async () => {
    spy = jasmine.createSpyObj('AuthService', ['getLoginStatus', 'getLoggedAccount']);
    spy.getLoginStatus.and.returnValue(loginStatus.asObservable());

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AuthService, useValue: spy },
        provideRouter([{ path: 'banker', component: AppComponent }]),
      ],
    });

    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [MatToolbar],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    router = await RouterTestingHarness.create();
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

  it('Should display players link as banker only', () => {
    setBankerStatus(false);
    expect(component.account.isBanker).toBeFalse();
    expect(getPlayersLink()).toBeNull();

    setBankerStatus(true);
    expect(component.account.isBanker).toBeTrue();
    expect(getPlayersLink()).toBeTruthy();

    function setBankerStatus(isBanker: boolean) {
      spy.getLoggedAccount.and.returnValue({ isBanker } as Account);
      loginStatus.next(true);
      fixture.detectChanges();
    }

    function getPlayersLink(): HTMLAnchorElement {
      return fixture.nativeElement.querySelector('a[title="Manage Players"]');
    }
  });

  it('Should not add margin on banker route', async () => {
    const harness = await loader.getHarness(MatToolbarHarness);
    const toolbar = await harness.host();

    const fs = await toolbar.getCssValue('font-size');
    let mb = '';

    expect(component.addMargin).toBeTrue();
    mb = await getMarginBottomValue();
    expect(mb).toBe(fs);

    await router.navigateByUrl('/banker');
    fixture.detectChanges();
    mb = await getMarginBottomValue();
    expect(component.addMargin).toBeFalse();
    expect(mb).toBe('0px');

    await router.navigateByUrl('/');
    fixture.detectChanges();
    mb = await getMarginBottomValue();
    expect(component.addMargin).toBeTrue();
    expect(mb).toBe(fs);

    function getMarginBottomValue() {
      return toolbar.getCssValue('margin-bottom');
    }
  });
});
