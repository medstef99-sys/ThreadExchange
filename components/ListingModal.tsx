import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, User, ShieldCheck, Tag } from 'lucide-react';
import { Listing } from '../types';

interface ListingModalProps {
  listing: Listing;
  onClose: () => void;
}

const ListingModal: React.FC<ListingModalProps> = ({ listing, onClose }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity backdrop-blur-sm" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors backdrop-blur-md"
          >
            <X className="w-6 h-6 text-slate-800" />
          </button>

          <div className="sm:flex h-full">
            {/* Image Side */}
            <div className="sm:w-1/2 h-96 sm:h-auto bg-slate-100 relative">
              <img 
                src={listing.image} 
                alt={listing.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Side */}
            <div className="sm:w-1/2 p-6 sm:p-10 flex flex-col bg-white">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                    {listing.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                    {listing.condition}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">{listing.title}</h2>
                <p className="text-3xl font-bold text-indigo-600">${listing.price.toFixed(2)}</p>
              </div>

              <div className="prose prose-slate mb-8">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
                 <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-2">Seller Info</h3>
                 <div className="flex items-center">
                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                     <User className="w-5 h-5" />
                   </div>
                   <div className="ml-3">
                     <p className="text-sm font-medium text-slate-900">{listing.sellerName}</p>
                     <p className="text-xs text-slate-500 flex items-center">
                       <ShieldCheck className="w-3 h-3 mr-1 text-green-500" /> Verified Seller
                     </p>
                   </div>
                 </div>
                 
                 <div className="flex items-center text-slate-600 text-sm">
                   <MapPin className="w-4 h-4 mr-2" />
                   {listing.location}
                 </div>
              </div>

              <div className="mt-auto">
                {!showContact ? (
                  <button
                    onClick={() => setShowContact(true)}
                    className="w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    Reveal Contact Info
                  </button>
                ) : (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center animate-fade-in">
                    <p className="text-indigo-900 font-medium mb-2">Please arrange a safe public place for exchange.</p>
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        {listing.sellerContact.includes('@') ? (
                            <div className="flex items-center text-lg font-bold text-slate-800">
                                <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                                <a href={`mailto:${listing.sellerContact}`} className="hover:underline">
                                    {listing.sellerContact}
                                </a>
                            </div>
                        ) : (
                             <div className="flex items-center text-lg font-bold text-slate-800">
                                <Phone className="w-5 h-5 mr-2 text-indigo-600" />
                                <a href={`tel:${listing.sellerContact}`} className="hover:underline">
                                    {listing.sellerContact}
                                </a>
                            </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingModal;