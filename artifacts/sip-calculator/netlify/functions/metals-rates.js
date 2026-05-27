exports.handler = async function () {
    const apiKey = process.env.GOLDAPI_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "GOLDAPI_KEY is missing" }),
        };
    }

    try {
        const [goldRes, silverRes] = await Promise.all([
            fetch("https://www.goldapi.io/api/XAU/INR", {
                headers: {
                    "x-access-token": apiKey,
                    "Content-Type": "application/json",
                },
            }),
            fetch("https://www.goldapi.io/api/XAG/INR", {
                headers: {
                    "x-access-token": apiKey,
                    "Content-Type": "application/json",
                },
            }),
        ]);

        const gold = await goldRes.json();
        const silver = await silverRes.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                gold10g: gold.price_gram_24k * 10,
                silver10g: silver.price_gram_24k * 10,
                updatedAt: new Date().toISOString(),
            }),
        };
    } catch {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch metal rates" }),
        };
    }
};