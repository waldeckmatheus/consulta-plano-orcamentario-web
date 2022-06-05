import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'near-card',
  templateUrl: './near-card.html',
  styleUrls: ['./near-card.scss'],
})
export class NearCardComponent implements OnInit {
  public folder: string;

  @Input() title = '';
  @Input() paragraph = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  isLink(text: String) {
    if (!text.startsWith('http')) {
      return false;
    } else {
      return true;
    }
  }
}
