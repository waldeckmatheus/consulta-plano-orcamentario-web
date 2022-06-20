import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocInfo } from '../components/doc-info/docInfo';
import { DocumentacaoTutorial } from '../components/doc-info/documentacaoTutorial';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public title: string;
  public documentacaoTutorialOpen: boolean;
  docInfoC1: DocInfo = new DocInfo('Front-end');
  docInfoC2: DocInfo = new DocInfo('Front-end Builder');
  docInfoC3: DocInfo = new DocInfo('Container');
  docInfoC4: DocInfo = new DocInfo('Código-fonte/CICD');
  docInfoC5: DocInfo = new DocInfo('Back-end micro serviço');
  docInfoC6: DocInfo = new DocInfo('Back-end cache');
  docInfoC7: DocInfo = new DocInfo('Helpers');
  docInfoC8: DocInfo = new DocInfo('Sistemas Operacionais');
  docInfoC9: DocInfo = new DocInfo('Server Hosting');
  docInfoC10: DocInfo = new DocInfo('Site Domain');
  docInfoC11: DocInfo = new DocInfo('Ferramentas de desenvolvimento');

  docInfoArray: Array<DocInfo> = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.addDocInfosToArray();
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.title = "Sobre o App";
    this.initDocFrontendArray();
    this.initDocBuilderArray();
    this.initDocContainer();
    this.initDocCodigoFonte();
    this.initDocBackendMicroservico();
    this.initDocBackendCache();
    this.initDocHelper();
    this.initDocSO();
    this.initDocServerHosting();
    this.initDocSiteDomain();
    this.initDocTools();

  }
  addDocInfosToArray() {
    this.docInfoArray.push(this.docInfoC1);
    this.docInfoArray.push(this.docInfoC2);
    this.docInfoArray.push(this.docInfoC3);
    this.docInfoArray.push(this.docInfoC4);
    this.docInfoArray.push(this.docInfoC5);
    this.docInfoArray.push(this.docInfoC6);
    this.docInfoArray.push(this.docInfoC7);
    this.docInfoArray.push(this.docInfoC8);
    this.docInfoArray.push(this.docInfoC9);
    this.docInfoArray.push(this.docInfoC10);
    this.docInfoArray.push(this.docInfoC11);
  }
  openDocumentacaoTutorialModal() {
    this.documentacaoTutorialOpen = true;
  }
  closeDocumentacaoTutorialModal() {
    this.documentacaoTutorialOpen = false;
  }
  initDocFrontendArray() {
    this.docInfoC1.arrayDocTutorial.push(new DocumentacaoTutorial('https://angular.io/assets/images/favicons/favicon-16x16.png', 'https://angular.io/docs'));
  }
  initDocBuilderArray() {
    this.docInfoC2.arrayDocTutorial.push(new DocumentacaoTutorial('https://ionicframework.com/docs/img/meta/favicon-96x96.png', 'https://ionicframework.com/docs/'));
    this.docInfoC2.arrayDocTutorial.push(new DocumentacaoTutorial('https://cordova.apache.org/favicon.ico', 'https://cordova.apache.org/docs/en/'));
    this.docInfoC2.arrayDocTutorial.push(new DocumentacaoTutorial('https://docs.gradle.org/favicon.ico', 'https://docs.gradle.org/'));
  }

  initDocContainer() {
    this.docInfoC3.arrayDocTutorial.push(new DocumentacaoTutorial('https://docs.docker.com/favicons/docs@2x.ico', 'https://docs.docker.com/'));
  }

  initDocCodigoFonte() {
    this.docInfoC4.arrayDocTutorial.push(new DocumentacaoTutorial('https://github.com/fluidicon.png', 'https://docs.github.com/en'));
    this.docInfoC4.arrayDocTutorial.push(new DocumentacaoTutorial('https://docs.gitlab.com/favicon.ico', 'https://docs.gitlab.com/'));
  }

  initDocBackendMicroservico() {
    this.docInfoC5.arrayDocTutorial.push(new DocumentacaoTutorial('https://spring.io/images/favicon-9d25009f65637a49ac8d91eb1cf7b75e.ico', 'https://docs.spring.io/'));
  }

  initDocBackendCache() {
    this.docInfoC6.arrayDocTutorial.push(new DocumentacaoTutorial('https://redis.io/favicons/favicon-16x16.png', 'https://redis.io/docs/'));
  }

  initDocHelper() {
    this.docInfoC7.arrayDocTutorial.push(new DocumentacaoTutorial('https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png', 'https://medium.com/'))
    this.docInfoC7.arrayDocTutorial.push(new DocumentacaoTutorial('https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196', 'https://stackoverflow.com/'))
    this.docInfoC7.arrayDocTutorial.push(new DocumentacaoTutorial('https://www.w3schools.com/favicon.ico', 'https://www.w3schools.com/'));
  }

  initDocSO() {
    this.docInfoC8.arrayDocTutorial.push(new DocumentacaoTutorial('https://archlinux.org/static/favicon.29302f683ff8.ico', 'https://archlinux.org/'))
    this.docInfoC8.arrayDocTutorial.push(new DocumentacaoTutorial('https://www.debian.org/favicon.ico', 'https://www.debian.org/'))
  }

  initDocServerHosting() {
    this.docInfoC9.arrayDocTutorial.push(new DocumentacaoTutorial('https://docs.digitalocean.com/favicon.png', 'https://docs.digitalocean.com/'))
  }

  initDocSiteDomain() {
    this.docInfoC10.arrayDocTutorial.push(new DocumentacaoTutorial('https://img6.wsimg.com/ux/favicon/favicon-16x16.png', 'https://br.godaddy.com/help'))
  }
  initDocTools() {
    this.docInfoC11.arrayDocTutorial.push(new DocumentacaoTutorial('https://code.visualstudio.com/favicon.ico', 'https://code.visualstudio.com/'))
    this.docInfoC11.arrayDocTutorial.push(new DocumentacaoTutorial('https://spring.io/images/favicon-9d25009f65637a49ac8d91eb1cf7b75e.ico', 'https://spring.io/tools'))
  }
}
