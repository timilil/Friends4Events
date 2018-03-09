import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {MediaProvider} from '../../providers/media/media';
import {EventPage} from '../event/event';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  filesArray: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsList');
    /*if (localStorage.getItem('token') != null) {
      this.mediaProvider.getUserData().subscribe(response => {
        console.log('Welcome ' + response['full_name']);*/
        /*this.mediaProvider.getNewFiles().subscribe(response => {
          console.log(response);
          this.filesArray = response;
        });*/
        this.mediaProvider.getFileWithSpecificTag('event').subscribe(response => {
          console.log(response);
          this.filesArray = response;
        });
      /*}, (error: HttpErrorResponse) => {
        console.log(error);
        //this.router.navigate(['login']);
        //this.navCtrl.setRoot(LoginPage)
      });
    } else {
      console.log('moi');
      //this.router.navigate(['login']);
      //this.navCtrl.setRoot(LoginPage);
    }*/
  }

  itemTapped(event, item, file_id, title, description, user_id, filename, time_added) {
    // push the params to EventPage
    if (localStorage.getItem('token') != null) {
      this.navCtrl.push(EventPage, {
        item: item,
        file_id: file_id,
        title: title,
        description: description,
        user_id: user_id,
        filename: filename,
        time_added: time_added
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
