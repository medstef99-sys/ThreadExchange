import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ListingCard from './components/ListingCard';
import ListingModal from './components/ListingModal';
import SellForm from './components/SellForm';
import { Listing, Category, Condition, ViewState } from './types';
import { Filter, SlidersHorizontal } from 'lucide-react';

// Mock Initial Data
const INITIAL_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    price: 125.00,
    description: 'Authentic 90s vintage leather jacket in excellent condition. Genuine leather, warm lining. Perfect for autumn.',
    image: 'https://images.unsplash.com/photo-1551028919-ac7fa7ea47ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    category: Category.MEN,
    condition: Condition.GOOD,
    sellerName: 'Alex Rivers',
    sellerContact: 'alex.r@example.com',
    location: 'Brooklyn, NY',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Silk Summer Dress',
    price: 45.00,
    description: 'Lightweight floral silk dress. Worn once for a wedding. Breathable fabric, size M.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    category: Category.WOMEN,
    condition: Condition.LIKE_NEW,
    sellerName: 'Sarah Jenkins',
    sellerContact: '555-0123',
    location: 'Austin, TX',
    createdAt: new Date()
  },
  {
    id: '3',
    title: 'Minimalist Sneakers',
    price: 80.00,
    description: 'White leather sneakers, classic design. Very comfortable walking shoes. Comes with original box.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    category: Category.SHOES,
    condition: Condition.NEW,
    sellerName: 'Mike Chen',
    sellerContact: 'mike.c@example.com',
    location: 'San Francisco, CA',
    createdAt: new Date()
  },
  {
    id: '4',
    title: 'Kids Denim Overalls',
    price: 25.00,
    description: 'Adorable durable denim overalls for toddlers (size 3T). Adjustable straps.',
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    category: Category.KIDS,
    condition: Condition.GOOD,
    sellerName: 'Emily Blunt',
    sellerContact: 'emily.b@example.com',
    location: 'Chicago, IL',
    createdAt: new Date()
  },
    {
    id: '5',
    title: 'Designer Sunglasses',
    price: 150.00,
    description: 'High-end polarized sunglasses. Scratch-free lenses. Includes hard case and cleaning cloth.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80',
    category: Category.ACCESSORIES,
    condition: Condition.LIKE_NEW,
    sellerName: 'Chris Topher',
    sellerContact: 'chris.t@example.com',
    location: 'Miami, FL',
    createdAt: new Date()
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('browse');
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist new listings for the session (optional, simpler to just use state for this demo)
  // In a real app, we would fetch from API here.

  const handleAddListing = (newListingData: Omit<Listing, 'id' | 'createdAt'>) => {
    const newListing: Listing = {
      ...newListingData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    setListings([newListing, ...listings]);
    setView('browse');
  };

  const filteredListings = listings.filter(item => {
    const matchesCategory = selectedCategory === Category.ALL || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar currentView={view} onViewChange={setView} />
      
      <main className="flex-grow">
        {view === 'browse' && (
          <>
            <Hero onStartSelling={() => setView('sell')} />
            
            <div id="listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    <div className="flex items-center text-slate-500 mr-2">
                        <Filter className="w-5 h-5 mr-1" />
                        <span className="text-sm font-medium">Filter:</span>
                    </div>
                  {Object.values(Category).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                   </div>
                   <input
                     type="text"
                     placeholder="Search items..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-full leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
                   />
                </div>
              </div>

              {/* Grid */}
              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredListings.map(listing => (
                    <ListingCard 
                      key={listing.id} 
                      listing={listing} 
                      onClick={setSelectedListing} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-slate-500">No items found matching your criteria.</p>
                    <button 
                        onClick={() => {setSelectedCategory(Category.ALL); setSearchQuery('')}}
                        className="mt-4 text-indigo-600 font-medium hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
              )}
            </div>
          </>
        )}

        {view === 'sell' && (
          <SellForm 
            onCancel={() => setView('browse')} 
            onSubmit={handleAddListing} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-slate-400 hover:text-slate-500 cursor-pointer">About</span>
            <span className="text-slate-400 hover:text-slate-500 cursor-pointer">Safety</span>
            <span className="text-slate-400 hover:text-slate-500 cursor-pointer">Terms</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-slate-400">
              &copy; 2024 ThreadExchange. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedListing && (
        <ListingModal 
          listing={selectedListing} 
          onClose={() => setSelectedListing(null)} 
        />
      )}
    </div>
  );
};

export default App;