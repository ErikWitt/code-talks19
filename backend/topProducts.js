exports.call = async function(db, data, req) {

    await new Promise(res => setTimeout(res, 2500));

    const topProducts = ["1", "2", "3", "4", "5", "6"].filter(a => Math.random() > 0.5);
    return topProducts;
};
