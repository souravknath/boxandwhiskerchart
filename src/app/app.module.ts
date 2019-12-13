import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoxAndWhiskerComponent } from './box-and-whisker/box-and-whisker.component';
import { ParentComponent } from './parent/parent.component';
import { StackbarComponent } from './stackbar/stackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    BoxAndWhiskerComponent,
    ParentComponent,
    StackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
