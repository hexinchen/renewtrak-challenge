import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GlossaryTableComponent } from './glossary-table/glossary-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlossaryPageComponent } from './glossary-page/glossary-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddNewTermDialogComponent } from './add-new-term-dialog/add-new-term-dialog.component';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WarningPopUpComponent } from './warning-pop-up/warning-pop-up.component';
import { FlexLayoutModule } from "@angular/flex-layout";





@NgModule({
  declarations: [
    AppComponent,
    GlossaryTableComponent,
    GlossaryPageComponent,
    AddNewTermDialogComponent,
    WarningPopUpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
