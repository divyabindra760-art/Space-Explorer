import React, { useRef, useEffect } from 'react';

/**
 * Interactive ISS Orbit Radar Visualization
 * Demonstrates HTML5 Canvas API, useRef, useEffect, dynamic math transformations, and canvas drawing loops.
 */
export function OrbitRadar({ latitude = 0, longitude = 0, altitude = 418 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // 1. Draw World Map Grid Lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;

      // Latitude lines (-90 to +90)
      for (let lat = -90; lat <= 90; lat += 30) {
        const y = ((90 - lat) / 180) * height;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Longitude lines (-180 to +180)
      for (let lon = -180; lon <= 180; lon += 30) {
        const x = ((lon + 180) / 360) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Draw Equator & Prime Meridian Highlight Lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1.5;
      
      // Equator
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Prime Meridian
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // 3. Convert Latitude & Longitude to Canvas Coordinates
      const issX = ((longitude + 180) / 360) * width;
      const issY = ((90 - latitude) / 180) * height;

      // 4. Draw Projected Orbital Path Wave (Sine Wave approximation)
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const normLon = (x / width) * 360 - 180;
        // Orbital inclination sine shift relative to current position
        const normLat = Math.sin(((normLon - longitude) * Math.PI) / 180) * 51.6 + latitude;
        const y = ((90 - normLat) / 180) * height;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // 5. Draw Target Radar Crosshairs
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(issX - 15, issY);
      ctx.lineTo(issX + 15, issY);
      ctx.moveTo(issX, issY - 15);
      ctx.lineTo(issX, issY + 15);
      ctx.stroke();

      // 6. Draw Pulsing Beacon Signal Circle
      const time = Date.now() / 300;
      const pulseRadius = 8 + (Math.sin(time) + 1) * 6;

      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.beginPath();
      ctx.arc(issX, issY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core Satellite Marker Point
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(issX, issY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Coordinates Tag text
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px sans-serif';
      ctx.fillText(`ISS (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`, Math.min(issX + 10, width - 120), Math.max(issY - 10, 20));
    };

    render();
  }, [latitude, longitude, altitude]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#050711' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={320}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(7,9,19,0.7)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
        Equirectangular Orbital Radar Projection
      </div>
    </div>
  );
}
