import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AddNewTermDialogComponent } from '../add-new-term-dialog/add-new-term-dialog.component';
import { glossaryData } from '../glossary-data';
import { GlossaryTerm } from '../glossary.model';

export enum TermDialogActions {
  Edit = 'EDIT',
  Add = 'ADD'
};

@Component({
  selector: 'glossary-table',
  templateUrl: './glossary-table.component.html',
  styleUrls: ['./glossary-table.component.scss']
})
export class GlossaryTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'term', 'definition', 'edit', 'delete'];
  dataSource: MatTableDataSource<GlossaryTerm>;
  unsubscribe = new Subject()
  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
    const localTerms = localStorage.getItem("terms");
    if (!localTerms) {
      this.dataSource = new MatTableDataSource(glossaryData.sort(this.alphebeticalComparator));
    } else {
      this.dataSource = new MatTableDataSource(JSON.parse(localTerms).sort(this.alphebeticalComparator))
    }

  }

  ngOnInit(): void {

  }

  alphebeticalComparator(a: GlossaryTerm, b: GlossaryTerm): number {
    return a.term > b.term ? 1 : (a.term < b.term ? -1 : 0)
  }

  editTerm(selectedTerm: GlossaryTerm): void {
    const dialogRef = this.dialog.open(AddNewTermDialogComponent, {
      data: {
        action: TermDialogActions.Edit,
        glossaryTerm: selectedTerm
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      if (result !== undefined) {

      }
    })
  }

  addTerm(): void {
    const dialogRef = this.dialog.open(AddNewTermDialogComponent, {
      data: {
        action: TermDialogActions.Add,
        glossaryTerm: null
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      if (result !== undefined) {
        const newTerm: GlossaryTerm = {
          ...result.newTerm,
          id: this.dataSource.data.length,
        };
        this.dataSource.data = [...this.dataSource.data, newTerm].sort(this.alphebeticalComparator);
        localStorage.setItem("terms", JSON.stringify(this.dataSource.data));
        this.snackBar.open("The new term has been successfully added!", "OK", {
          duration: 3000
        });
      }

    });
  }

  ngOnDestroy() {
    this.unsubscribe.next()
    this.unsubscribe.complete()
  }

}
