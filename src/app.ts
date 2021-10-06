import { MorseCode } from 'morse-code-lib';
import * as readline from 'readline';
import * as process from 'process';

export class MorseCodeConsoleApp {

  morseCode: MorseCode;
  readLine: any;
  constructor() { 
    this.morseCode = new MorseCode();
    this.readLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  init() {
    console.clear();
    console.log('Bienvenido a MorseCode');
    console.log('Seleccione una Opción');
    console.log('1- Texto a Morse.');
    console.log('2- Morse a Texto.');
    console.log('3- Salir.');

    this.readLine.question('Opción: ', (input: string) => {
      switch(input.trim()) {
        case '1':
          this.textToMorseMenu();
          break;
        case '2':
          this.morseToTextMenu();
          break;
        case '3':
          process.exit();
        default:
          this.init();
      }
    });
  }

  textToMorseMenu() {
    console.clear();
    console.log('Texto a Morse');
    this.readLine.question('Ingresar Texto: ', (input: string) => {
      this.readLine.question('Ingresar Separador: ', (_input: string) => {
        _input === '' ? console.log(`${input} = ${this.morseCode.morseEncode(input)}`) : console.log(`${input} = ${this.morseCode.morseEncode(input, _input)}`);
        console.log(' ');
        console.log('¿Desea Repetir?');
        console.log('1- Si.');
        console.log('2- No.');

        this.readLine.question('Opción: ', (input: string) => {
          switch(input.trim()) {
            case '1':
              this.textToMorseMenu();
              break;
            case '2':
              this.init();
              break;
            default:
              this.textToMorseMenu();
          }
        });
      });
    });
  }
  morseToTextMenu() {
    console.clear();
    console.log('Opción no disponible');
    console.log(' ');
    console.log('¿Qué desea hacer?');
    console.log('1- Menú Principal.');
    console.log('2- Salir.');

    this.readLine.question('Opción: ', (input: string) => {
      switch(input.trim()) {
        case '1':
          this.init();
          break;
        case '2':
          process.exit();
          break;
        default:
          this.init();
      }
    });
  }
}

let morseConsoleApp = new MorseCodeConsoleApp();
morseConsoleApp.init();
