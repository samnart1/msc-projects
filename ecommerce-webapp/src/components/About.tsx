import ProductCard from "./shared/ProductCard";

const products = [
    {
        id: 1,
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Home Comfort",
        description: "Upgrade your space with cozy and stylish sofas",
        price: 599,
        specialPrice: 400,
    },
    {
        id: 2,
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Entertainment Hub",
        description: "Experience the latest in home entertainment",
        price: 452,
        specialPrice: 450,
    },
    {
        id: 3,
        image: "https://embarkx.com/sample/placeholder.png",
        productName: "Playful Picks",
        description: "Bright and fun styles for kids, up to 20% of",
        price: 987,
        specialPrice: 980,
    },
];

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
                About Us
            </h1>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <p className="text-lg mb-4">
                        Welcome to our e-commerce store! We are dedicated to
                        providing the best products and services to our
                        customers. Our mission is to offer a seamless shopping
                        experience while ensuring the highest quality of our
                        offerings.
                    </p>
                </div>
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <img
                        src="https://embarkx.com/sample/placeholder.png"
                        alt="About Us"
                        className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </div>
            <div className="py-7 space-y-7">
                <h1 className="text-slate-800 text-4xl font-bold text-center mb-6">
                    Our Products
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            productId={index}
                            productName={product.productName}
                            image={product.image}
                            description={product.description}
                            quantity={300}
                            price={product.price}
                            discount={0}
                            specialPrice={product.specialPrice}
                            about
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
