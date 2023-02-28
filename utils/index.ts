export const checkVideo = (url: string) => {
    const reg = /.mp4/

    return reg.test(url)
}

export const showAddress = (addr: string, len: number) => {
    if (!addr) return;
    const showLen = len * 2
    const ellipsisLen = 2
    return `${addr.slice(0,(showLen - ellipsisLen) / 2)}...${addr.slice(addr.length - (showLen - ellipsisLen) / 2, addr.length)}`
}

export const useCopy = () => {
    const copy = (text: string) => {
        let oInput = document.createElement('input');
        oInput.value = text;
        document.body.appendChild(oInput);
        oInput.select(); // ;
        document.execCommand('Copy'); //
        oInput.remove();
    }
    return copy;
}