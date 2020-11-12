
export interface DataInterface {
  name: string;
  type: string;
  children?: DataInterface[];
}

export interface ParsedDataInterface {
  name: string;
  type: string;
  children?: ParsedDataInterface[];
  isOpen: boolean;
  isRoot?: boolean;
}


