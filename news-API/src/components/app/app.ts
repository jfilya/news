import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import IArticles from '../../types/IArticlesInterface';
import IData from '../../types/iDataInterface';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        document
            .querySelector('.sources')
            .addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: IData) => this.view.drawNews(data))
            );
        this.controller.getSources((data: IArticles) => this.view.drawSources(data));
    }
}

export default App;
