import Q from 'q';

export class GameLoop {
    constructor() {

    }

    Run(): void {
        this.Pre()
        .then(r => { console.log(r); return this.Main(r)})
        .then(r => { return this.Post(r); })
        .then(r => console.log("Game Loop Complete", r))
        .catch(e => {
            throw new Error(e);
        })
    }

    Pre(): Q.Promise<any> {
        console.log('Pre Loop');
        let deferred =  Q.defer();
        
        deferred.resolve(1);

        return deferred.promise;
    }

    Main(r: any): Q.Promise<any> {
        console.log('Main Loop');
        let deferred =  Q.defer();

        deferred.resolve(r + 1);

        return deferred.promise;
    }

    Post(r: any): Q.Promise<any> {
        console.log('Post Loop');
        let deferred =  Q.defer();

        deferred.resolve(r + 1);

        return deferred.promise;
    }
}