import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {App} from 'ionic-angular';
import {RequestOptions} from '@angular/http';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  username: string;
  password: string;
  email: string;
  status: string;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  nav = this.app.getActiveNav();
  logged = false;

  constructor(private http: HttpClient, public app: App) {
  }

  login() {
    const body = {
      username: this.username,
      password: this.password,
    };
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post(this.apiUrl + '/login', body, settings);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged() {
    if (localStorage.getItem('token') != null) {
      this.logged = true;
      //console.log(this.logged);
    }
    else {
      this.logged = false;
      //console.log(this.logged);
    }
  }

  register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.get(this.apiUrl + '/users/user',
      settings);
  }

  updateUserData(data) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.put(this.apiUrl + '/users', data, settings);
  }

  getUploadData(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };

    return this.http.post(this.apiUrl + '/media', formData,
      settings);
  }

  getNewFiles() {
    return this.http.get(this.apiUrl + '/media?start=&limit=10');
  }

  get5LatestImages() {
    return this.http.get(this.apiUrl + '/media?start=0&limit=5');
  }

  getFileByFileId(fileId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/media/' + fileId);
  }

  getTagsByCurrentUser(userid) {
    return this.http.get(this.apiUrl + '/tags/file/' + userid);
  }

  deleteFile(id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.delete(this.apiUrl + '/media/' + id, settings);
  }

  getUsernameByUserId(userId) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get('http://media.mw.metropolia.fi/wbma/users/' + userId,
      settings);
  }

  commentEvent(comment) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/comments', comment, settings);
  }

  getCommentsByFileId(fileId) {
    return this.http.get(this.apiUrl + '/comments/file/' + fileId);
  }

  like(file_id: number) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    const body = {
      file_id: file_id,
    };
    return this.http.post(this.apiUrl + '/favourites', body, settings);
  }

  unLike(file_id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.delete(this.apiUrl + '/favourites/file/' + file_id,
      settings);
  }

  getLikesByFileId(fileid) {
    return this.http.get(this.apiUrl + '/favourites/file/' + fileid);
  }

  getAllLikes() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/favourites', settings);
  }

  postTag(tag) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/tags', tag, settings);
  }

  getFileWithSpecificTag(tag) {
    return this.http.get(this.apiUrl + '/tags/' + tag);
  }

  deleteTag(tag_id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    this.http.delete(this.apiUrl + '/tags/' + tag_id, settings);
  }

  getTags() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.apiUrl + '/tags', settings);
  }

  searchMedia(media) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.post(this.apiUrl + '/media/search', media, settings);
  }

  searchTag(tag) {
    return this.http.get(this.apiUrl + '/tags/' + tag);
  }

  tagsByFileId(id) {
    return this.http.get(this.apiUrl + '/tags/file/' + id);
  }

}
