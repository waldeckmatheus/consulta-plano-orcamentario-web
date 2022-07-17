import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InfoMeaningComponent } from '../components/info-meaning/info-meaning.component';
import { InfoMeanings } from '../components/info-meaning/infomeaning';
import { WordHighlight } from './word-highlight';

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

  infoASplitted: Array<WordHighlight> = null;
  infoBSplitted: Array<WordHighlight> = null;
  infoCSplitted: Array<WordHighlight> = null;
  infoDSplitted: Array<WordHighlight> = null;


  presentAlertFn = this.presentAlert;
  constructor(public loadingController: LoadingController, public modalCtrl: ModalController, private activatedRoute: ActivatedRoute, private toastController: ToastController, private http: HttpClient, private alertController: AlertController) { }

  ngOnInit() {
    this.infoASplitted = new Array<WordHighlight>();
    this.infoBSplitted = new Array<WordHighlight>();
    this.infoCSplitted = new Array<WordHighlight>();
    this.infoDSplitted = new Array<WordHighlight>();

    let infoASplitted = this.fullInfoA.split(' ');
    let infoBSplitted = this.fullInfoB.split(' ');
    let infoCSplitted = this.fullInfoC.split(' ');
    let infoDSplitted = this.fullInfoD.split(' ');

    infoASplitted.forEach(el => {
      this.infoASplitted.push(new WordHighlight(el, false));
    });

    infoBSplitted.forEach(el => {
      this.infoBSplitted.push(new WordHighlight(el, false));
    });

    infoCSplitted.forEach(el => {
      this.infoCSplitted.push(new WordHighlight(el, false));
    });

    infoDSplitted.forEach(el => {
      this.infoDSplitted.push(new WordHighlight(el, false));
    });

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  fnPluralSingularVerboThisApp(str: String) {
    const wordLettersOnly: String = str.replace(/,/g, '').replace(/\./g, '').replace(/\)/g, '').replace(/\(/g, '').trim();
      let wordLettersOnlyModified = String(wordLettersOnly);
      if (wordLettersOnly.endsWith('s')) {
        if (wordLettersOnly.endsWith('es')) {
          let indexToken = wordLettersOnly.lastIndexOf('es')
          if (!wordLettersOnly.endsWith('valores')) {
            wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken+1);
          } else {
            wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken);
          }
        }
        if (wordLettersOnly.endsWith('as')) {
          let indexToken = wordLettersOnly.lastIndexOf('as')
          wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken+1);
        }
        if (wordLettersOnly.endsWith('os')) {
          let indexToken = wordLettersOnly.lastIndexOf('os')
          wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken+1);
        }
        if (wordLettersOnly.endsWith('is')) {
          let indexToken = wordLettersOnly.lastIndexOf('is')
          wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken)+'l';
        }

      } else if (wordLettersOnly.endsWith('em')){
        let indexToken = wordLettersOnly.lastIndexOf('em')
        if (wordLettersOnly === 'serem') {
          wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken);
        } else if (wordLettersOnly === 'podem') {
          wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken+1);
        }
      } else if (wordLettersOnly.endsWith('ão')){
        let indexToken = wordLettersOnly.lastIndexOf('ão')
        if (wordLettersOnly === 'serão') {
          wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken);
        }
      } else if (wordLettersOnly.endsWith('am')){
        let indexToken = wordLettersOnly.lastIndexOf('am')
        if (wordLettersOnly === 'elaboram') {
          wordLettersOnlyModified = wordLettersOnly.substring(0, indexToken+1)+'r';
        }
      } else if (wordLettersOnly.endsWith('pretende')){
        // let indexToken = wordLettersOnly.lastIndexOf('pretende')
          wordLettersOnlyModified = wordLettersOnly+'r';
      }
      // console.error(wordLettersOnly+': '+wordLettersOnlyModified);
      return wordLettersOnlyModified;
  }
  async infoWord(word) {
    const wordLettersOnly = word.replace(/,/g, '').replace(/\./g, '').replace(/\)/g, '').replace(/\(/g, '');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Consultando fonte de dados...',
      duration: 0
    });

    this.loading.present();

    const wordLettersOnlySingular = this.fnPluralSingularVerboThisApp(wordLettersOnly);
    let teste: (error: HttpErrorResponse) => Promise<Observable<never>>;
    this.http.get(`https://significado.herokuapp.com/${wordLettersOnlySingular}`, httpOptions)
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
              componentProps: { infoMeaning: res, word: wordLettersOnlySingular },
            });
          (infoMeaningModal).then((res) => {
            res.present();
          });
          this.loading.dismiss();
        },
        err => {
          this.presentAlert(err.error.error, `Não foi possível obter informação sobre a palavra: ${wordLettersOnlySingular}`, 'Funcionalide em construção');
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
