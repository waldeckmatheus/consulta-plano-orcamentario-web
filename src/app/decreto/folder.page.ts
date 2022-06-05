import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Decreto } from './decreto';
import { DecretoService } from './decreto.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public decreto: Decreto;
  public content;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'text/html' 
    })
  };
  

  constructor(public decretoService: DecretoService, private activatedRoute: ActivatedRoute, private http: HttpClient, public alertController: AlertController) { }

  ngOnInit() {
    /*
    let decretoMD5 = this.activatedRoute.snapshot.queryParamMap.get('decreto');
    this.decreto = this.decretoService.getCurrentDecreto();

    if (this.decreto.md5Id === decretoMD5) {
      this.http.get<String>(`${this.decreto.url}`, this.httpOptions)
      .pipe(
        catchError(this.handleError) // then handle the error
      )
      .subscribe(res => {
        console.log(res);
        this.content = res;
      });
    }
    */
   console.log('decreto');
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.presentAlert(error.error);
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        this.presentAlert(`status code ${error.status} and body: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
