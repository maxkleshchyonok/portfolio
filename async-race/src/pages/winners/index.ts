import Page from '../../core/templates/page';
import { WinnersStat } from '../../core/types/types';

class Winners extends Page {
  static TextObject = {
    MainTitle: 'Winners Page',
  };

  private async renderWinnersList() {
    const winnersList = document.createElement('ol');
    const winners = await fetch('http://127.0.0.1:3000/winners', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const winnersRes = await winners.json();
    const winnersArray: WinnersStat[] = [];
    winnersRes.forEach((el: WinnersStat) => {
      winnersArray.push(el);
    });
    for (const el of winnersArray) {
      const listItem = document.createElement('li');
      const id = document.createElement('h1');
      const time = document.createElement('h1');
      const wins = document.createElement('h1');
      id.innerText = `id : ${el.id.toString()}`;
      time.innerText = `time : ${el.time.toString()}`;
      wins.innerText = `wins : ${el.wins.toString()}`;

      const infoCar = await fetch(`http://127.0.0.1:3000/garage/${el.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const infoRes = await infoCar.json();
      const carName = document.createElement('h1');
      carName.innerText = infoRes.name;

      //const carURL = '../../assets/elements/car-trip.svg';
     // const svgHTML = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
     // const useHTML = document.createElementNS('http://www.w3.org/2000/svg', 'use');
     // svgHTML.append(useHTML);
     //  useHTML.setAttributeNS('http://www.w3.org/1999/xlink', `xlink:href`, `${carURL}#car`);
     // svgHTML.style.fill = 'red';

      const car = document.createElement('img');
      car.src = 'https://www.svgrepo.com/show/14671/car-trip.svg';
      car.style.filter = 'invert(76%) sepia(36%) saturate(3725%) hue-rotate(1deg) brightness(105%) contrast(98%)';

      listItem.append(id, car, carName, time, wins);
      winnersList.append(listItem);
    }
    this.container.append(winnersList);
  }

  render() {
    const title = this.createHeaderTitle(Winners.TextObject.MainTitle);
    this.container?.append(title);
    this.renderWinnersList();
    return this.container;
  }
}

export default Winners;
