import { UsuarioExisteService } from './service/usuario-existe.service';
import { NovoUsuarioService } from './service/novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './service/novo-usuario';
import { minusculoValidator } from './minusculo.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService
  ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email ]],
        fullName: ['', [Validators.required, Validators.minLength(4) ]],
        userName: ['', [minusculoValidator], [this.usuarioExistenteService.usuarioJaExiste()],
      ],
        password: ['']
      },
      // {
      //   Validators: [usuarioSenhaIguaisValidator],
      // }
    );
  }

  cadastrar(){
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log(novoUsuario);
  }
}
