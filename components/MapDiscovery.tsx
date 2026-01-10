
import React, { useEffect, useRef, useState } from 'react';
import { MOCK_POSTINGS } from '../constants';
import { OJTPosting } from '../types';

interface MapDiscoveryProps {
  onStartChat: (posting: OJTPosting) => void;
}

const MapDiscovery: React.FC<MapDiscoveryProps> = ({ onStartChat }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedPosting, setSelectedPosting] = useState<OJTPosting | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Tech', 'Design', 'Engineering', 'Marketing'];
  const filteredPostings = filter === 'All' ? MOCK_POSTINGS : MOCK_POSTINGS.filter(p => p.category === filter);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      // @ts-ignore
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true
      }).setView([14.5995, 120.9842], 12);

      // @ts-ignore
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Leaflet fix for rendering in dynamic layouts
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 200);
    }

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Custom Icon to avoid broken default Leaflet assets
    // @ts-ignore
    const customIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #10b981; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(16,185,129,0.8);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });

    // Add Markers
    filteredPostings.forEach(posting => {
      // @ts-ignore
      const marker = L.marker([posting.lat, posting.lng], { icon: customIcon }).addTo(mapRef.current);
      marker.on('click', () => {
        setSelectedPosting(posting);
        mapRef.current.setView([posting.lat, posting.lng], 14, { animate: true });
      });
      markersRef.current.push(marker);
    });

    // Auto-fit bounds if multiple markers exist
    if (markersRef.current.length > 0 && filter !== 'All') {
      // @ts-ignore
      const group = new L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }

    return () => {};
  }, [filter]);

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/5 shadow-2xl flex flex-col">
      <div ref={mapContainerRef} className="flex-1 w-full min-h-[400px] z-0" />
      
      {/* Search & Filters Overlay */}
      <div className="absolute top-6 left-6 right-6 z-[1000] flex flex-col md:flex-row gap-4 items-center">
        <div className="glass px-6 py-3 rounded-2xl border border-white/10 shadow-2xl flex-1 flex items-center space-x-3 group focus-within:border-emerald-500/40 transition-all pointer-events-auto">
          <span className="text-emerald-500">🔍</span>
          <input 
            type="text" 
            placeholder="Search by company or role..." 
            className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600"
          />
        </div>
        
        <div className="flex space-x-2 pointer-events-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                filter === cat 
                  ? 'bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/20' 
                  : 'glass border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {selectedPosting && (
        <div className="absolute bottom-8 right-8 left-8 md:left-auto md:w-[400px] z-[1000] animate-in slide-in-from-bottom-6 duration-500 pointer-events-auto">
          <div className="glass p-8 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden group">
             <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
             
             <button 
               onClick={() => setSelectedPosting(null)}
               className="absolute top-6 right-6 w-8 h-8 rounded-full glass border border-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all z-10"
             >
               ✕
             </button>

             <div className="flex items-center space-x-2 mb-3">
               <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-lg font-black uppercase tracking-wider border border-emerald-500/20">
                 {selectedPosting.category}
               </span>
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">• ACTIVE NOW</span>
             </div>
             
             <h3 className="text-2xl font-black text-white mb-1 leading-tight">{selectedPosting.title}</h3>
             <p className="text-emerald-500 font-bold text-sm mb-6 flex items-center">
               <span className="mr-2">🏢</span> {selectedPosting.companyName}
             </p>
             
             <p className="text-gray-400 text-sm mb-8 leading-relaxed line-clamp-3">
               {selectedPosting.description}
             </p>

             <div className="flex flex-wrap gap-2 mb-8">
               {selectedPosting.requiredSkills.map(skill => (
                 <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs text-gray-300 font-medium">
                   {skill}
                 </span>
               ))}
             </div>

             <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg">{selectedPosting.slotsAvailable}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Slots Remaining</span>
                </div>
                <button 
                  onClick={() => onStartChat(selectedPosting)}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl transition-all shadow-[0_15px_30px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] uppercase tracking-widest text-xs"
                >
                  Apply & Message
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapDiscovery;
