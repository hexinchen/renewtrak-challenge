import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GlossaryTableComponent } from './glossary-table/glossary-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GlossaryPageComponent } from './glossary-page/glossary-page.component';

@NgModule({
  declarations: [
    AppComponent,
    GlossaryTableComponent,
    GlossaryPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
