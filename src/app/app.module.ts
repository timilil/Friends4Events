import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MediaProvider} from '../providers/media/media';
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
import {Camera} from '@ionic-native/camera';
import {Transfer} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {EditorProvider} from '../providers/editor/editor';
import {File} from '@ionic-native/file';
import {AddeventPage} from '../pages/addevent/addevent';
import {UploadprofilepicPage} from '../pages/uploadprofilepic/uploadprofilepic';
import {UpdatePage} from '../pages/update/update';

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
    TimePipe,
    AddeventPage,
    UploadprofilepicPage,
    UpdatePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
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
    SearchedeventsPage,
    AddeventPage,
    UploadprofilepicPage,
    UpdatePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    HttpClient,
    Camera,
    EditorProvider,
    File,
    Transfer,
    FilePath,
  ],
})
export class AppModule {
}
