import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AddNewTermDialogComponent } from '../add-new-term-dialog/add-new-term-dialog.component';
import { glossaryData } from '../glossary-data';
import { GlossaryTerm } from '../glossary.model';
import { WarningPopUpComponent } from '../warning-pop-up/warning-pop-up.component';

export enum TermDialogActions {
  Edit = 'EDIT',
  Add = 'ADD'
};

@Component({
  selector: 'glossary-table',
  templateUrl: './glossary-table.component.html',
  styleUrls: ['./glossary-table.component.scss']
})
export class GlossaryTableComponent {
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

  reRenderTable(): void {
    this.dataSource.data = this.dataSource.data.sort(this.alphebeticalComparator);
    localStorage.setItem("terms", JSON.stringify(this.dataSource.data));
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
        const targetTermIndex: number = this.dataSource.data.findIndex(term => term.id === selectedTerm.id);
        this.dataSource.data[targetTermIndex] = { ...result.newTerm, id: selectedTerm.id };
        this.reRenderTable();
        this.snackBar.open("This term has been successfully updated!", "OK", {
          duration: 3000
        });
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
        this.dataSource.data = [...this.dataSource.data, newTerm];
        this.reRenderTable();
        this.snackBar.open("The new term has been successfully added!", "OK", {
          duration: 3000
        });
      }

    });
  }

  deleteTerm(selectedTerm: GlossaryTerm): void {
    const dialogRef = this.dialog.open(WarningPopUpComponent, {
      data: {
        glossaryTerm: selectedTerm
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(result => {
      if (result !== undefined && result.confirmed) {
        const targetTermIndex: number = this.dataSource.data.findIndex(term => term.id === selectedTerm.id);
        this.dataSource.data = [
          ...this.dataSource.data.slice(0, targetTermIndex),
          ...this.dataSource.data.slice(targetTermIndex + 1)
        ];
        this.reRenderTable();
        this.snackBar.open("The new term has been successfully deleted!", "OK", {
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
