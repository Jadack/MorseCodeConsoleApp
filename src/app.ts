import { MorseCode } from 'morse-code-lib';
import readline from 'readline';
import process from 'process';
import chalk from 'chalk';
import figlet from 'figlet';

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
    console.log(chalk.magenta(figlet.textSync('MorseCode', {horizontalLayout: 'full'})));
    console.log('Bienvenido a MorseCode');
    console.log(chalk.green('Seleccione una Opción'));
    console.log(chalk.green('1- Texto a Morse.'));
    console.log(chalk.green('2- Morse a Texto.'));
    console.log(chalk.green('3- Salir.'));

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
    console.log(chalk.magenta('Texto a Morse'));
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
    console.log(chalk.magenta('Morse a Texto'));
    this.readLine.question('Ingresar Código Morse: ', (input: string) => {
      console.log('-lc --lowerCase');
      console.log('-uc --upperCase');
      console.log('-pc --pascalCase');
      this.readLine.question('Seleccionar Convención: ', (_input: string) => {
        _input === '' ? console.log(`${input} = ${this.morseCode.morseDecode(input)}`) : console.log(`${input} = ${this.morseCode.morseDecode(input, _input)}`);
        console.log(' ');
        console.log('¿Desea Repetir?');
        console.log('1- Si.');
        console.log('2- No.');

        this.readLine.question('Opción: ', (input: string) => {
          switch(input.trim()) {
            case '1':
              this.morseToTextMenu();
              break;
            case '2':
              this.init();
              break;
            default:
              this.morseToTextMenu();
          }
        });
      });
    });
  }
}

let morseConsoleApp = new MorseCodeConsoleApp();
morseConsoleApp.init();
