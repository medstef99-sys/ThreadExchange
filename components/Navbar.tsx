import React from 'react';
import { ShoppingBag, PlusCircle, Search } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => onViewChange('browse')}
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              ThreadExchange
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onViewChange('browse')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentView === 'browse' 
                  ? 'bg-slate-100 text-slate-900' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className="flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Browse
              </span>
            </button>
            
            <button 
              onClick={() => onViewChange('sell')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
                currentView === 'sell'
                  ? 'bg-indigo-700 text-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              <span className="flex items-center">
                <PlusCircle className="w-4 h-4 mr-2" />
                Sell Item
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;