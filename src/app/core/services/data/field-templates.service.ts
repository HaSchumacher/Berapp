import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '@model';
import { FieldTemplate } from '@model/fieldTemplate';
import { Observable, combineLatest } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { UserService } from '.';
import { divide, flatten } from '@utilities';
import { environment } from '@environment';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class FieldTemplatesService {
  private readonly FIELDTEMPLATES: string = 'fieldTemplates';
  
  constructor(
    private readonly firestore: AngularFirestore,
    private readonly userService: UserService
  ) {}

  public getFields(of: User): Observable<FieldTemplate[]> {
    if (of == null || of.data == null || of.data.fields == null)
      throw new Error(`No permissions in ${of}`);
    return combineLatest(
      divide(
        of.data.fields,
        environment.firebase.firestore.whereQuery_IN_maxArrayLength
      ).map((chunk) =>
        this.firestore
          .collection<FieldTemplate>(this.FIELDTEMPLATES, (ref) =>
            ref.where('__name__', 'in', chunk)
          )
          .valueChanges()
          .pipe(shareReplay(1))
      )
    ).pipe(map(flatten));
  }

  public addTemplate(template: FieldTemplate, of: User) {
    if (
      template == null ||
      template.fieldRegion == null ||
      template.name == null ||
      of.data == null ||
      of == null ||
      of.data.fields == null
    )
      throw new Error('Given Arguments must not be nullable!');

    this.firestore.firestore.runTransaction(async (ref) => {
      //**set Template and get id?
      const newdoc = this.firestore.collection(this.FIELDTEMPLATES).doc();
      const userref = this.firestore
        .collection(this.userService.USERS_COLLECTION)
        .doc(of.data.id).ref;
      /**update user object fields array
       * update only partianal
       */
      userref.update({
        fields: firebase.default.firestore.FieldValue.arrayUnion(newdoc.ref.id),
      });
      ref.set(newdoc.ref, template);
    });
  }
}
