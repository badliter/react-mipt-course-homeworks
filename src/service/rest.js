const get = async (path) => {
    await wait();
    const response = await fetch(path);

    if (response.status !== 200) {
        throw Error(await response.json());
    }

    return response.json();
};

const post = async (path, body) => {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw Error(await response.json());
    }

    return response.json();
};

const authPost = async (path, body) => {
    const tokens = JSON.parse(localStorage.getItem('AUTH'));
    const token = tokens && tokens.accessToken;

    if (!token) {
        throw Error("Token was notfound");
    }

    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw Error(await response.json());
    }

    return response.json();
};

const wait = () => new Promise(r => setTimeout(r, 0));

export default {
    post,
    authPost,
    get
};
