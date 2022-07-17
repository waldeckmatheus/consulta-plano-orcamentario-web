import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, MenuController, Platform, ToastController } from '@ionic/angular';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  @ViewChild(IonRouterOutlet, { static : true }) routerOutlet: IonRouterOutlet;
  public appPages = [
    { title: 'Bem-vindo', url: '/bem-vindo/Home', icon: 'home' },
    { title: 'Orçamento Público', url: '/plano-orcamentario/Home', icon: 'paper-plane' },
    { title: 'Sobre o APP', url: '/sobre-app/Informacoes', icon: 'mail' },
  ];
  public labels;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  lastTimeBackPress
  timePeriodToExit = 2000;

  public ngOnInit(): void {
    this.labels = [];

    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();

    let anoTmp = Number(anoAtual);
    const quantidadeAnos = 5
    for (let i = 0; i < quantidadeAnos; i++) {
      this.labels.push(String(anoTmp));
      anoTmp = anoTmp - 1;
    }

  }
  constructor(private router: Router,
    public menuCtrl: MenuController,
    private platform: Platform,
    private toastController: ToastController,
    private appService: AppService) {
    this.backButtonEvent();
  }

  simulateBackButton() {
    document.dispatchEvent(new Event('ionBackButton'));
  }
  goToConsultaPlanoOrcamentario($myParam: string = ''): void {
    const navigationDetails: string[] = ['/consulta-plano-orcamentario/' + $myParam];
    this.router.navigate(navigationDetails);
    this.menuCtrl.close();
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      if (this.routerOutlets!= undefined && this.routerOutlets!=null && this.routerOutlets.length>0) {
        let outlet = this.routerOutlets.get(0);
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
          this.appService.closeModalIfOpen();
        } else {
          this.exitOrAlert();
        }
      } else {
        this.exitOrAlert();
      }
    });
  }
  async exitOrAlert() {
    if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
      navigator['app'].exitApp();
    } else {
      const toast = await this.toastController.create({
        message: 'Press back again to exit App.',
        duration: 2000,
        position: 'middle'
      });
      toast.present();

      this.lastTimeBackPress = new Date().getTime();
    }
  }

}
