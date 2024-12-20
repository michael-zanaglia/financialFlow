export default async function fetchingWithDelGet(route : string, err : string, arg: string|null = null, token: string|null = null, method: string = 'GET'){
    const options: any = { 
            method: method, 
            headers: {
                'X-CSRF-TOKEN': token
            }
        }
    const response = await fetch(route+`/${arg}`, options)
    if (!response.ok){
        console.log("Status:",response.status,"Error fetch", err, response)
        throw new Error(`Fetch error: ${err}. Status: ${response.status}`)
    }
    const data = await response.json()
    return data;
}