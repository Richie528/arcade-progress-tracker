async function getShopInfo() {
    try {
        let shopUrl = "https://hackclub.com/arcade/shop/";
        let response = await fetch(shopUrl);
        let html = await response.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");

        let prices = doc.querySelectorAll("gaegu");
        console.log(prices);
    } catch (error) {
        console.error("Error fetching the URL:", error);
        return -1;
    }
}

getShopInfo();

