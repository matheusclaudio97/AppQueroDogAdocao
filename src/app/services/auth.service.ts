import { User } from './../interfaces/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }


  login(user: User){
    return this.afa.signInWithEmailAndPassword(user.email, user.password);


  }
  cadastro(user: User){
    return this.afa.createUserWithEmailAndPassword(user.email, user.password);
    
  }
  logout(){
    return this.afa.signOut();

    
  }

  getAuth(){
    return this.afa;

    
  }
}
