class Loader {
    protected readonly baseLink:string;
    protected readonly options: {apiKey:string};
    constructor(baseLink:string, options: {apiKey:string}) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(obj:{ endpoint:string, options?: {} },
        callback = ():void => {
            console.error('No callback for GET response');
        }
    ):void {
        this.load('GET', obj.endpoint, callback, obj.options);
    }

    errorHandler(res:Response):Response {
        type state = 401 | 404;
        let status401: state = 401
        let status404: state = 404
        if (!res.ok) {
            if (res.status === status401 || res.status === status404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: {}, endpoint: string):string {
        const urlOptions:{[key:string]:string} = { ...this.options, ...options };
        let url:string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method:string, endpoint:string, callback:Function, options: {}):void{
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
