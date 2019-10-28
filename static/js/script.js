function generateUniqueID(length = 25) {
    return fillArray(length)
        .map(() => Math.floor(Math.random() * 62))
        .map(index => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[index])
        .join('');
}

/**
 * Returns an array filled with n zeros.
 *
 * @param n - The size of the array.
 * @returns An array filled with n zeros.
 */
function fillArray(n) {
    // We use this complex but fast method since IE does not support `Array.fill()` nor `Array.from()`
    // See https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
    const arr = [];
    arr.length = n;
    let i = 0;
    while (i < n) {
        arr[i] = 0;
        i += 1;
    }
    return arr;
}

function getFromStore(key) {
    var regex = new RegExp('' + key + '=([^,;]*);');
    var cookieMatcher = document.cookie.match(regex);
    if (cookieMatcher) {
        return cookieMatcher[1];
    }

    if (typeof Storage === 'undefined') {
        return null;
    }

    try {
        return localStorage.getItem(key);
    } catch (err) {
        return null;
    }
}

function putInStore(key, value) {
    document.cookie = '' + key + '=' + value + '; path=/';

    if (typeof Storage !== 'undefined') {
        try {
            localStorage.setItem(key, value);
        } catch (err) {
        }
    }
}

window.addEventListener('load', async () => {

    const id = getFromStore('user-id') || generateUniqueID();
    putInStore('user-id', id);

    await DB.connect('pwa');
    await DB.ready();

    try{
        const cart = await DB.Cart.load(id) || new DB.Cart({ id , elems: []});

        document.querySelectorAll('.add-to-cart').forEach((btn) =>{
            btn.addEventListener('click', async function() {
                const cardinality = document.querySelector('.cardinality');

                const ean = this.dataset.ean;
                cart.elems = cart.elems.concat([ean]);
                await cart.save();

                cardinality.innerHTML = cart.elems.length;
            });
        });
    } catch (error) {
        console.error()
    }

    const recommendations = await DB.modules.get('topProducts', { id });
    const titles = recommendations
        .map(ean => document.querySelector(`#ean${ean} h2`))
        .filter(a => !!a)
        .map(title => `<b>${title.innerHTML}</b>`).join(', ');
    document.querySelector('.recommendations').innerHTML = `<span style="color: red;">The following items are our top sellers!</span> ${titles}`;
});
