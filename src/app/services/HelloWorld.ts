class HelloWorld {
  constructor(public nom: string) { }
  direBonjour() {
    return this.nom;
  }
}

let hello = new HelloWorld('>>> Bonjour TypeScript');
let s = hello.direBonjour();
console.log(s);
