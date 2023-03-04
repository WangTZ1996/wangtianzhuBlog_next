import request from "@/utils/request";

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

export const fetch_blog = (params: any) => {
    return request({ 
        url: '/api/fetchblog',
        method: 'post', 
        data: params 
    })
}