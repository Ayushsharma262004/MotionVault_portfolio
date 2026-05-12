import { useEffect, useCallback } from 'react';
import { X, Play, Volume2, VolumeX, Maximize } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, video }) {
  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      data-testid="video-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative z-10 w-[90%] max-w-4xl mx-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          data-testid="video-modal-close"
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video container */}
        <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
          <div className="aspect-video relative">
            <img
              src={video?.image || 'https://images.unsplash.com/photo-1508344928928-7137b29de218?q=80&w=2400&auto=format&fit=crop'}
              alt={video?.title || 'Empire AI Demo'}
              className="w-full h-full object-cover"
            />
            {/* Overlay with play prompt */}
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
              <p className="text-white/80 text-sm font-body">
                Video placeholder — replace with your demo video
              </p>
            </div>

            {/* Bottom controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center gap-4">
                {/* Progress bar */}
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-empire-blue rounded-full" />
                </div>
                <span className="text-xs font-body text-white/70 tabular-nums">0:00 / {video?.duration || '3:24'}</span>
                <button className="text-white/70 hover:text-white transition-colors">
                  <Volume2 className="w-4 h-4" />
                </button>
                <button className="text-white/70 hover:text-white transition-colors">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video info */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-heading font-bold text-lg">
              {video?.title || 'Empire AI Match Analysis'}
            </h3>
            <p className="text-white/60 text-sm font-body mt-0.5">
              {video?.subtitle || 'Full demonstration of real-time AI officiating'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
