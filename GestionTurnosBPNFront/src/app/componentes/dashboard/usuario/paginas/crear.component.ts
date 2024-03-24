import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import swall from 'sweetalert2';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  usuarioForm: FormGroup
  titulo: string = "Nuevo Usuario";
  tituloBoton:string ="Guardar"
  correoOriginal?: string;


  constructor(private formbuilder: FormBuilder,
            private servicio: UsuarioService,
            @Inject(MAT_DIALOG_DATA) public datoedit : any,
            private dialog : MatDialogRef<CrearComponent>)
          {}

  ngOnInit(): void {


    this.usuarioForm = this.formbuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.required, this.validarNumerico.bind(this),  this.validarLongitud(9)]],
      cedula: ['', [Validators.required, this.validarNumerico.bind(this),  this.validarLongitud(8)]],
      contrasena: ['',[Validators.required, Validators.minLength(5)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      estado: [true, Validators.required],
      role: ['ADMINISTRADOR'],
      username:['',[Validators.required]]
    })


    if(this.datoedit){

      this.servicio.buscarUsuario(this.datoedit.id).subscribe(  u =>
        {
          this.usuarioForm.controls['id'].setValue(u.id)
          this.usuarioForm.controls['nombre'].setValue(u.nombre);
          this.usuarioForm.controls['apellido'].setValue(u.apellido);
          this.usuarioForm.controls['telefono'].setValue(u.telefono);
          this.usuarioForm.controls['cedula'].setValue(u.cedula);
          this.usuarioForm.controls['contrasena'].setValue(u.contrasena);
          this.usuarioForm.controls['correoElectronico'].setValue(u.correoElectronico);
          this.usuarioForm.controls['estado'].setValue(u.estado);
          this.usuarioForm.controls['role'].setValue(u.role);
          this.usuarioForm.controls['username'].setValue(u.username);

          this.correoOriginal = u.correoElectronico;
          this.usuarioForm.get('correoElectronico')?.setValue(u.correoElectronico);
        })

      this.titulo = "Editar Usuario";
      this.tituloBoton = "Actualizar";

    }
  }



  guardarUsuario(){

    if(!this.datoedit){

        if(this.usuarioForm.valid){

          this.servicio.guardarUsuarioServi(this.usuarioForm.value).subscribe( () => {
              this.dialog.close("guardar")
              swall.fire({
                icon: 'success',
                confirmButtonColor:'#0275d8',
                html:  `Se registro correctamente al usuario:  <strong>${this.usuarioForm.value['nombre']}</strong>`,
              })

            }
          )
        }
    }else{
      this.actualizarUsuario()
    }

  }

  actualizarUsuario(){

    this.servicio.guardarUsuarioServi(this.usuarioForm.value).subscribe( () => {
      this.dialog.close("actualizar");
      swall.fire({
        icon: 'success',
        confirmButtonColor:'#0275d8',
        html:  `Se actualizo correctamente al usuario:  <strong>${this.usuarioForm.value['nombre']}</strong>`,
      })

    })

  }

  

  validarcorreo(event: any) {
    const correoFormControl = this.usuarioForm.get('correoElectronico');
  
    if (correoFormControl?.valid) {
      const nuevoCorreo = (event.target as HTMLInputElement).value;
  
      if (nuevoCorreo !== this.correoOriginal) {
        this.servicio.validarcorreo(nuevoCorreo).subscribe( (res: boolean) => {
          if (res) {
            correoFormControl.setErrors({ correoInvalid: 'Correo ya está registrado' });
          } else {
            correoFormControl.setErrors(null);
          }
        });
      }
    }
  }


  validarLongitud(longitud: number) {
    return (control: FormControl) => {
      const valor = control.value;
      if (valor && valor.toString().length === longitud) {
        return null; 
      } else {
        return { longitudIncorrecta: true }; 
      }
    };
  }

  validarNumerico(control: FormControl): { [key: string]: any } | null {
    const esNumerico = /^[0-9]+$/.test(control.value);

    if(esNumerico){
      console.log('Es mnumerico')
      return null
    }else{
      console.log('NO Es mnumerico')
      return { pattern2: true }; 
    }

  }
  

  isValidField(field: string): boolean | null {
    return (
      this.usuarioForm.controls[field].errors &&
      this.usuarioForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.usuarioForm.controls[field]) return null;

    const errors = this.usuarioForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        
        case 'required':
          return `${field} es requerido`;
        
        case 'pattern2':
          return `Tiene que ser númerico `;

        case 'longitudIncorrecta':
          return `Longitug incorrecto.`;
  
        case 'email':
          return `${field} no tiene el formato correcto`;

        case 'minlength':
            const minLength = errors['minlength']?.requiredLength;
            return `debe tener al menos ${minLength} digitos`;
          
        case 'maxlength':
              const maxLength = errors['maxlength']?.requiredLength;
              return `debe tener con maximo ${maxLength} digitos`;

        case 'documentoInvalid':
          return `Dni ya esta registrado`;

        case 'correoInvalid':
            return `Correo ya esta registrado`;
      }
    }
    return null;
  }
}
