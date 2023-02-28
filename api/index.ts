import request from "@/utils/request";

export const collection_blogs = (params: any) => {
    return request('/api/collectionblogs', { method: 'post', ...params })
}

export const fetch_blog = (params: any) => {
    return request({ 
        url: '/api/fetchblog',
        method: 'post', 
        data: params 
    })
}