'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../../types';
import { ApiService } from '../../../services/api';
import { useCartStore } from '../../../store/cartStore';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const addItem = useCartStore(state => state.addItem);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await ApiService.fetchProduct(id);
      setProduct(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    }
  };

  if (loading) return <Loading />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage message={error} onRetry={fetchProduct} />
    </div>
  );
  if (!product) return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage message="Product not found" />
    </div>
  );

  // Mock additional images for demo
  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Shop
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Living Room
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">Product</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index 
                      ? 'border-black' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => {
                  const rating = product.rating.rate;
                  const starValue = i + 1;
                  
                  if (rating >= starValue) {
                    // Full star
                    return (
                      <svg
                        key={i}
                        className="w-5 h-5 text-black fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  } else if (rating > starValue - 1) {
                    // Partial star
                    const percentage = ((rating - (starValue - 1)) * 100).toFixed(0);
                    return (
                      <div key={i} className="relative w-5 h-5">
                        {/* Empty star background */}
                        <svg
                          className="absolute w-5 h-5 text-gray-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {/* Filled portion */}
                        <div 
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{ width: `${percentage}%` }}
                        >
                          <svg
                            className="w-5 h-5 text-black"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    );
                  } else {
                    // Empty star
                    return (
                      <svg
                        key={i}
                        className="w-5 h-5 text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  }
                })}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.count} Reviews
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.rating.rate > 4.5 && (
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.1).toFixed(2)}
                </span>
              )}
            </div>

            {/* Offer expires */}
            <div className="text-sm text-gray-600">
              Offer expires in:
            </div>
            <div className="flex space-x-4 text-center">
              <div className="bg-gray-100 px-3 py-2 rounded">
                <div className="text-lg font-bold">02</div>
                <div className="text-xs text-gray-500">Days</div>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded">
                <div className="text-lg font-bold">12</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded">
                <div className="text-lg font-bold">45</div>
                <div className="text-xs text-gray-500">Minutes</div>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded">
                <div className="text-lg font-bold">05</div>
                <div className="text-xs text-gray-500">Seconds</div>
              </div>
            </div>

            {/* Measurements */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Measurements</h3>
              <p className="text-sm text-gray-600">17 1/2×20 5/8 "</p>
            </div>

            {/* Color Options */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">Choose Color</h3>
              <div className="flex space-x-3">
                <button className="w-8 h-8 rounded-full bg-black border-2 border-gray-300 focus:border-black"></button>
                <button className="w-8 h-8 rounded-full bg-gray-400 border-2 border-gray-300 focus:border-black"></button>
                <button className="w-8 h-8 rounded-full bg-red-400 border-2 border-gray-300 focus:border-black"></button>
                <button className="w-8 h-8 rounded-full bg-blue-400 border-2 border-gray-300 focus:border-black"></button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Add to Cart
            </button>

            {/* Added to cart message */}
            {showAddedMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Added to cart successfully!
              </div>
            )}

            {/* Additional Info */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">SKU</span>
                <span className="text-gray-900">1117</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">CATEGORY</span>
                <span className="text-gray-900 capitalize">{product.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button className="border-b-2 border-black pb-4 text-sm font-medium text-gray-900">
                Additional Info
              </button>
              <button className="border-b-2 border-transparent pb-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Questions
              </button>
              <button className="border-b-2 border-transparent pb-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Reviews
              </button>
            </nav>
          </div>

          <div className="pt-8">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Details</h3>
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating.rate)
                      ? 'text-black fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              11 Reviews
            </span>
          </div>

          {/* Sample Review */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium">Sofia Harvetz</h4>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-black fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  I bought it 3 weeks ago and now come back just to say &quot;Awesome Product&quot;. I really enjoy it. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}