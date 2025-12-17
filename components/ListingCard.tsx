import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onClick: (listing: Listing) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-slate-100 flex flex-col h-full"
      onClick={() => onClick(listing)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
        <img 
          src={listing.image} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
          {listing.condition}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm font-medium">Click to view details</p>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {listing.title}
          </h3>
          <span className="text-lg font-bold text-indigo-600">
            ${listing.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-grow">
          {listing.description}
        </p>
        
        <div className="border-t border-slate-100 pt-3 mt-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate max-w-[100px]">{listing.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>Recently</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;