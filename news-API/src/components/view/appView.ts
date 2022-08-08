import News from './news/news';
import Sources from './sources/sources';
import IData from '../../types/iDataInterface';
import IArticles from '../../types/IArticlesInterface';

export class AppView {
    sources: Sources;
    news: News;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IData): void {
        const values: IArticles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: IArticles): void {
        const values: {
            [key: string]: string;
        }[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
