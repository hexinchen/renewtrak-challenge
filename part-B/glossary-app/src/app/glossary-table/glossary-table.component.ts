import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
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
  public readonly PAGE_SIZE = 10;
  public displayedColumns: string[] = ['id', 'term', 'definition', 'edit', 'delete'];
  public dataSource: MatTableDataSource<GlossaryTerm>;
  private unsubscribe = new Subject();
  public allTerms: GlossaryTerm[] = [];
  public currentPageIndex: number = 0;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
    const localTerms = localStorage.getItem("terms");
    if (!localTerms) {
      this.allTerms = glossaryData.sort(this.alphebeticalComparator);

    } else {
      this.allTerms = JSON.parse(localTerms).sort(this.alphebeticalComparator);
    }
    this.dataSource = new MatTableDataSource([...this.allTerms.slice(this.currentPageIndex, this.PAGE_SIZE)]);

  }

  reRenderTable(): void {
    this.allTerms = this.allTerms.sort(this.alphebeticalComparator);
    localStorage.setItem("terms", JSON.stringify(this.allTerms));
    this.currentPageIndex = 0;
    this.dataSource.data = [...this.allTerms.slice(this.currentPageIndex, this.PAGE_SIZE)];

    const pageEvent: PageEvent = {
      pageIndex: 0,

      pageSize: this.PAGE_SIZE,

      length: this.allTerms.length
    };
    this.changePage(pageEvent);
  }

  alphebeticalComparator(a: GlossaryTerm, b: GlossaryTerm): number {
    return a.term.toLowerCase() > b.term.toLowerCase() ? 1 : (a.term.toLowerCase() < b.term.toLowerCase() ? -1 : 0)
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
        const targetTermIndex: number = this.allTerms.findIndex(term => term.id === selectedTerm.id);
        this.allTerms[targetTermIndex] = { ...result.newTerm, id: selectedTerm.id };
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
          id: Math.floor(Math.random() * 100000).toString(),
        };
        this.allTerms = [...this.allTerms, newTerm];
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
        const targetTermIndex: number = this.allTerms.findIndex(term => term.id === selectedTerm.id);
        this.allTerms = [
          ...this.allTerms.slice(0, targetTermIndex),
          ...this.allTerms.slice(targetTermIndex + 1)
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

  changePage(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.dataSource.data = [...this.allTerms.slice(this.currentPageIndex * this.PAGE_SIZE, this.currentPageIndex * this.PAGE_SIZE + this.PAGE_SIZE)];
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
