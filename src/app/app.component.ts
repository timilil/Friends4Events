import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {ProfilePage} from '../pages/profile/profile';
import {LogoutPage} from '../pages/logout/logout';
import {MediaProvider} from '../providers/media/media';
import {UpdatePage} from '../pages/update/update';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private mediaProvider: MediaProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Events', component: ListPage },
      { title: 'Login', component: LoginPage },
      { title: 'Profile', component: ProfilePage },
      { title: 'Logout', component: LogoutPage },
      { title: 'Update', component: UpdatePage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log(this.mediaProvider.logged);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
