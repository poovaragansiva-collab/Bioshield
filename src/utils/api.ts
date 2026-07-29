const API_URL =
"https://poovaragan12.app.n8n.cloud/webhook/dashboard";


export async function fetchIncidents(){

    const response = await fetch(API_URL);

    if(!response.ok){
        throw new Error("Failed fetching incidents");
    }

    const data = await response.json();

    return data;

}
