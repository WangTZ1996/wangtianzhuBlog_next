import request from "@/utils/request";
import axios from "axios";

export const collection_blogs = (params: any) => {
    return request({ 
        url: '/api/collectionblogs', 
        method: 'post', 
        data: params 
    })
}

export const origin_blogs = (params: any) => {
    return request({ 
        url: '/api/originalblogs', 
        method: 'post', 
        data: params 
    })
}

export const origin_blog = (params: any) => {
    return request({ 
        url: '/api/originalblog', 
        method: 'post', 
        data: params 
    })
}

export const origin_blog_from_chain = (params: any) => {
    return request({
        url: '/api/originalblogFormChain', 
        method: 'post', 
        data: params 
    })
}

export const fetch_blog = (params: any) => {
    return request({ 
        url: '/api/fetchblog',
        method: 'post', 
        data: params 
    })
}

export const testChatGPT = async (prompt: string) => {

    const response = await axios.post('https://api.openai.com/v1/completions', {
        prompt,
        max_tokens: 1000,
        model: "text-davinci-003"
    }, 
    {
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer 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',
            'OpenAI-Organization': 'org-59LRnRGLMms22ZtuMyTacrRB'
        }
    }
    )

    return response.data
}

export const testTempMail = async () => {
    return request({ 
        url: '/api/tempMail',
        method: 'post', 
        data: {} 
    })
}

export const coinMarket = async () => {
    return request({
        url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=250&x_cg_demo_api_key=CG-91QHTZtYa7ubJeG2uc6GsZ9j',
        method: 'get'
    })
}

export const coinList_api = async () => {
    return request({
        url: 'https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-91QHTZtYa7ubJeG2uc6GsZ9j',
        method: 'get'
    })
}

export const goerli_faucet = async (address: string) => {
    return request({ 
        url: '/api/goerli_faucet',
        method: 'post', 
        data: { address: address } 
    })
}