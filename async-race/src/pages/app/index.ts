import Garage from '../garage';
import Winners from '../winners';
import Page from '../../core/templates/page';
import Header from '../../core/components/header';
import ErrorPage, { ErrorTypes } from '../error';

export const enum PageIds {
  GarageID = 'garage-page',
  WinnersID = 'winners-page',
}

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  private initialPage: Garage;

  private header: Header;

  constructor() {
    this.initialPage = new Garage('garage-page');
    this.header = new Header('header', 'header-container');
  }

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.GarageID) {
      page = new Garage(idPage);
    } else if (idPage === PageIds.WinnersID) {
      page = new Winners(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  run() {
    App.container.append(this.header.render());
    App.renderNewPage('garage-page');
    this.enableRouteChange();
  }
}

export default App;
