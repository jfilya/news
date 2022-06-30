import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '20a6cfce107d4cdea467e40d19e3b441', // получите свой ключ https://newsapi.org/  3606c2b491374a8bb8c5dc2514462510
        });
    }
}

export default AppLoader;
