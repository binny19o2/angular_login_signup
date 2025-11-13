import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  user,
  User,
  updateProfile,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  currentUser: User | null = null;

  constructor() {
    // this.user$.subscribe(user => {
    //   this.currentUser = user;
    // });
  }

  // Register new user
  async register(email: string, password: string, fullName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      
      // Update profile with display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: fullName
        });
      }
      
      return userCredential;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      return userCredential;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Logout user
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async forgotPassword(emailId : string){
    try{
      await sendPasswordResetEmail(
        this.auth,
        emailId
      )
    }
    catch(error:any){
      alert(error);
    }
  }

  // Error handler
  private handleError(error: any): string {
    let errorMessage = 'An error occurred';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No user found with this email';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Invalid password';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid email or password';
        break;
      default:
        errorMessage = error.message || 'Authentication failed';
    }
    
    return errorMessage;
  }
}