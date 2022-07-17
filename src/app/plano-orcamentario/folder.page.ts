import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InfoMeaningComponent } from '../components/info-meaning/info-meaning.component';
import { InfoMeanings } from '../components/info-meaning/infomeaning';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  loading: HTMLIonLoadingElement;

  fullInfoA = "O orçamento público é o instrumento de planejamento que detalha a previsão dos recursos a serem arrecadados (impostos e outras receitas estimadas) e a destinação desses recursos (ou seja, em quais despesas esses recursos serão utilizados) a cada ano."; 
  fullInfoB = "Ao englobar receitas e despesas, o orçamento é peça fundamental para o equilíbrio das contas públicas e indica as prioridades do Governo para a sociedade.";
  fullInfoC = "A União, cada estado e cada município elaboram anualmente seu orçamento.";
  fullInfoD = "No Orçamento da União, é possível encontrar os valores que o Governo Federal pretende gastar com o seu funcionamento e na execução das políticas públicas, como as de saúde, educação, e segurança. Somente as despesas ali previstas podem ser executadas.";

  infoASplitted = null;
  infoBSplitted = null;
  infoCSplitted = null;
  infoDSplitted = null;

  presentAlertFn = this.presentAlert;
  constructor(public loadingController: LoadingController, public modalCtrl: ModalController, private activatedRoute: ActivatedRoute, private toastController: ToastController, private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
    this.infoASplitted = this.fullInfoA.split(' ');
    this.infoBSplitted = this.fullInfoB.split(' ');
    this.infoCSplitted = this.fullInfoC.split(' ');
    this.infoDSplitted = this.fullInfoD.split(' ');

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async infoWord(word) {
    
     const wordLettersOnly = word.replace(/[^a-zA-Z]+/g, '');

     let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Consultando fonte de dados...',
      duration: 0
    });

    this.loading.present();

    let teste: (error: HttpErrorResponse) => Promise<Observable<never>>;
    this.http.get(`https://significado.herokuapp.com/${wordLettersOnly}`, httpOptions)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
    })
    )
    .subscribe(
      res => {
      let infoMeaningModal = this.modalCtrl.create(
        {
          component: InfoMeaningComponent, 
          componentProps: {infoMeaning: res, word: wordLettersOnly},
        });
      (infoMeaningModal).then((res)=> {
        res.present();
      });
      this.loading.dismiss();
    },
    err => {
      this.presentAlert(err.error.error, `Não foi possível obter informação sobre a palavra: ${wordLettersOnly}`, 'Funcionalide em construção');
      this.loading.dismiss();
    }),
    () => console.log('HTTP request completed.');
    
  }

  async presentAlert(message, subtitle, header) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
