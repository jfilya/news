import News from './news/news';
import Sources from './sources/sources';
import IData from './iDataInterface';

export class AppView {
    public sources: Sources;
    public news:News;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data:IData):void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data:IData):void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
