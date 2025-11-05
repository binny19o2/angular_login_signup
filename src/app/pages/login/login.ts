import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModel, UserRegister } from '../../model/user.model';
import { UserService } from '../../service/user';
import { Router, RouterState } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  isSignupMode = false;
  registerObj: UserRegister = new UserRegister();
  loginObj: LoginModel = new LoginModel();
  userService = inject(UserService);
  router = inject(Router);
  private authService = inject(AuthService);
  //  registerObj = {
  //   fullName: '',
  //   email: '',
  //   password: ''
  // };
  
  // Login form data
  // loginObj = {
  //   email: '',
  //   password: ''
  // };
  async onRegister(){
    // this.userService.registerUser(this.registerObj).subscribe((res:UserRegister)=>{
    //   alert("User Registeration Success")
    // },error=>{
    //   alert(error.error);
    // })
    if (!this.registerObj.fullName || !this.registerObj.emailId || !this.registerObj.password) {
      alert('Please fill in all fields');
      return;
    }
    
    // this.isLoading = true;
    
    try {
      await this.authService.register(
        this.registerObj.emailId,
        this.registerObj.password,
        this.registerObj.fullName
      );
      
      alert('Registration successful! You can now sign in.');
      this.isSignupMode = false;
      
      // Clear form
      this.registerObj = {
        userId: 0,
        fullName: '',
        emailId: '',
        password: ''
      };
    } catch (error) {
      alert(error);
    } finally {
      // this.isLoading = false;
    }
    
  }
  
  async onLogin(){
    // this.userService.onLogin(this.loginObj).subscribe((res:any)=>{
    //   alert("User Found");
    //   localStorage.setItem('logData',JSON.stringify(res.data));
    //   this.router.navigate(['/dashboard']);
    // },error=>{
    //   alert("invalid username or password");
    // })
     if (!this.loginObj.emailId || !this.loginObj.password) {
      alert('Please fill in all fields');
      return;
    }
    
    // this.isLoading = true;
    
    try {
      await this.authService.login(
        this.loginObj.emailId,
        this.loginObj.password
      );
      
      alert('Login successful!');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      alert(error);
    } finally {
      // this.isLoading = false;
    }
  }

  
}


