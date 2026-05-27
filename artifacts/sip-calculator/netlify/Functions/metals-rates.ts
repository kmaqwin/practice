export default async () => {
    const apiKey = process.env.GOLDAPI_KEY;

    if (!apiKey) {
        return Response.json(
            { error: "GOLDAPI_KEY is missing" },
            { status: 500 }
        );
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

        return Response.json({
            gold10g: gold.price_gram_24k * 10,
            silver1kg: silver.price * 32.1507,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        return Response.json(
            { error: "Failed to fetch metal rates" },
            { status: 500 }
        );
    }
};