import {Component} from '@angular/core';
import {
  AlertController, IonicPage, NavController,
  NavParams,
} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public alertCtrl: AlertController) {
  }

  openPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  login() {
    this.mediaProvider.login().subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
      this.navCtrl.setRoot(HomePage);
      this.mediaProvider.logged = true;
    },(error: HttpErrorResponse) => {
      console.log(error);
      this.showAlert();
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Login failed',
      subTitle: 'Wrong username or password!',
      buttons: ['OK'],
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (localStorage.getItem('token') != null) {
      this.mediaProvider.getUserData().subscribe(response => {
        //this.router.navigate(['front']);
        this.navCtrl.setRoot(HomePage);
        this.mediaProvider.logged = true;
        console.log(this.mediaProvider.logged);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
  }

}
