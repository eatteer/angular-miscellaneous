import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth/auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let anchor: DebugElement;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Create a mock of AuthService with isAuthenticated() method
    authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated',
    ]);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    anchor = fixture.debugElement.query(By.css('a'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login button is visible when the user is not authenticated', waitForAsync(() => {
    authServiceMock.isAuthenticated.and.returnValue(Promise.resolve(false));
    // Run first change detection cycle
    fixture.detectChanges();

    // Calls isAuthenticated() that returns a promise
    component.ngOnInit();

    // Wait for promises to be resolved
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(anchor.nativeElement.textContent).toBe('Login');
      expect(authServiceMock.isAuthenticated).toHaveBeenCalled();
    });
  }));

  it('logout button is visible when the user is authenticated', waitForAsync(() => {
    authServiceMock.isAuthenticated.and.returnValue(Promise.resolve(true));
    // Run first change detection cycle
    fixture.detectChanges();

    // Calls isAuthenticated() that returns a promise
    component.ngOnInit();

    // Wait for promises to be resolved
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(anchor.nativeElement.textContent).toBe('Logout');
      expect(authServiceMock.isAuthenticated).toHaveBeenCalled();
    });
  }));
});
