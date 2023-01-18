import Page from '../../core/templates/page';
import { CarType } from '../../core/types/types';
import { CarsArray } from "../../assets/cars/carsArray";
import './index.css';

class Garage extends Page {

  static TextObject = {
    MainTitle: 'Garage page',
  };


  private createGarage() {

    const garageBlock = document.createElement('div');
    garageBlock.className = 'garage-block';
    fetch('http://127.0.0.1:3000/garage')
        .then(response => response.json())
        .then(result => {
          console.log(result)
          result.forEach((item: CarType) => {
            console.log(item);
            const car = document.createElement('div');
            car.className = 'car-block';

            const infoButtons = document.createElement('div');
            const selectButton = document.createElement('button');
            const removeButton = document.createElement('button');
            const carName = document.createElement('h2');
            infoButtons.className = 'info-buttons';
            selectButton.className = 'select-button';
            removeButton.className = 'remove-button';
            selectButton.innerText = 'Select';
            removeButton.innerText = 'Remove';
            carName.className = 'car-name';


            infoButtons.append(selectButton, removeButton, carName);

            const controlButtons = document.createElement('div');
            const startButton = document.createElement('button');
            const stopButton = document.createElement('button');
            controlButtons.className = 'control-buttons';
            startButton.className = 'start-button';
            stopButton.className = 'stop-button';
            startButton.innerText = 'Start';
            stopButton.innerText = 'Stop';
            controlButtons.append(startButton, stopButton);

            const raceImages = document.createElement('div');
            const carImage = document.createElement('img');
            const finishImage = document.createElement('img');
            const road = document.createElement('div');
            raceImages.className = 'race-images';
            carImage.className = 'car-image';
            finishImage.className = 'finish-image';
            finishImage.src = 'https://i.pinimg.com/originals/c4/02/71/c40271fd53a764efd9977469270398af.png';
            road.className = 'road';

            startButton.addEventListener('click', async () => {

              let response = await fetch(`http://127.0.0.1:3000/engine?id=${item.id}&status=started`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
              });
              let result = await response.json();
              console.log(result);
              carImage.style.transition = `${result.distance/result.velocity + 0.5 }ms ease`;
              carImage.style.transform = `translate(${result.distance / 365}%, 0)`;
            });

            stopButton.addEventListener('click', async () => {

              let response = await fetch(`http://127.0.0.1:3000/engine?id=${item.id}&status=stopped`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
              });
              let result = await response.json();
              console.log(result);
              carImage.style.transition = 'none';
              carImage.style.transform = 'none';
            });

            carName.innerText = item.name;
            carImage.src = CarsArray[Math.floor(Math.random() * CarsArray.length)];
            raceImages.append(carImage, finishImage);
            car.append(infoButtons, controlButtons, raceImages, road);
            garageBlock.append(car);
          })
        });
    const raceAllButton = document.createElement('div');
    const raceAllImg = document.createElement('img');
    const raceAllText = document.createElement('h3');
    raceAllButton.className = 'race-all-button';
    raceAllImg.className = 'race-all-img';
    raceAllText.className = 'race-all-text';

    raceAllImg.src = 'https://cdn-icons-png.flaticon.com/512/740/740842.png';
    raceAllText.innerText = 'Race!';
    raceAllButton.append(raceAllImg, raceAllText);

    const garageHeader = document.createElement('div');
    garageHeader.className = 'garage-header';
    garageHeader.append(raceAllButton)
    this.container.append(garageHeader, garageBlock);
  }

  render() {
    const title = this.createHeaderTitle(Garage.TextObject.MainTitle);
    this.container.append(title);
    this.createGarage();
    return this.container;
  }
}

export default Garage;
