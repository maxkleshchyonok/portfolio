import Page from '../../core/templates/page';
import { CarType, CreateCar, UpdateCar } from '../../core/types/types';
import { CarsArray } from '../../assets/cars/carsArray';
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
        console.log(result);
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

          selectButton.addEventListener('click', () => {
            localStorage.setItem('selectedCarId', `${item.id}`);
            selectButton.classList.toggle('selected');
            updateNameInput.placeholder = `${item.name}`;
            updateColorInput.value = `${item.color}`;
          });

          removeButton.addEventListener('click', async () => {
            const response = await fetch(`http://127.0.0.1:3000/garage/${item.id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });

            response.json().then(data => {
              console.log(data);
            });
          });

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

            const response = await fetch(`http://127.0.0.1:3000/engine?id=${item.id}&status=started`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
            });
            const res = await response.json();
            console.log(res);
            carImage.style.transition = `${res.distance / res.velocity + 0.5 }ms ease`;
            carImage.style.transform = `translate(${res.distance / 365}%, 0)`;
          });

          stopButton.addEventListener('click', async () => {

            const response = await fetch(`http://127.0.0.1:3000/engine?id=${item.id}&status=stopped`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
            });
            const resultStop = await response.json();
            console.log(resultStop);
            carImage.style.transition = 'none';
            carImage.style.transform = 'none';
          });

          carName.innerText = item.name;
          carImage.src = CarsArray[Math.floor(Math.random() * CarsArray.length)];
          carImage.style.maskImage = '(red)';
          raceImages.append(carImage, finishImage);
          car.append(infoButtons, controlButtons, raceImages, road);
          garageBlock.append(car);
        });
      });
    const raceAllButton = document.createElement('div');
    const raceAllImg = document.createElement('img');
    const raceAllText = document.createElement('h3');
    raceAllButton.className = 'race-all-button';
    raceAllImg.className = 'race-all-img';
    raceAllText.className = 'race-all-text';

    raceAllImg.src = 'https://cdn-icons-png.flaticon.com/512/740/740842.png';
    raceAllText.innerText = 'Race!';

    raceAllImg.addEventListener('mouseenter', () => {
      raceAllText.innerText = 'RACE!!!';
    });
    raceAllImg.addEventListener('mouseout', () => {
      raceAllText.innerText = 'Race!';
    });

    raceAllButton.append(raceAllImg, raceAllText);

    const formBlock = document.createElement('div');
    const createForm = document.createElement('form');
    const nameInput = document.createElement('input');
    const colorInput = document.createElement('input');
    const submitButton = document.createElement('button');
    formBlock.className = 'form-block';
    createForm.className = 'create-form';
    nameInput.className = 'name-input';
    colorInput.className = 'color-input';
    submitButton.className = 'create-submit-button';

    submitButton.innerText = 'Create';

    nameInput.type = 'text';
    nameInput.placeholder = 'Car name...'
    colorInput.type = 'color';
    colorInput.value = '#ba2191';

    let carCreateData: CreateCar = {
      name: '',
      color: '',
    };

    nameInput.addEventListener('input', () => {
      console.log(nameInput.value);
      carCreateData.name = nameInput.value;
    });

    colorInput.addEventListener('input', () => {
      console.log(colorInput.value);
      carCreateData.color = colorInput.value
    });

    const updateForm = document.createElement('form');
    const updateNameInput = document.createElement('input');
    const updateColorInput = document.createElement('input');
    const submitUpdate = document.createElement('button');
    updateForm.className = 'update-form';
    updateNameInput.className = 'update-name-input';
    updateColorInput.className = 'update-color-input';
    submitUpdate.className = 'submit-update-button';

    updateNameInput.type = 'text';
    updateNameInput.placeholder = 'New name...'
    updateColorInput.type = 'color';
    submitUpdate.innerText = 'Update';

    let carUpdateData: UpdateCar = {
      name: '',
      color: '',
    };

    updateNameInput.addEventListener('input', () => {
      carUpdateData.name = updateNameInput.value;
    });

    updateColorInput.addEventListener('input', () => {
      carUpdateData.color = updateColorInput.value;
    });

    submitUpdate.addEventListener('click', async () => {
      const response = await fetch(`http://127.0.0.1:3000/garage/${localStorage.getItem('selectedCarId')}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carUpdateData),
      });

      response.json().then(data => {
        console.log(data);
      });
    });

    updateForm.append(updateNameInput, updateColorInput, submitUpdate);
    createForm.append(nameInput, colorInput, submitButton);
    formBlock.append(createForm, updateForm);

    submitButton.addEventListener('click', async () => {
      const response = await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carCreateData),
      });

      response.json().then(data => {
        console.log(data);
      });
    });

    const garageHeader = document.createElement('div');
    garageHeader.className = 'garage-header';
    garageHeader.append(raceAllButton, formBlock);
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
