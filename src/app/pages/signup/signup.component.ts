import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user ={
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  }

  constructor(private userService:UserService,private snack:MatSnackBar){}

  ngOnInit():void {

  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open("El nombre de usuario es requerido !!","Aceptar",{
        duration : 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      
      return;
    }

    this.userService.registrarUsuario(this.user).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire('Usuario registrado',`El usuario ${this.user.nombre} ha sido registrado con exito`,`success`);
      },(error)=>{
        console.log(error);        
      Swal.fire('Ha ocurrido un error en el sistema' );
      }
    )
  }

}
