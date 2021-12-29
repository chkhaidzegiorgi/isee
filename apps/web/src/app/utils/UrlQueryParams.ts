export class UrlQueryParams {
    private params = '';

    constructor(obj: any) {
        let count = 0;
        // eslint-disable-next-line guard-for-in
        for (const key in obj) {
            if (
                obj[key] !== undefined &&
                obj[key] !== null &&
                obj[key] !== 'undefined' &&
                obj[key] !== 'null'
            ) {
                if (count !== 0) {
                    this.params += '&';
                }
                if (Array.isArray(obj[key])) {
                    for (const item of obj[key]) {
                        this.params += key;
                        this.params += '=';
                        this.params += item;
                        if (obj[key].indexOf(item) < obj[key].length - 1) {
                            this.params += '&';
                        }
                    }
                } else {
                    this.params += key;
                    this.params += '=';
                    this.params += obj[key];
                }
                count++;
            }
        }
    }

    toString() {
        return this.params.toString();
    }
}
