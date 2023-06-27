import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  public user$: Observable<firebase.default.User | null>;
  public isLoggedIn$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afAuth.authState;
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
  }

  async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return result.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async logOut() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
