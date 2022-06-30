class Loader {
    protected readonly baseLink: string;
    protected readonly options: { apiKey: string };
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        obj: { endpoint: string; options?: object },
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', obj.endpoint, callback, obj.options);
    }

    errorHandler(res: Response): Response {
        type state = 401 | 404;
        const status401: state = 401;
        const status404: state = 404;
        if (!res.ok) {
            if (res.status === status401 || res.status === status404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: object, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: <T>(data: T) => void, options: object): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
