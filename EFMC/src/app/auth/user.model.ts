export class User{
  constructor(
    public name: string,
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public _roles: string[]) {}


  get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null!;
    }
    return this._token;
  }
}


