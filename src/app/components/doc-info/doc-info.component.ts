import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocInfo } from './docInfo';

@Component({
  selector: 'doc-info',
  templateUrl: './doc-info.html',
  styleUrls: ['./doc-info.scss'],
})
export class DocInfoComponent implements OnInit {
  public folder: string;

  @Input() docInfo: DocInfo;

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
