import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  //ANIMAÇÃO DE TRANSIÇÃO LOGIN / CADASTRO
  animations: [
    trigger(
      'animacaoLogin', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate("1s ease-in-out", style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 0
        })
      ])
    ],
    ),
    trigger(
      'animacaoCadastro', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate("1s ease-in-out", style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 0
        })
      ])
    ],
    ),
  ]

})
export class HomePage {
  login = true;
  cadastro = false;

  loginForm = {
    email: '',
    password: ''
  };

  cadastroForm = {
    name: '',
    email: '',
    password: ''
  };

  private loading: any;

  constructor(
    private LoadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private AuthService: AuthService
  ) { }



  //EXIBIR FORM DE LOGIN

  exibirLogin() {
    this.login = true;
    this.cadastro = false;

  }

  //EXIBIR FORM DE REGISTRO
  exibirCadastro() {
    this.cadastro = true;
    this.login = false;

  }

  

  async fazerLogin() {
    await this.presentLoading();
    try {
      await this.AuthService.login(this.loginForm);
    }
    catch (error) {
      let message: string;

      switch (error.code) {
        case "auth/wrong-password":
          message = "Senha Invalida";
          break;

        case "auth/user-not-found":
          message = "Esse email não possui cadastro!";
          break;

          case "auth/invalid-email":
          message = "Digite um email válido!";
          break;
      }
      this.presentToast(message);

    }
    finally {
      this.loading.dismiss();
    }

  }

  async fazerCadastro() {
    await this.presentLoading();
    try {
      await this.AuthService.cadastro(this.cadastroForm);
    }
    catch (error) {
      let message: string;

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "O email já esta cadastrado!";
          break;

        case "auth/invalid-email":
          message = "O email é invalido!";
          break;

          case "auth/weak-password":
          message = "A senha precisa ter 6 ou mais digitos!";
          break;
      }


      this.presentToast(message);

    }
    finally {
      this.loading.dismiss();
    }

  }


  async presentLoading() {
    this.loading = await this.LoadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Por favor aguarde...'
    });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}