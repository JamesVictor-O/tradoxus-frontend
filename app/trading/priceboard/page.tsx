"use client";

import { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ReferenceLine } from "recharts";
import coinPairsJson from '../../../assets.json';

// List of supported coin pairs (now imported from assets.json)
const COIN_PAIRS: string[] = coinPairsJson;

// Format a timestamp into a readable time string
function formatTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Generate mock 24h stats for the selected coin (for demo purposes)
function getMockStats(price: number | null) {
  if (!price) return { high: '-', low: '-', change: '-', changePct: '-', volume: '-' };
  const high = (price * 1.02).toFixed(2);
  const low = (price * 0.98).toFixed(2);
  const change = (price * (Math.random() * 0.02 - 0.01)).toFixed(2);
  const changePct = ((parseFloat(change) / price) * 100).toFixed(2);
  const volume = (Math.random() * 1000).toFixed(0);
  return { high, low, change, changePct, volume };
}

export default function PriceBoard() {
  // State for selected coin pair
  const [selectedPair, setSelectedPair] = useState("btcusdt");
  // State for current and previous price
  const [price, setPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  // State for chart data (array of {time, price})
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);
  // State for last update time (displayed below the chart)
  const [lastUpdate, setLastUpdate] = useState<string>("");
  // State for price flash animation (up/down)
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  // State for WebSocket connection status
  const [wsStatus, setWsStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  // Store the WebSocket instance and reconnect timer
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Reference to throttle chart updates
  const lastUpdateRef = useRef<number>(0);

  // WebSocket connect/reconnect logic
  useEffect(() => {
    let isUnmounted = false;

    function connectWS() {
      if (wsRef.current) {
        wsRef.current.close();
      }
      setWsStatus('connecting');
      const ws = new window.WebSocket("ws://localhost:4001");
      wsRef.current = ws;

      ws.onopen = () => {
        if (isUnmounted) return;
        ws.send(JSON.stringify({ action: "getPrice", symbol: selectedPair }));
        setWsStatus('connected');
      };
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.symbol.toLowerCase() === selectedPair.toLowerCase()) {
          setPrevPrice(price);
          setPrice(parseFloat(data.price));
          setLastUpdate(formatTime(data.timestamp));
          if (price !== null) {
            if (parseFloat(data.price) > price) setFlash('up');
            else if (parseFloat(data.price) < price) setFlash('down');
          }
          setTimeout(() => setFlash(null), 350);
          const now = Date.now();
          if (now - lastUpdateRef.current > 950) {
            lastUpdateRef.current = now;
            setChartData((prev) => [
              ...prev.slice(-99),
              { time: formatTime(data.timestamp), price: parseFloat(data.price) }
            ]);
          }
        }
      };
      ws.onclose = () => {
        if (isUnmounted) return;
        setWsStatus('disconnected');
        // Try to reconnect after 2 seconds
        if (!reconnectTimerRef.current) {
          reconnectTimerRef.current = setTimeout(() => {
            reconnectTimerRef.current = null;
            connectWS();
          }, 2000);
        }
      };
      ws.onerror = () => {
        if (isUnmounted) return;
        setWsStatus('disconnected');
        // Try to reconnect after 2 seconds
        if (!reconnectTimerRef.current) {
          reconnectTimerRef.current = setTimeout(() => {
            reconnectTimerRef.current = null;
            connectWS();
          }, 2000);
        }
      };
    }

    connectWS();

    return () => {
      isUnmounted = true;
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPair]);

  // Determine the color for the price (green for up, red for down, white for unchanged)
  const priceColor = price === null || prevPrice === null
    ? '#fff'
    : price > prevPrice
      ? '#00e676' // green
      : price < prevPrice
        ? '#ff1744' // red
        : '#fff';

  // Arrow for price movement (▲ for up, ▼ for down)
  const priceArrow = price === null || prevPrice === null ? null : price > prevPrice ? '▲' : price < prevPrice ? '▼' : null;
  // Color for the arrow (matches price color)
  const arrowColor =
    price !== null && prevPrice !== null
      ? price > prevPrice
        ? '#00e676'
        : price < prevPrice
          ? '#ff1744'
          : '#fff'
      : '#fff';

  // Get mock stats for the market info section
  const stats = getMockStats(price);

  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      padding: 0,
      background: "#181a20",
      borderRadius: 16,
      boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)",
      color: '#fff',
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      border: '1px solid #222',
      overflow: 'hidden',
    }}>
      {/* Connection status banner */}
      {wsStatus !== 'connected' && (
        <div style={{
          width: '100%',
          background: wsStatus === 'disconnected' ? '#ff1744' : '#ffa726',
          color: '#fff',
          textAlign: 'center',
          padding: '8px 0',
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: 1,
        }}>
          {wsStatus === 'disconnected' ? 'Connection lost. Reconnecting…' : 'Connecting to price server…'}
        </div>
      )}
      {/* Header with icon and title */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '24px 24px 0 24px', gap: 12 }}>
        <img src="/chart.png" alt="crypto" style={{ width: 36, height: 36, borderRadius: 8, background: '#222', padding: 4 }} />
        <h2 style={{ margin: 0, color: '#fff', fontWeight: 700, fontSize: 24 }}>Real-Time Crypto Price Board</h2>
      </div>
      {/* Coin pair select dropdown */}
      <div style={{
        marginBottom: 16,
        marginTop: 16,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <label htmlFor="pair-select" style={{ color: '#fff', fontWeight: 500 }}>
          Select Coin Pair:
        </label>
        <select
          id="pair-select"
          value={selectedPair}
          onChange={e => setSelectedPair(e.target.value)}
          style={{
            padding: '6px 12px',
            background: '#222',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            outline: 'none',
            minWidth: 120,
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
            transition: 'border 0.2s',
          }}
        >
          {COIN_PAIRS.map(pair => (
            <option key={pair} value={pair}>{pair.toUpperCase()}</option>
          ))}
        </select>
      </div>
      {/* Price display with arrow and flash animation */}
      <div style={{
        marginBottom: 8,
        fontSize: 32,
        fontWeight: 700,
        padding: '0 24px',
        color: priceColor,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transition: 'background 0.3s',
        background: flash === 'up' ? 'rgba(0,230,118,0.08)' : flash === 'down' ? 'rgba(255,23,68,0.08)' : 'transparent',
        borderRadius: 8,
        minHeight: 56,
      }}>
        <strong>{selectedPair.toUpperCase()}:</strong> {price !== null ? price : "-"}
        {priceArrow && <span style={{ color: arrowColor, fontSize: 24, fontWeight: 700, marginLeft: 4 }}>{priceArrow}</span>}
      </div>
      {/* Market info section with 24h stats and last update */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px 8px 24px',
        fontSize: 15,
        color: '#aaa',
        borderBottom: '1px solid #222',
        gap: 12,
        flexWrap: 'wrap',
      }}>
        <div>24h High: <span style={{ color: '#00e676', fontWeight: 600 }}>{stats.high}</span></div>
        <div>24h Low: <span style={{ color: '#ff1744', fontWeight: 600 }}>{stats.low}</span></div>
        <div>24h Change: <span style={{ color: stats.change.startsWith('-') ? '#ff1744' : '#00e676', fontWeight: 600 }}>{stats.change} ({stats.changePct}%)</span></div>
        <div>Volume: <span style={{ color: '#fff', fontWeight: 600 }}>{stats.volume}</span></div>
        <div>Last update: <span style={{ color: '#fff', fontWeight: 600 }}>{lastUpdate || '-'}</span></div>
      </div>
      {/* Chart area: shows price activity and latest price as a horizontal line */}
      <div style={{ width: "100%", height: 400, background: '#111', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '0 0 24px 0' }}>
        {chartData.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', paddingTop: 100 }}>
            Waiting for data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 40, left: 0, bottom: 20 }}>
              <CartesianGrid stroke="#222" strokeDasharray="3 3" />
              <XAxis dataKey="time" minTickGap={30} stroke="#888" tick={{ fill: '#888', fontSize: 12 }} label={{ value: 'Time', position: 'insideBottomRight', offset: -10, fill: '#888', fontSize: 13 }} />
              <YAxis domain={[(dataMin: number) => Math.floor(dataMin * 0.995), (dataMax: number) => Math.ceil(dataMax * 1.005)]} stroke="#888" tick={{ fill: '#888', fontSize: 12 }} label={{ value: 'Price', angle: -90, position: 'insideLeft', fill: '#888', fontSize: 13 }} />
              <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} labelStyle={{ color: '#fff' }} />
              {/* Area under the line for a nice chart effect */}
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={priceColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={priceColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* Main price line (shows price activity) */}
              <Line type="monotone" dataKey="price" stroke={priceColor} dot={false} isAnimationActive={false} strokeWidth={2} />
              <Area type="monotone" dataKey="price" fill="url(#colorPrice)" fillOpacity={1} isAnimationActive={false} />
              {/* Only show a single horizontal line for the latest price */}
              {price !== null && (
                <ReferenceLine
                  y={price}
                  stroke="#888"
                  strokeDasharray="5 5"
                  label={{
                    value: `Last: ${price}`,
                    position: 'right',
                    fill: '#fff',
                    fontSize: 13,
                    fontWeight: 600,
                    offset: 10,
                  }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
} 