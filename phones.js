const phones = [
    {
        id: 1,
        model: "Samsung Galaxy S24 Ultra",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
        price: "$1,199",
        specs: {
            display: "6.8\" Dynamic AMOLED 2X",
            processor: "Snapdragon 8 Gen 3",
            camera: "200MP + 12MP + 50MP + 10MP",
            battery: "5000mAh",
            size: "162.3 x 79 x 8.9 mm",
            weight: "233g",
            color: "Phantom Black",
            frequency: "120Hz",
            rating: "4.8/5",
            extraFeatures: "S Pen, IP68 water resistance"
        }
    },
    {
        id: 2,
        model: "Samsung Galaxy S24+",
        image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?auto=format&fit=crop&w=800&q=80",
        price: "$999",
        specs: {
            display: "6.7\" Dynamic AMOLED 2X",
            processor: "Snapdragon 8 Gen 3",
            camera: "50MP + 12MP + 10MP",
            battery: "4900mAh",
            size: "158.5 x 75.9 x 8.2 mm",
            weight: "196g",
            color: "Phantom Black",
            frequency: "120Hz",
            rating: "4.6/5",
            extraFeatures: "Wireless charging, IP68 water resistance"
        }
    },
    {
        id: 3,
        model: "Samsung Galaxy Z Fold5",
        image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=800&q=80",
        price: "$1,799",
        specs: {
            display: "7.6\" Dynamic AMOLED 2X",
            processor: "Snapdragon 8 Gen 2",
            camera: "50MP + 12MP + 10MP",
            battery: "4400mAh",
            size: "155.1 x 130.1 x 6.1 mm (unfolded)",
            weight: "253g",
            color: "Icy Blue",
            frequency: "120Hz",
            rating: "4.7/5",
            extraFeatures: "Foldable display, IPX8 water resistance"
        }
    },
    {
        id: 4,
        model: "Samsung Galaxy A54 5G",
        image: "https://images.samsung.com/is/image/samsung/p6pim/ae/sm-a546ezwdmea/gallery/ae-galaxy-a54-5g-sm-a546-sm-a546ezwdmea-thumb-535722081",
        price: "$449",
        specs: {
            display: "6.4\" Super AMOLED",
            processor: "Exynos 1380",
            camera: "50MP + 12MP + 5MP",
            battery: "5000mAh",
            size: "158.2 x 76.7 x 8.2 mm",
            weight: "202g",
            color: "Awesome Lime",
            frequency: "120Hz",
            rating: "4.5/5",
            extraFeatures: "Expandable storage, Gorilla Glass 5"
        }
    },
    {
        id: 5,
        model: "Samsung Galaxy M04",
        image: "https://english.onlinekhabar.com/wp-content/uploads/2023/03/Frame-222-1024x683.png",
        price: "$129",
        specs: {
            display: "6.5\" PLS LCD",
            processor: "Helio P35",
            camera: "13MP + 2MP",
            battery: "5000mAh",
            size: "164.2 x 75.9 x 9.1 mm",
            weight: "188g",
            color: "Sea Green",
            frequency: "60Hz",
            rating: "4.0/5",
            extraFeatures: "Budget-friendly"
        }
    },
    {
        id: 6,
        model: "Samsung Galaxy A14 5G",
        image: "https://m.media-amazon.com/images/I/812-qrt9U3L.jpg",
        price: "$199",
        specs: {
            display: "6.6\" PLS LCD",
            processor: "Dimensity 700",
            camera: "50MP + 2MP + 2MP",
            battery: "5000mAh",
            size: "167.7 x 78 x 9.1 mm",
            weight: "201g",
            color: "Dark Red",
            frequency: "90Hz",
            rating: "4.2/5",
            extraFeatures: "5G connectivity, Dual SIM"
        }
    },
    {
        id: 7,
        model: "Samsung Galaxy F14 5G",
        image: "https://images.hindustantimes.com/tech/htmobile4/samsung-galaxy-f14-5g/colors/b.a.e%20purple/samsung-galaxy-f14-5g-b.a.e%20purple-1.jpg",
        price: "$199",
        specs: {
            display: "6.6\" PLS LCD",
            processor: "Exynos 1330",
            camera: "50MP + 2MP",
            battery: "6000mAh",
            size: "166.8 x 77.2 x 9.4 mm",
            weight: "207g",
            color: "Purple",
            frequency: "90Hz",
            rating: "4.3/5",
            extraFeatures: "Massive battery"
        }
    },
    {
        id: 8,
        model: "Samsung Galaxy M14 5G",
        image: "https://hayumastechnologies.co.ke/wp-content/uploads/2023/10/Samsung-Galaxy-M14-5G.jpg",
        price: "$229",
        specs: {
            display: "6.6\" PLS LCD",
            processor: "Exynos 1330",
            camera: "50MP + 2MP + 2MP",
            battery: "6000mAh",
            size: "166.8 x 77.2 x 9.4 mm",
            weight: "206g",
            color: "Silver",
            frequency: "90Hz",
            rating: "4.4/5",
            extraFeatures: "Long-lasting battery"
        }
    },
    {
        id: 9,
        model: "Samsung Galaxy A25 5G",
        image: "https://d32n7g8aqsy2ib.cloudfront.net/images/inventoryImages/Z717to5KmULNGOpd1705389399807.webp",
        price: "$349",
        specs: {
            display: "6.4\" Super AMOLED",
            processor: "Exynos 1280",
            camera: "50MP + 5MP + 2MP",
            battery: "5000mAh",
            size: "159.8 x 74.3 x 8.3 mm",
            weight: "195g",
            color: "Blue",
            frequency: "120Hz",
            rating: "4.5/5",
            extraFeatures: "Fast charging, Gorilla Glass 5"
        }
    }
];
