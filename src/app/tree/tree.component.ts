import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DataInterface, ParsedDataInterface} from '../data.interface';
import {compare} from '../utils/utils';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnChanges {

  @Input() dataSource: DataInterface[];

  public parsedTreeData: ParsedDataInterface[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const sortedTree = this._sortTree(changes.dataSource.currentValue);
    this.parsedTreeData = this._parseTree(sortedTree);
  }


  private _parseTree(tree: DataInterface[], isRoot = true): ParsedDataInterface[] | [] {
    return (tree as ParsedDataInterface[]).map(el => {
      if (el.type === 'folder') {
        el.isOpen = false;

        if (isRoot) {
          el.isRoot = true;
        }
        this._parseTree(el.children, false);
      }

      return el;
    });
  }


  private _sortTree(tree: DataInterface[]): DataInterface[] {
    return tree.sort((a, b) => {
      [a, b].map(el => {
        if (el.type === 'folder') {
          return this._sortTree(el.children);
        }
      });

      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }

      return compare(a.name, b.name);
    });
  }


  public setType(data: ParsedDataInterface): string {
    const types = {
      file: 'insert_drive_file',
      folder: {
        close: 'folder',
        open: 'folder_open'
      }
    };

    if (data.type === 'folder') {
      return data.isOpen ? types.folder.open : types.folder.close;
    }

    return types[data.type];
  }


  private expand(node: ParsedDataInterface): void {
    if (node.type === 'folder') {
      node.isOpen = !node.isOpen;
    }

    if (node.isOpen) {
      node.children = this._closeChildFolders(node.children);
    }
  }


  private _closeChildFolders(nodes: ParsedDataInterface[]): ParsedDataInterface[] {
    return nodes.map(node => {
      if (node.type === 'folder') {
        node.isOpen = false;
        node.children = this._closeChildFolders(node.children);
      }

      return node;
    });
  }
}
