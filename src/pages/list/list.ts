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
  selectedItem: any;
  searchItems: any;
  //icons: string[];
  //items: Array<{title: string, note: string, icon: string}>;
  loggedUserId: number;


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
    this.selectedItem = navParams.get('item');
  }

  getItems(ev: any) {

    this.initializeItems();

    let val = ev.target.value;

    if (val && val.trim() != '') {

      this.searchItems = this.searchItems.reverse().filter((item) => {
        console.log(item.title);
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  initializeItems() {
    this.searchItems = this.filesArray;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsList');
    this.mediaProvider.getFileWithSpecificTag('event').subscribe(response => {
      console.log(response);
      this.filesArray = response;
      this.initializeItems();
    });
    if (localStorage.getItem('token')){
      this.mediaProvider.getUserData().subscribe(response => {
        console.log(response);
        this.loggedUserId = response['user_id'];
        console.log(this.loggedUserId);
      });
    }
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
        time_added: time_added,
        loggeduserid: this.loggedUserId
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
