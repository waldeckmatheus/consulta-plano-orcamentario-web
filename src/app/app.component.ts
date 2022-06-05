import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, LoadingController, MenuController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{
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
    for (let i=0;i<quantidadeAnos;i++){
      this.labels.push(String(anoTmp));
      anoTmp = anoTmp - 1;
      
    }

  }
  constructor(private router: Router, 
    public menuCtrl: MenuController,  
    private platform: Platform,
    private toastController: ToastController){
      
     }

  goToConsultaPlanoOrcamentario($myParam: string = ''): void {
    const navigationDetails: string[] = ['/consulta-plano-orcamentario/'+$myParam];
    this.router.navigate(navigationDetails);
    this.menuCtrl.close();
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {

      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();

        } else {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work in ionic 4

          } else {
            const toast = await this.toastController.create({
              message: 'Press back again to exit App.',
              duration: 2000,
              position: 'middle'
            });
            toast.present();
            // console.log(JSON.stringify(toast));
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

}
