import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {ParsedDataInterface} from './data.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  parsedTree: ParsedDataInterface[];

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getTree();
    // this._treeDataHandler();
  }


  // private _treeDataHandler(): void {
  //   this.dataService.treeData.subscribe((tree: DataInterface[]) => {
  //     const sortedTree = this._sortTree(tree);
  //     this.parsedTree = this._parseTree(sortedTree);
  //   });
  // }



}
