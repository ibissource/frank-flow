import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() term!: string;
  @Output() termChange = new EventEmitter<string>();

  constructor() {}

  changeState(): void {
    this.termChange.emit(this.term);
  }

  ngOnInit(): void {}
}
