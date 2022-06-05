import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Decreto } from '../decreto/decreto';
import { DecretoService } from '../decreto/decreto.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(public decretoService: DecretoService, private router: Router, private activatedRoute: ActivatedRoute, public alertController: AlertController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  goToDecreto(id: String, nome: String): void {
    let decreto: Decreto = this.decretoService.getDecretoByID(id);

    const navigationDetails: string[] = ['/decreto/'+decreto.id];
    const navigationExtras: NavigationExtras = {};

    navigationExtras.queryParams = {decreto: decreto.md5Id};
    this.router.navigate(navigationDetails, navigationExtras);
  }
}
