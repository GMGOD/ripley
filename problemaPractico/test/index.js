var axios = require('axios');

var config = {
    method: 'post',
    url: 'https://startup.bolsadesantiago.com/api/consulta/ClienteMD/getPuntasRV',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    params: {
        "access_token": "158516D931F24DC894F237DCF4B21EE8"
    },
    json: {
    },
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error.toString());
    });
