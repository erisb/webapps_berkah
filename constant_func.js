// const URL_API = 'https://core.danasyariah.id/api';
// export const URL = 'https://core.danasyariah.id';

const URL_API = 'http://127.0.0.1:8001';
export const URL = 'http://127.0.0.1:8001';
export const URL_WEB = 'http://127.0.0.1:3000';
export const API_KEY_TINY = '8nplw6zv2mqvm51m2tzy0ft54v5awfmdbyum242l843zazdn';

// const URL_API = 'https://api.danasyariah.id';
// export const URL = 'https://www.danasyariah.id';

const fetchData = (endpoint = '/', method = 'GET', body) => {
    return fetch(URL_API+endpoint,{
        method : method,
		headers: {
			"Content-Type": "application/json"
		},
        body : body
    });
}

// const fetchData = (endpoint = '/', method = 'GET', auth = '', body,contenttype = 'application/json', timeout=30000) => {
//     return Promise.race([
//         fetch(URL_API+endpoint,{
//             method : method,
//             headers : {
//                 Accept: 'application/json',
//                 'Content-Type': contenttype,
//                 'Authorization' : auth,
//             },
//             body : body,
//         }),
//         new Promise((resolve, reject)=>
//         setTimeout(()=>reject(new Error('timeout')),timeout)
//         )
//     ]);
// }

export default fetchData;
