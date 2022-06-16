interface IData {
    urlToImage: string; 
    author: string; 
    source: {id:string; name: string; }; 
    publishedAt: string; 
    title: string; 
    description: string; 
    url: string;
    status: string; 
    totalResults:number; 
    articles:Array<IData>;
    sources:Array<{[key:string]: string}>
}
export default IData;