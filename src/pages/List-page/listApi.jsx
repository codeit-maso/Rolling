import axios from 'axios';

export async function getList(){
    const response = await axios.get("https://rolling-api.vercel.app/13-2/recipients/");
    const {data} = response;
    return data;
}