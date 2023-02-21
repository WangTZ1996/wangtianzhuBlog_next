export const checkVideo = (url: string) => {
    const reg = /.mp4/

    return reg.test(url)
}