import Page from '../../core/templates/page';
import { CarsInfo, CarType, CreateCar, EachCar, UpdateCar, WinArr, WinnersStat } from '../../core/types/types';
import { CarsArray } from '../../assets/cars/carsArray';
import './index.css';

class Garage extends Page {

  static TextObject = {
    MainTitle: 'Garage page',
  };


  private createGarage() {

    const garageBlock = document.createElement('div');
    garageBlock.className = 'garage-block';


    const carsInfo: CarsInfo[] = [];
    let eachRaceInfo: EachCar[] = [];

    fetch('http://127.0.0.1:3000/garage')
      .then(response => response.json())
      .then(result => {
        //console.log(result);
        result.forEach((item: CarType) => {
          //console.log(item);

          const car = document.createElement('div');
          car.className = 'car-block';

          const infoButtons = document.createElement('div');
          const selectButton = document.createElement('button');
          const removeButton = document.createElement('button');
          const carName = document.createElement('h2');
          carName.id = item.name;
          infoButtons.className = 'info-buttons';
          selectButton.className = 'select-button';
          removeButton.className = 'remove-button';
          selectButton.innerText = 'Select';
          removeButton.innerText = 'Remove';
          carName.className = 'car-name';



          selectButton.addEventListener('click', () => {
            localStorage.setItem('selectedCarId', `${item.id}`);
            selectButton.classList.toggle('selected');
            localStorage.setItem('updateNamePlaceholder', item.name);
            localStorage.setItem('updateColorPlaceholder', item.color);
          });

          removeButton.addEventListener('click', async () => {
            await fetch(`http://127.0.0.1:3000/garage/${item.id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });

            // response.json().then(data => {
            //   //console.log(data);
            // });
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
          carImage.id = item.id.toString(10);
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
            //console.log(res);
            carImage.style.transition = `${res.distance / res.velocity + 0.5 }ms ease`;
            carImage.style.transform = `translate(${res.distance / 365}%, 0)`;
          });

          stopButton.addEventListener('click', async () => {

            await fetch(`http://127.0.0.1:3000/engine?id=${item.id}&status=stopped`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
            });
            //const resultStop = await response.json();
            //console.log(resultStop);
            carImage.style.transition = 'none';
            carImage.style.transform = 'none';
          });

          carName.innerText = item.name;
          carImage.src = CarsArray[Math.floor(Math.random() * CarsArray.length)];

          const infoEl = {
            name: item.name,
            color: item.color,
            image: carImage.src,
            id: item.id,
          };


          carsInfo.push(infoEl);

          // localStorage.setItem(`${item.name}`, `${carImage.src}`)
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

    const winBanner = document.createElement('div');
    const winBannerText = document.createElement('h1');
    const winBannerImg = document.createElement('img');
    winBannerImg.className = 'win-banner-img';
    winBanner.className = 'win-banner';
    winBannerText.className = 'win-banner-text';
    winBanner.append(winBannerText, winBannerImg);
    let winArr: WinArr[] = [];



    raceAllImg.addEventListener('click', async () => {
      //console.log(carsInfo, 'это карс инфо');


      const urls: string[] = [];
      const carDetails = new Map();

      carsInfo.forEach(el => {
        const url = `http://127.0.0.1:3000/engine?id=${el.id}&status=started`;
        urls.push(url);
        carDetails.set(url, el.id);
      });
      //console.log(urls);
      //console.log(carDetails);


      await Promise.all(urls.map(async url => {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        });
        const res = await response.json();
        //console.log(res, carDetails.get(url));

        const eachCar = {
          id: carDetails.get(url),
          velocity: res.velocity,
          distance: res.distance,
        };

        eachRaceInfo.push(eachCar);

        const winDetails: WinArr = {
          velocity: res.velocity,
          id: carDetails.get(url),
        };

        winArr.push(winDetails);

        const carID = carDetails.get(url);

        const car = document.getElementById(carID.toString());
        car!.style.transition = `${res.distance / res.velocity + 0.5 }ms ease`;
        car!.style.transform = `translate(${res.distance / 365}%, 0)`;
      }));
      //console.log(winArr, 'это винар');

      const winnersStat: WinnersStat[] = [];

      function showWin() {
        winBanner.style.display = 'flex';
        //console.log(winArr.sort((a, b) => a.velocity < b.velocity ? 1 : -1), 'это сорт винар');
        winArr.sort((a, b) => a.velocity < b.velocity ? 1 : -1);
        //console.log(winArr[0].id);
        //console.log(document.getElementById(winArr[0].id.toString()));

        //console.log(eachRaceInfo, 'это тот самый массив');

        carsInfo.forEach(el => {
          if (el.id === winArr[0].id) {
            winBannerText.innerText = `WINNER: ${document.getElementById(el.name)!.innerText}!`;
            winBannerImg.src = el.image;
            eachRaceInfo.forEach(async item => {
              if (item.id === el.id) {
                const time = (Math.round(item.distance / item.velocity) / 1000) + 0.5;
                const winnerCar = {
                  id: item.id,
                  time: time,
                  wins: 1,
                };
                winnersStat.push(winnerCar);
                //console.log(winnersStat);

                const response = await fetch(`http://127.0.0.1:3000/winners/${item.id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                  },
                });
                //console.log(response.status);

                if (response.status === 404) {
                  await fetch('http://127.0.0.1:3000/winners', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(winnerCar),
                  });
                  //const res = await createWinner.json();
                  //console.log(res);
                } else if (response.status === 200) {
                  const itemInfo = await response.json();
                  const wins = itemInfo.wins + 1;
                  const newTime = itemInfo.time;
                  let updateTime = 0;
                  if (newTime < time) {
                    updateTime += newTime;
                  } else if (newTime > time) {
                    updateTime += time;
                  }
                  const updatedData = {
                    wins: wins,
                    time: updateTime,
                  };
                  await fetch(`http://127.0.0.1:3000/winners/${item.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify(updatedData),
                  });
                  //const resUpd = await updateWinner.json();
                  //console.log(resUpd);
                }

              }
            });
          }
        });
        function close() {
          winBanner.style.display = 'none';
        }
        setTimeout(close, 5000);
      }
      setTimeout(showWin, 7000);
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
    nameInput.placeholder = 'Car name...';
    colorInput.type = 'color';
    colorInput.value = '#ba2191';

    const carCreateData: CreateCar = {
      name: '',
      color: '',
    };

    nameInput.addEventListener('input', () => {
      //console.log(nameInput.value);
      carCreateData.name = nameInput.value;
    });

    colorInput.addEventListener('input', () => {
      //console.log(colorInput.value);
      carCreateData.color = colorInput.value;
    });

    const updateForm = document.createElement('form');
    const updateNameInput = document.createElement('input');
    const updateColorInput = document.createElement('input');
    const submitUpdate = document.createElement('button');
    updateForm.className = 'update-form';
    updateNameInput.className = 'update-name-input';
    updateColorInput.className = 'update-color-input';
    submitUpdate.className = 'submit-update-button';

    updateNameInput.placeholder = localStorage.getItem('updateNamePlaceholder')!;
    updateColorInput.value = localStorage.getItem('updateColorPlaceholder')!;

    updateNameInput.type = 'text';
    updateNameInput.placeholder = 'New name...';
    updateColorInput.type = 'color';
    submitUpdate.innerText = 'Update';

    const carUpdateData: UpdateCar = {
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
      await fetch(`http://127.0.0.1:3000/garage/${localStorage.getItem('selectedCarId')}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carUpdateData),
      });

      // response.json().then(data => {
      //   //console.log(data);
      // });
    });

    updateForm.append(updateNameInput, updateColorInput, submitUpdate);
    createForm.append(nameInput, colorInput, submitButton);
    formBlock.append(createForm, updateForm);

    submitButton.addEventListener('click', async () => {
      await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carCreateData),
      });

      // response.json().then(data => {
      //   //console.log(data);
      // });
    });

    const resetButton = document.createElement('button');
    const resetButtonImg = document.createElement('img');
    const resetButtonText = document.createElement('h1');
    resetButtonText.innerText = 'Race again!';
    resetButtonImg.src = 'https://freesvg.org/img/refresh.png';
    resetButton.className = 'reset-button';
    resetButton.append(resetButtonImg, resetButtonText);

    resetButton.addEventListener('click', () => {
      winArr = [];
      eachRaceInfo = [];
      carsInfo.forEach(el => {
        const car = document.getElementById(el.id.toString());
        car!.style.transform = 'none';
        car!.style.transition = 'none';
      });
    });

    const garageHeader = document.createElement('div');
    garageHeader.className = 'garage-header';
    garageHeader.append(resetButton, raceAllButton, formBlock);
    this.container.append(garageHeader, winBanner, garageBlock);
  }

  render() {
    const title = this.createHeaderTitle(Garage.TextObject.MainTitle);
    this.container.append(title);
    this.createGarage();
    return this.container;
  }
}

export default Garage;
