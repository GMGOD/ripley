import requests

def __response():
    params = {
        'access_token': ''
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    query_params = {}
    timeout = 300
    endpoint = 'https://startup.bolsadesantiago.com/api/consulta/ClienteMD/getIndicesRV'
    
    resp = requests.post(endpoint, params=params, headers=headers, json=query_params, timeout=timeout)
    
    if resp.status_code == 200:
         if 'listaResult' in resp.json().keys():
             return resp.json()['listaResult']
         else:
             return resp.json()
    else:
        resp.raise_for_status()
            
print(_response())