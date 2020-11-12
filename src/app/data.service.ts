import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {DataInterface} from './data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public treeData: BehaviorSubject<DataInterface[]> = new BehaviorSubject([]);

  private url = '/assets/data.json';

  constructor(
    private http: HttpClient
  ) {  }

  public getTree(): void {
    this.http.get<{[key: string]: DataInterface[]}>(this.url).subscribe(data => {
      this.treeData.next(data.tree);
    },
      ((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error: ', err.error.message);
        } else {
          console.log(`Server returned code ${err.status} body ${err.error.message}`);
        }
      })
      );
  }
}
