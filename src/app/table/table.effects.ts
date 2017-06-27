import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { Action } from '@ngrx/store';


import {
  ReceiveDatatableAction,
  ReceiveDatatableColumnsAction,
  ReceiveRecordsAction,
  TableActionTypes,
  AreRecordsLoadingAction,
  UpdateRowCountAction,
  GetRecordsAction,
  GetDatatableColumnsAction
} from './table.actions';
import { TableService } from './table.service';
import { Datatable } from './table.models';

@Injectable()
export class TableEffects {

  @Effect()
  getDatatable$ = this.actions$
    .ofType(TableActionTypes.GET_DATATABLE)
    .switchMap(action => this.tableService.get_datatable(action.payload)
      .mergeMap(response => {
        const datatable: Datatable = response.json()[0];
        return [
          new ReceiveDatatableAction(datatable),
          new GetRecordsAction(datatable)
        ];
      })
      .catch(error => {
        return of(new ReceiveDatatableAction(error));
      })
    );

  @Effect()
  updateDatatablePagination$ = this.actions$
    .ofType(TableActionTypes.UPDATE_PAGINATION)
    .switchMap(action => this.tableService.update_datatable_pagination(action.payload)
      .mergeMap(response => {
        const datatable: Datatable = response.json()[0];
        return [
          new ReceiveDatatableAction(datatable),
          new GetRecordsAction(datatable)
        ];
      })
      .catch(error => {
        return of(new ReceiveDatatableAction(error));
      })
    );

  @Effect()
  getDatatableColumns$ = this.actions$
    .ofType(TableActionTypes.GET_DATATABLE_COLUMNS)
    .switchMap(action => this.tableService.get_datatable_columns(action.payload)
      .mergeMap(response => {
        return [
          new ReceiveDatatableColumnsAction(response.json()),
        ];
      })
      .catch(error => {
        return of(new ReceiveDatatableColumnsAction(error));
      })
    );


  @Effect()
  updateColumnsVisibility$ = this.actions$
    .ofType(TableActionTypes.UPDATE_COLUMNS_VISIBILITY)
    .switchMap(action => this.tableService.update_columns_visibility(action.payload)
      .mergeMap(response => {
        return [
          new GetDatatableColumnsAction(response.json()[0].table_name),
        ];
      })
      .catch(error => {
        return of(new GetDatatableColumnsAction(action.payload.dataTable));
      })
    );

  @Effect()
  getRecords$: Observable<Action> = this.actions$
    .ofType(TableActionTypes.GET_RECORDS)
    .switchMap(action => this.tableService.get_records(action.payload)
      .mergeMap(response => {
        const rowCountString = response.headers.get('content-range').split('/')[1];
        const rowCount = parseInt(rowCountString, 10);
        return [
          new ReceiveRecordsAction(response.json()),
          new UpdateRowCountAction(rowCount),
          new AreRecordsLoadingAction(false)
        ];
      })
      .catch(error => {
        return of(new ReceiveRecordsAction(error));
      }));

  constructor(private actions$: Actions,
              private tableService: TableService) {
  }
}
