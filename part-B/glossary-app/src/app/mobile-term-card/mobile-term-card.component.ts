import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GlossaryTerm } from '../glossary.model';

@Component({
  selector: 'mobile-term-card',
  templateUrl: './mobile-term-card.component.html',
  styleUrls: ['./mobile-term-card.component.scss']
})
export class MobileTermCardComponent {
  @Input() term!: GlossaryTerm;
  @Output() deleteButtonClicked: EventEmitter<GlossaryTerm> = new EventEmitter();
  @Output() editButtonClicked: EventEmitter<GlossaryTerm> = new EventEmitter();
  constructor() {
  }

  deleteTerm(): void {
    this.deleteButtonClicked.emit(this.term);
  }

  editTerm(): void {
    this.editButtonClicked.emit(this.term);
  }

}
