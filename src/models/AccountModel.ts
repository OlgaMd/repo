interface IBase {  
    text: string;
}

export interface IAccount  {
    id: number;
    mark: Array<IBase>;
    type: string;
    login: string;
    password: string;
} 
