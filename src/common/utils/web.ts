const getData = async (url = "", headers: Record<string, string> = {}, clearDefaultHeaders = false) => {
    const response = await fetch(url, {
            method: "GET",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: Object.assign(clearDefaultHeaders ? {} : {
                    "Content-Type": "application/json",
                },
                headers
            ),
            redirect: "follow",
            referrerPolicy: "same-origin",
        });
    return response;
}

const postData = async (url = "", headers: Record<string, string> = {}, data: Record<string, string> = {}, clearDefaultHeaders = false) => {
    const response = await fetch(url, {
            method: "POST",
            mode: "same-origin",
            cache: "no-cache",
            credentials: "same-origin",
            headers: Object.assign(clearDefaultHeaders ? {} : {
                    "Content-Type": "application/json"
                },
                headers
            ),
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });
    return response;
}

export {
    getData,
    postData
}