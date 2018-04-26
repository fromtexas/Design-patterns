class HttpClient {
    get (url) {
        return fetch(url).then(response => response.json());
    }
}

class PostsService {
    configure (config) {
        this.configureHttpClient(config);
        this.configureEndpoints(config);
    }

    configureHttpClient (config) {
        if(!config.httpClient){
            throw new Error('HttpClient not configured');
        }
        this.httpClient = config.httpClient;
    }

    configureEndpoints (config) {
        if(!config.endpoints || !config.endpoints.posts || !config.endpoints.comments){
            throw new Error('Endpoints not configured');
        }
        this.postsEndpoints = config.endpoints.posts;
        this.commentsEndpoints = config.endpoints.comments;
    }

    getPosts () {
        this.httpClient.get(this.postsEndpoints);
    }

    getComments () {
        this.httpClient.get(this.commentsEndpoints);
    }
}

class PostsServiceFactory {
    prepareInstance () {
        let config = {
            httpClient: new HttpClient(),
            endpoints: {
                posts: 'http://jsonplaceholder.typicode.com/posts',
                comments: 'http://jsonplaceholder.typicode.com/comments'
            }
        }
        this.postsService = new PostsService();
        this.postsService.configure(config);
    }

    getInstance () {
        if(!this.postsService){
            this.prepareInstance();
        }
        return this.postsService;
    }
}

let postsServiceFactory = new PostsServiceFactory();
let postsService = postsServiceFactory.getInstance();
postsService.getPosts().then(posts => console.log('Posts: ', posts));
postsService.getComments().then(comments => console.log('Comments: ', comments));