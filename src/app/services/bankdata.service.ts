import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankdataService {
  useremail: any = '';
  userbank: any = '';
  userprofile: any = {};
  collectionInstance = collection(this.firestore, 'anfirestore');
  constructor(private http: HttpClient, private firestore: Firestore) {}

  addFirestore(data: any) {
    addDoc(this.collectionInstance, data)
      .then(() => {
        console.log('Added');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  fetchData(email: any): Observable<any[]> {
    const queryByEmail = query(
      this.collectionInstance,
      where('email', '==', email)
    );
    return collectionData(queryByEmail, { idField: 'id' });
  }
  updateData(id: any, data: any) {
    const docInstance = doc(this.firestore, 'anfirestore', id);
    updateDoc(docInstance, data)
      .then(() => {
        console.log('Updated');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteDoc(id: string) {
    const docInstance = doc(this.firestore, 'anfirestore', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Deleted');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  checkdata(): Observable<any> {
    console.log(this.userbank);
    return this.http.get(
      'https://angular-project-blue.vercel.app/mean/checkdata/' + this.userbank
    );
  }
}
