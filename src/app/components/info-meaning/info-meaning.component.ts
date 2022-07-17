import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { InfoMeanings } from './infomeaning';


@Component({
  selector: 'info-meaning',
  templateUrl: './info-meaning.html',
  styleUrls: ['./info-meaning.scss'],
})
export class InfoMeaningComponent implements OnInit {
  public folder: string;

  @Input() word: String;
  @Input() infoMeaning: InfoMeanings;

  constructor(public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

 
}
