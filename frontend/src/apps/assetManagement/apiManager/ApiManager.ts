import ENDPOINTS from './EndPoints'

const BASE_URL = 'http://assets.example.com:8000/'

class ApiManager {
    static createAsset = (data: any) => {
        const url:string = BASE_URL + ENDPOINTS.CREATE_ASSET_TYPE();
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

}

export default ApiManager