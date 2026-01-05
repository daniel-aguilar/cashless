import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { App } from './app';
import { Account } from './auth/account';
import { Auth } from './auth/auth';

describe('App', () => {
  let router: RouterTestingHarness;

  let component: App;
  let fixture: ComponentFixture<App>;
  let loader: HarnessLoader;

  let spy: Pick<Auth, 'getLoggedAccount' | 'getLoginStatus'>;
  const loginStatus = new BehaviorSubject(false);

  beforeEach(async () => {
    spy = {
      getLoginStatus: vi.fn().mockReturnValue(loginStatus.asObservable()),
      getLoggedAccount: vi.fn()
    };

    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: Auth, useValue: spy },
        provideRouter([{ path: 'banker', component: App }]),
      ],
    });

    TestBed.overrideComponent(App, {
      set: {
        imports: [MatToolbar],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    router = await RouterTestingHarness.create();
    fixture = TestBed.createComponent(App);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should have default values', () => {
    const links = fixture.nativeElement.querySelectorAll('a') as NodeList;

    expect(component.account).toBeUndefined();
    expect(links.length).toBe(0);
    expect(component.addMargin).toBe(true);
  });

  // eslint-disable-next-line @stylistic/ts/quotes
  it("Should display 'manage players' link as banker only", () => {
    setBankerStatus(false);
    expect(component.account.isBanker).toBe(false);
    expect(link()).toBeNull();

    setBankerStatus(true);
    expect(component.account.isBanker).toBe(true);
    expect(link()).toBeTruthy();

    function setBankerStatus(isBanker: boolean) {
      vi.mocked(spy.getLoggedAccount).mockReturnValue({ isBanker } as Account);
      loginStatus.next(true);
      fixture.detectChanges();
    }

    function link(): HTMLAnchorElement {
      return fixture.nativeElement.querySelector('a[title="Manage Players"]');
    }
  });

  it('Should not add margin on banker route', async () => {
    const harness = await loader.getHarness(MatToolbarHarness);
    const toolbar = await harness.host();
    const className = 'add-bottom-margin';

    expect(component.addMargin).toBe(true);
    expect(await toolbar.hasClass(className)).toBe(true);

    await router.navigateByUrl('/banker');
    fixture.detectChanges();
    expect(component.addMargin).toBe(false);
    expect(await toolbar.hasClass(className)).toBe(false);

    await router.navigateByUrl('/');
    fixture.detectChanges();
    expect(component.addMargin).toBe(true);
    expect(await toolbar.hasClass(className)).toBe(true);
  });
});
