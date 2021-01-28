import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectRoleComponent } from './user-select-role.component';

describe('UserSelectRoleComponent', () => {
  let component: UserSelectRoleComponent;
  let fixture: ComponentFixture<UserSelectRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
