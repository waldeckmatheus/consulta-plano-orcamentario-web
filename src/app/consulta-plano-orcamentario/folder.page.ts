import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemPlanoOrcamentario } from './plano-orcamentario';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoadingOptions, IonicSafeString } from '@ionic/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public content: Array<ItemPlanoOrcamentario>
  toastObject = null;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'Bearer QtEYp3g6lwYEMoXXSbs4F948TiLsbTNZc1reEnR9'
    })
  };

  constructor(public loadingController: LoadingController, private activatedRoute: ActivatedRoute, private http: HttpClient, public alertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
    this.init();
  }
  async presentToastWithOptions(obj: ItemPlanoOrcamentario, indexPlusOne: number) {
    if (this.toastObject!=null) {
      this.toastObject.dismiss();
    }

    let objDescricao : IonicSafeString = new IonicSafeString(indexPlusOne+'. '+obj.descricao.toString());
      this.toastObject = await this.toastController.create({
      header: 'Item do plano orçamentário '+obj.numAno,
      message: objDescricao,
      icon: 'information-circle',
      position: 'top',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await this.toastObject.present();

    
    // const { role } = await toast.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }
  async init() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Consultando fonte de dados...',
      duration: 0
    });

    loading.present();

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get<ItemPlanoOrcamentario[]>(`https://api-transparencia.thedevsteps.com/plano-orcamentario/${this.folder}`, this.httpOptions)
    .pipe(
      catchError(this.handleError) // then handle the error
    )
    .subscribe(res => {
      console.log(res);
      this.content = res;
      loading.dismiss();
    });
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
