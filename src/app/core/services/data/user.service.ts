import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/firestore';
import { UserData } from '@model/auth';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth-types';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USERS_COLLECTION: string = 'users';

  constructor(private readonly firestore: AngularFirestore) {}

  public getData(of: User): Observable<UserData> {
    if (of == null || of.uid == null) throw new Error('uid undefined');
    else
      return this.firestore
        .collection<UserData>(this.USERS_COLLECTION)
        .doc<UserData>(of.uid)
        .valueChanges();
  }

  /** TODO impl pagination
   *
   * @param limit
   * @param startAt
   */
  public getUserData(): Observable<UserData[]> {
    //(startAt?: DocumentSnapshot<User>
    //limit: number = 25, filter?:string/Userdata/email/name/id??
    return this.firestore
      .collection<UserData>(this.USERS_COLLECTION)
      .valueChanges({ idField: 'id' });
  }
}
