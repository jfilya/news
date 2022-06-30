interface IArticles {
    urlToImage: string;
    author: string;
    source: { id: string | null; name: string };
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    sources: Array<{ [key: string]: string }>;
    content: string;
}
export default IArticles;
