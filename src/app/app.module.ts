import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MediaProvider } from '../providers/media/media';
import {ProfilePage} from '../pages/profile/profile';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EventPage} from '../pages/event/event';
import {CommentsPage} from '../pages/comments/comments';
import {ViewprofilePage} from '../pages/viewprofile/viewprofile';
import {LogoutPage} from '../pages/logout/logout';
import {SearchedeventsPage} from '../pages/searchedevents/searchedevents';
import {ReversePipe} from '../pipes/reverse/reverse';
import {TimePipe} from '../pipes/time/time';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    EventPage,
    CommentsPage,
    ViewprofilePage,
    LogoutPage,
    SearchedeventsPage,
    ReversePipe,
    TimePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    EventPage,
    CommentsPage,
    ViewprofilePage,
    LogoutPage,
    SearchedeventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    HttpClient
  ]
})
export class AppModule {}
