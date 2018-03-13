import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../interfaces/user';
import {LoginPage} from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: User = {
    username: '',
    password: '',
    email: '',
  };

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register() {
    this.mediaProvider.register(this.user).subscribe(response => {
      //console.log(response);
      this.mediaProvider.username = this.user.username;
      this.mediaProvider.password = this.user.password;
      this.navCtrl.setRoot(LoginPage);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

}
