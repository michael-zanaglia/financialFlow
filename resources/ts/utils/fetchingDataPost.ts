
export default async function fetchingDataPost(route : string, err : string, body: FormData|null = null, token: string|null = null, method: string = 'POST'){
    console.log(err, token)
    const options: any = { 
            method: method, 
            body: body, 
            headers: {
                'X-CSRF-TOKEN': token
            }
        }
    const response = await fetch(route, options)
    if (!response.ok){
        console.log("Status:",response.status,"Error fetch", err, response)
        throw new Error(`Fetch error: ${err}. Status: ${response.status}`)
    }
    const data = await response.json()
    return data;
}