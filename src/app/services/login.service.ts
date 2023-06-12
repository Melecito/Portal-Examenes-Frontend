import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http:HttpClient) { }


  //generar token
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/actual-usuario`);
  }

 

  //Iniciamos sesion y establesamos en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }
  //cerrar sesion y eliminar token
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtener token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }
  

  public getUser(){
    let userStr = localStorage.getItem('user');
    if (userStr  != null) {
      return JSON.parse(userStr);      
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRol(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

 

 
}
