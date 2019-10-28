exports.get = async function(db, req, res) {
    await new Promise(res => setTimeout(res, 2500));
    res.contentType('text/html; charset=utf-8')

    let html;
    if (req.url.includes('portals')) {
        html = await getFile('portals.html', db);
    } else {
        html = await getFile('index.html', db);
    }

    const userId = getUserId(req.header('cookie') || '');
    const cardinality = await getCardinality(userId, db);
    if (cardinality) {
        html = html.replace(`<span class="cardinality">`, `<span class="cardinality">${cardinality}`)
    }

    return res.send(html)
};

async function getFile(name, db) {
    const file = new db.File({ path: `/www/${name}`});
    return await file.download({ type: 'text' });
}

async function getCardinality(userId, db) {
    const cart = await db.Cart.load(userId);

    if (!cart) {
        return 0;
    }

    return cart.elems.length;
}

function getUserId(cookies) {
    const cookieList = cookies.split(';');

    const userIdCookie = cookieList.find(cookie => cookie.match(/^\s*user-id=(.*)$/));

    if (!userIdCookie) {
        return null;
    }

    return userIdCookie.match(/^\s*user-id=(.*)$/)[1];
}
