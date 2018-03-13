import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {MediaProvider} from '../../providers/media/media';
import {EventPage} from '../event/event';
import {Media} from '../../interfaces/media';
import {Search} from '../../interfaces/search';
import {LoginPage} from '../login/login';
import {Searchtag} from '../../interfaces/searchtag';
import {SearchedeventsPage} from '../searchedevents/searchedevents';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/pages/home/home.scss'],
})
export class HomePage {

  latestImgsArray: any;
  searchedImgsArray: any;
  file: any;

  media: Media = {
    title: '',
    description: '',
  };

  search: Search = {
    title: '',
  };

  searchTag: Searchtag = {
    tag: '',
  };

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(
    public navCtrl: NavController, private mediaProvider: MediaProvider,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }

  searchEvent() {
    this.mediaProvider.searchMedia(this.search).subscribe(response => {
      this.searchedImgsArray = response;
      this.navCtrl.push(SearchedeventsPage, {
        thing: this.searchedImgsArray,
      });
    });
  }

  searchEventByTag(tag) {
    this.mediaProvider.searchTag('event').subscribe(response => {
      this.navCtrl.push(SearchedeventsPage, {
        response: response,
        searchTag: this.searchTag.tag,
      });
    });
  }

  ionViewDidLoad() {
    this.mediaProvider.getFileWithSpecificTag('event').subscribe(response => {
      //console.log(response);
      this.latestImgsArray = response;
    });
    if (localStorage.getItem('token') != null) {
      this.mediaProvider.logged = true;
    }
  }

  itemTapped(
    event, file_id, title, description, user_id, filename, time_added) {
    if (localStorage.getItem('token') != null) {
      this.navCtrl.push(EventPage, {
        file_id: file_id,
        title: title,
        description: description,
        user_id: user_id,
        filename: filename,
        time_added: time_added,
      });
    } else {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  showAboutUs() {
    if (document.getElementById('about').classList.contains('ellipsis')) {
      document.getElementById('about').classList.remove('ellipsis');
    }
    else {
      document.getElementById('about').classList.add('ellipsis');
    }
  }

  showWhoIsItFor() {
    if (document.getElementById('for').classList.contains('ellipsis')) {
      document.getElementById('for').classList.remove('ellipsis');
    }
    else {
      document.getElementById('for').classList.add('ellipsis');
    }
  }

  showUsage() {
    if (document.getElementById('usage').classList.contains('ellipsis')) {
      document.getElementById('usage').classList.remove('ellipsis');
    }
    else {
      document.getElementById('usage').classList.add('ellipsis');
    }
  }

}
