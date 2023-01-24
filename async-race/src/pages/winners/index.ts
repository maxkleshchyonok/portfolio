import Page from '../../core/templates/page';
import { WinnersStat } from '../../core/types/types';
import './index.scss';


class Winners extends Page {
  static TextObject = {
    MainTitle: 'Winners Page',
  };

  private async renderWinnersList() {
    const winnersList = document.createElement('ol');
    winnersList.className = 'winners-table';
    winnersList.id = 'table';
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

    async function createTableItems(arr: WinnersStat[]) {
      const tableArr = arr;
      for (const el of tableArr) {
        const listItem = document.createElement('li');
        const id = document.createElement('h1');
        const time = document.createElement('h1');
        const wins = document.createElement('h1');
        listItem.className = 'table-item';
        id.className = 'item-id';
        time.className = 'item-time';
        wins.className = 'item-wins';
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
        carName.className = 'item-name';
        carName.innerText = infoRes.name;

        const car = document.createElement('img');
        car.className = 'car-image';
        car.src = 'https://www.svgrepo.com/show/14671/car-trip.svg';
        car.style.filter = 'invert(76%) sepia(36%) saturate(3725%) hue-rotate(1deg) brightness(105%) contrast(98%)';

        listItem.append(id, car, carName, time, wins);
        winnersList.append(listItem);
      }
    }

    this.container.append(winnersList);

    const sortByTime = document.createElement('button');
    sortByTime.className = 'sort-time';
    sortByTime.innerText = 'Best time';

    sortByTime.addEventListener('click', () => {
      winnersArray.sort((a, b) => a.time > b.time ? 1 : -1);
      //console.log(winnersArray);
      createTableItems(winnersArray);
      sortByTime.remove();
    });

    const sortByWins = document.createElement('button');
    sortByWins.className = 'sort-wins';
    sortByWins.innerText = 'Best wins';

    sortByWins.addEventListener('click', () => {
      winnersArray.sort((a, b) => a.wins < b.wins ? 1 : -1);
      //console.log(winnersArray);
      createTableItems(winnersArray);
      sortByWins.remove();
    });

    const allInfo = document.createElement('button');
    allInfo.className = 'all-info';
    allInfo.innerText = 'Show all';

    allInfo.addEventListener('click', () => {
      createTableItems(winnersArray);
      allInfo.remove();
    });

    this.container.append(sortByTime, sortByWins, allInfo);

  }

  render() {
    const title = this.createHeaderTitle(Winners.TextObject.MainTitle);
    this.container?.append(title);
    this.renderWinnersList();
    return this.container;
  }
}

export default Winners;
