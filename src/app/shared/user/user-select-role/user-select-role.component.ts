import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { UserData } from '@model/auth';
import { USER_SELECT_ROLES_DATA } from './token';

@Component({
  selector: 'app-user-select-role',
  templateUrl: './user-select-role.component.html',
  styleUrls: ['./user-select-role.component.scss'],
})
export class UserSelectRoleComponent {
  @Input()
  public user: UserData;

  @Output()
  public readonly selectedRole: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(USER_SELECT_ROLES_DATA) public readonly roles: any[]) {}

  public onSelectionChange(object: string, role: any) {
    this.user.permissions[object] = role;
    this.selectedRole.emit(this.user);
  }
}
