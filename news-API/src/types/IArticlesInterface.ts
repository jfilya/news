interface IArticles {
    urlToImage: string;
    author: string;
    source: ISourse;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    sources: Array<ISourses>;
    content: string;
}

interface ISourse {
    id: string | null;
    name: string;
}

export interface ISourses {
    [key: string]: string;
}
export default IArticles;
