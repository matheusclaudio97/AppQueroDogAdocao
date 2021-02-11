import { ModalPage } from './../modal/modal.page';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.page.html',
  styleUrls: ['./ambiente.page.scss'],
})
export class AmbientePage implements OnInit {

  constructor(
    private AuthService: AuthService,
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

 async showModal(){
    const modal = await this.modalCtrl.create({
      component: ModalPage

    });

    modal.present();
  }
//// LOGOUT
 // fazerLogout() {
  //  this.AuthService.logout();
  //  this.navCtrl.navigateRoot('/HomePage');
    
    
   // }
  

}
