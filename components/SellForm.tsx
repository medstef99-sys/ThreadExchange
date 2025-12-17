import React, { useState } from 'react';
import { Upload, Sparkles, Loader2, MapPin, DollarSign, Type, Tag as TagIcon, ArrowLeft } from 'lucide-react';
import { Category, Condition, Listing } from '../types';
import { generateListingDescription } from '../services/geminiService';

interface SellFormProps {
  onCancel: () => void;
  onSubmit: (listing: Omit<Listing, 'id' | 'createdAt'>) => void;
}

const SellForm: React.FC<SellFormProps> = ({ onCancel, onSubmit }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: Category.WOMEN,
    condition: Condition.GOOD,
    description: '',
    keywords: '', // Helper for AI
    sellerName: '',
    sellerContact: '',
    location: '',
    image: null as File | null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) return;
    
    setIsGenerating(true);
    const desc = await generateListingDescription(
      formData.title,
      formData.condition,
      formData.category,
      formData.keywords || 'Stylish, Comfortable'
    );
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.price) {
        alert("Please fill in all required fields.");
        return;
    }

    // Create URL for the image if it exists
    const imageUrl = imagePreview || "https://picsum.photos/400/500"; 

    onSubmit({
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      image: imageUrl,
      category: formData.category,
      condition: formData.condition,
      sellerName: formData.sellerName,
      sellerContact: formData.sellerContact,
      location: formData.location
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button 
        onClick={onCancel}
        className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Browse
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800">List an Item</h2>
            <p className="text-slate-500 text-sm mt-1">Fill in the details to reach thousands of buyers.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Photos</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:bg-slate-50 transition-colors relative cursor-pointer group">
              {imagePreview ? (
                <div className="relative w-full h-64">
                   <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                      <span className="text-white font-medium">Change Photo</span>
                   </div>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-400" />
                  <div className="flex text-sm text-slate-600 justify-center">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload a file</span>
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Details */}
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Item Title</label>
                    <div className="relative">
                        <Type className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                            placeholder="e.g. Vintage Denim Jacket"
                            className="pl-10 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Price ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="number"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: e.target.value})}
                                placeholder="0.00"
                                className="pl-10 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value as Category})}
                            className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5 bg-white"
                        >
                            {Object.values(Category).filter(c => c !== Category.ALL).map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Condition</label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.values(Condition).map((c) => (
                             <button
                                key={c}
                                type="button"
                                onClick={() => setFormData({...formData, condition: c})}
                                className={`px-3 py-2 text-sm font-medium rounded-lg border ${
                                    formData.condition === c 
                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-500' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                             >
                                 {c}
                             </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: AI & Contact */}
            <div className="space-y-6">
                 {/* AI Description Section */}
                 <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
                    <div className="flex justify-between items-center mb-3">
                        <label className="block text-sm font-medium text-indigo-900">Description</label>
                        <button
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={isGenerating || !formData.title}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isGenerating ? (
                                <><Loader2 className="w-3 h-3 mr-1 animate-spin" /> Magic Writing...</>
                            ) : (
                                <><Sparkles className="w-3 h-3 mr-1" /> AI Enhance</>
                            )}
                        </button>
                    </div>
                    
                    <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe your item... or use AI Enhance to write it for you!"
                        className="block w-full border-indigo-200 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-3 bg-white"
                    />
                    
                    {/* Helper keywords for AI */}
                    <div className="mt-3">
                         <label className="block text-xs font-medium text-slate-500 mb-1">Keywords for AI (Optional)</label>
                         <div className="relative">
                            <TagIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={formData.keywords}
                                onChange={e => setFormData({...formData, keywords: e.target.value})}
                                placeholder="e.g. vintage, cotton, summer vibes"
                                className="pl-9 block w-full border-slate-200 rounded-lg text-xs border p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                         </div>
                    </div>
                 </div>

                 {/* Seller Info */}
                 <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Seller Name</label>
                        <input
                            type="text"
                            required
                            value={formData.sellerName}
                            onChange={e => setFormData({...formData, sellerName: e.target.value})}
                            className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Contact Info (Email/Phone)</label>
                        <input
                            type="text"
                            required
                            value={formData.sellerContact}
                            onChange={e => setFormData({...formData, sellerContact: e.target.value})}
                            placeholder="e.g. jane@example.com"
                            className="block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5"
                        />
                     </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Location/City</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={e => setFormData({...formData, location: e.target.value})}
                                className="pl-10 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2.5"
                            />
                        </div>
                     </div>
                 </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end space-x-4">
             <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             >
                Cancel
             </button>
             <button
                type="submit"
                className="px-8 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform active:scale-95"
             >
                List Item
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;