import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModel, UserRegister } from '../../model/user.model';
import { UserService } from '../../service/user';
import { Router, RouterState } from '@angular/router';

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
  
  onRegister(){
    this.userService.registerUser(this.registerObj).subscribe((res:UserRegister)=>{
      alert("User Registeration Success")
    },error=>{
      alert(error.error);
    })
  }
  
  onLogin(){
    this.userService.onLogin(this.loginObj).subscribe((res:UserRegister)=>{
      alert("User Found");
      this.router.navigate(['/dashboard']);
    },error=>{
      alert("invalid username or password");
    })
  }
}


