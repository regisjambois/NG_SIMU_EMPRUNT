import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

import { Chart }                    from 'chart.js';

import { InputTextModule,
         ButtonModule,
         DataTableModule,
         DialogModule,
         PanelModule,
         TabViewModule,
         ChartModule }              from 'primeng/primeng';



import { AppComponent }             from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTableModule,
    HttpModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    TabViewModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
