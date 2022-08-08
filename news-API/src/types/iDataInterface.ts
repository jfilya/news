import IArticles from './IArticlesInterface';
interface IData {
    status: string;
    totalResults: number;
    articles: Array<IArticles>;
}
export default IData;
