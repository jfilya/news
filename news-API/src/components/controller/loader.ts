import { ISourses } from '../../types/IArticlesInterface';
import { status401, status404 } from '../../types/state';

class Loader {
    protected readonly baseLink: string;
    protected readonly options: ISourses;
    constructor(baseLink: string, options: ISourses) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        obj: { endpoint: string; options?: ISourses },
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', obj.endpoint, callback, obj.options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === status401 || res.status === status404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: ISourses, endpoint: string): string {
        const urlOptions: ISourses = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: <T>(data: T) => void, options: ISourses): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
