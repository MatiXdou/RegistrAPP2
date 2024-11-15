import { inject, Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { User } from '../models/User.models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  createUser(uid: string, userData: User) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return setDoc(userDocRef, userData);
  }

  async getUser(uid: string) {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : null;
  }
}
