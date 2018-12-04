import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule, MatButtonModule, MatToolbarModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [MatCardModule, MatButtonModule, MatToolbarModule, DragDropModule, ScrollingModule, HttpClientModule],
  exports: [MatCardModule, MatButtonModule, MatToolbarModule, DragDropModule, ScrollingModule, HttpClientModule]
})
export class ShareMeterialModule { }
