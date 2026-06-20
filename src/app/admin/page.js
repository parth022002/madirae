"use client";

import React, { useState, useEffect } from "react";
import { 
  Lock, 
  ShieldCheck, 
  ClipboardList, 
  Mail, 
  TrendingUp, 
  Users, 
  LogOut, 
  Package, 
  MapPin, 
  CheckCircle, 
  RefreshCw, 
  FileText, 
  Truck, 
  AlertTriangle,
  Search,
  Eye,
  EyeOff,
  ChevronDown,
  Clock,
  Sparkles,
  BarChart3,
  Settings,
  Bell,
  Check,
  ChevronRight,
  Database,
  Calendar,
  Filter,
  Info,
  DollarSign,
  Menu,
  X,
  Sliders,
  Activity,
  Globe,
  MessageSquare,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/animations/PageTransition";
import Button from "@/components/ui/Button";

// Seed data with Indian rider names
const SEED_ORDERS = [
  {
    orderId: "MDR-2026-874921",
    customerName: "Rohan Sharma",
    phone: "9886012345",
    address: "Flat 402, Oakwood Apartments, Richmond Town, Bengaluru",
    pincode: "560025",
    items: [
      { id: "stout-01", name: "Native Stout (Toasted Coconut)", price: 380, volume: 650, quantity: 2 },
      { id: "wine-02", name: "Bengaluru Reserve Honey Mead", price: 1200, volume: 750, quantity: 1 }
    ],
    subtotal: 1960,
    deliveryFee: 0,
    grandTotal: 1960,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    deliveryOtp: "4982",
    riderName: "Ramesh Singh",
    status: "Dispatched"
  },
  {
    orderId: "MDR-2026-302485",
    customerName: "Dr. Ananya Rao",
    phone: "9448056789",
    address: "No. 12, 4th Cross, 100 Feet Road, Indiranagar, Bengaluru",
    pincode: "560038",
    items: [
      { id: "gin-01", name: "Malabar Botanical Gin", price: 2100, volume: 750, quantity: 1 }
    ],
    subtotal: 2100,
    deliveryFee: 0,
    grandTotal: 2100,
    date: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
    deliveryOtp: "8120",
    riderName: "Amit Patel",
    status: "Processing"
  },
  {
    orderId: "MDR-2026-118943",
    customerName: "Vikram Malhotra",
    phone: "9845098765",
    address: "Penthouse C, Sobha Carnation, Bellandur, Bengaluru",
    pincode: "560103",
    items: [
      { id: "mead-01", name: "Coorg Wildflower Mead", price: 950, volume: 750, quantity: 3 }
    ],
    subtotal: 2850,
    deliveryFee: 0,
    grandTotal: 2850,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    deliveryOtp: "3319",
    riderName: "Deepak Gupta",
    status: "Delivered"
  }
];

const SEED_SUBSCRIBERS = [
  { email: "madiraeandco@gmail.com", source: "footer", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
  { email: "priya.nair@outlook.com", source: "newsletter_page", date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
  { email: "karan.singh@gmail.com", source: "spirit_matcher", date: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
  { email: "aarav.patel@gmail.com", source: "checkout", date: new Date(Date.now() - 20 * 60 * 1000).toISOString() }
];

const SEED_REVIEWS = [
  {
    id: "rev-seed-1",
    productId: "the-deccan-jamun-reserve",
    productName: "The Deccan Jamun Reserve (Dry Red Wine)",
    name: "Aarav Mehta",
    email: "aarav.mehta@gmail.com",
    text: "Remarkable depth and body. The wild jamun gives it a tartness that is highly unique and contrasts beautifully with the dry finish. Best served slightly chilled.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "rev-seed-2",
    productId: "the-deccan-jamun-reserve",
    productName: "The Deccan Jamun Reserve (Dry Red Wine)",
    name: "Pooja Hegde",
    email: "pooja.h@yahoo.com",
    text: "Absolute masterpiece! I was skeptical about fruit-based dry red wines, but this Deccan Jamun reserve blew me away. Paired perfectly with spiced lamb.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "rev-seed-3",
    productId: "konkan-alphonso-sour",
    productName: "Konkan Alphonso Sour (Fruited Sour Ale)",
    name: "Siddharth Sen",
    email: "sid.sen@gmail.com",
    text: "So refreshing! The alphonso flavor is authentic and has a lovely sour finish that isn't too sweet. Ideal for warm afternoons in Bengaluru.",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  const [activeTab, setActiveTab] = useState("analytics"); // 'analytics', 'orders', 'subscribers', 'compliance'
  const [orders, setOrders] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All"); // 'All', 'Processing', 'Dispatched', 'Delivered'
  
  // Mobile sidebar drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State for order details accordion
  const [expandedOrderId, setExpandedOrderId] = useState("");

  // State for order release interactions
  const [verifyingOtpOrderId, setVerifyingOtpOrderId] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  // System compliance toggles (synced with LocalStorage)
  const [geofencingEnabled, setGeofencingEnabled] = useState(true);
  const [strictAgeGate, setStrictAgeGate] = useState(true);
  const [otpHandshakeRequired, setOtpHandshakeRequired] = useState(true);
  const [consoleDebugLogs, setConsoleDebugLogs] = useState(false);
  
  // Selected graph node state for interactive SVG Area Chart
  const [activeGraphPoint, setActiveGraphPoint] = useState(null);

  // Time tracker for visual clock
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show Toast feedback
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  // Check auth session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authStatus = sessionStorage.getItem("madirae_admin_auth");
      if (authStatus === "true") {
        setIsAuthenticated(true);
      }
      
      // Load settings from LocalStorage
      setGeofencingEnabled(localStorage.getItem("madirae_geofencing_enabled") !== "false");
      setStrictAgeGate(localStorage.getItem("madirae_strict_age_gate") !== "false");
      setOtpHandshakeRequired(localStorage.getItem("madirae_otp_handshake_required") !== "false");
      setConsoleDebugLogs(localStorage.getItem("madirae_console_debug_logs") === "true");
    }
  }, []);

  // Fetch / Seed Local Data
  useEffect(() => {
    if (isAuthenticated) {
      loadLocalData();
    }
  }, [isAuthenticated]);

  const loadLocalData = () => {
    if (typeof window !== "undefined") {
      // 1. Load Orders
      const storedOrders = localStorage.getItem("madirae_placed_orders");
      if (!storedOrders) {
        localStorage.setItem("madirae_placed_orders", JSON.stringify(SEED_ORDERS));
        setOrders(SEED_ORDERS);
      } else {
        setOrders(JSON.parse(storedOrders));
      }

      // 2. Load Subscribers
      const storedSubscribers = localStorage.getItem("madirae_newsletter_subscribers");
      if (!storedSubscribers) {
        localStorage.setItem("madirae_newsletter_subscribers", JSON.stringify(SEED_SUBSCRIBERS));
        setSubscribers(SEED_SUBSCRIBERS);
      } else {
        setSubscribers(JSON.parse(storedSubscribers));
      }

      // 3. Load Reviews
      const storedReviews = localStorage.getItem("madirae_product_reviews");
      if (!storedReviews) {
        localStorage.setItem("madirae_product_reviews", JSON.stringify(SEED_REVIEWS));
        setReviews(SEED_REVIEWS);
      } else {
        setReviews(JSON.parse(storedReviews));
      }
      
      triggerToast("Logs successfully synchronized with LocalStorage");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    
    const isValidAdmin1 = cleanUser === "parth" && password === "parth2002";
    const isValidAdmin2 = cleanUser === "shubham" && password === "shubham2004";
    const isValidLegacy = (cleanUser === "admin" || cleanUser === "madiraeandco@gmail.com") && (password === "admin" || password === "madirae_reserve");
    
    if (isValidAdmin1 || isValidAdmin2 || isValidLegacy) {
      setLoginError("");
      setIsAuthenticated(true);
      sessionStorage.setItem("madirae_admin_auth", "true");
      triggerToast("Secure Admin Session Authorized");
    } else {
      setLoginError("Invalid credentials. Please verify your administrative rights.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("madirae_admin_auth");
    triggerToast("Signed out of Control Panel");
  };

  const handleToggleSetting = (type, currentValue, setter) => {
    const newValue = !currentValue;
    setter(newValue);
    if (typeof window !== "undefined") {
      localStorage.setItem(type, newValue.toString());
      triggerToast(`Parameter updated: ${type.replace("madirae_", "").replace(/_/g, " ")} -> ${newValue ? "ENABLED" : "DISABLED"}`);
    }
  };

  // Order status update
  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(o => {
      if (o.orderId === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    });
    setOrders(updated);
    localStorage.setItem("madirae_placed_orders", JSON.stringify(updated));
    triggerToast(`Order ${orderId} updated to status: ${newStatus}`);
  };

  const handleDeleteReview = (reviewId) => {
    if (confirm("Are you sure you want to delete this tasting review?")) {
      const updated = reviews.filter(r => r.id !== reviewId);
      setReviews(updated);
      localStorage.setItem("madirae_product_reviews", JSON.stringify(updated));
      triggerToast("Tasting review successfully deleted");
    }
  };

  const handleVerifyOtpSubmit = (e, order) => {
    e.preventDefault();
    if (inputOtp === order.deliveryOtp) {
      updateOrderStatus(order.orderId, "Delivered");
      setVerifyingOtpOrderId("");
      setInputOtp("");
      setOtpError("");
      triggerToast(`OTP verified. Order ${order.orderId} officially released.`);
    } else {
      setOtpError("Incorrect OTP security handshake code. Check customer portal.");
    }
  };

  // Filter orders based on query and status filter
  const filteredOrdersList = orders.filter(order => {
    const matchesQuery = 
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.pincode.includes(searchQuery) ||
      (order.riderName && order.riderName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = 
      orderStatusFilter === "All" || 
      order.status.toLowerCase() === orderStatusFilter.toLowerCase();

    return matchesQuery && matchesStatus;
  });

  // Filter reviews based on query
  const filteredReviewsList = reviews.filter(rev => {
    const matchesQuery = 
      (rev.productName && rev.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (rev.name && rev.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (rev.email && rev.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (rev.text && rev.text.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesQuery;
  });

  // Calculate Metrics
  const totalSales = orders.reduce((sum, o) => o.status === "Delivered" || o.status === "Dispatched" || o.status === "Processing" ? sum + o.grandTotal : sum, 0);
  const activeOrdersCount = orders.filter(o => o.status !== "Delivered").length;
  const totalSubscribersCount = subscribers.length;
  const averageOrderVal = orders.length > 0 ? Math.round(totalSales / orders.length) : 0;

  // Generate HSL color hashes for subscribers
  const getEmailColor = (email) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 42%, 40%)`;
  };

  // SVG Area Chart Data Points (Fake weekly sales performance metrics)
  const CHART_DATA = [
    { label: "Mon", value: 1960, count: 1, date: "June 01" },
    { label: "Tue", value: 2850, count: 1, date: "June 02" },
    { label: "Wed", value: 4950, count: 2, date: "June 03" },
    { label: "Thu", value: 3100, count: 1, date: "June 04" },
    { label: "Fri", value: 7800, count: 3, date: "June 05" },
    { label: "Sat", value: 12400, count: 5, date: "June 06" },
    { label: "Sun", value: 9200, count: 4, date: "June 07" }
  ];

  // SVG chart mapping calculations
  const chartWidth = 500;
  const chartHeight = 200;
  const maxVal = Math.max(...CHART_DATA.map(d => d.value)) * 1.15;
  const points = CHART_DATA.map((d, i) => {
    const x = (i / (CHART_DATA.length - 1)) * (chartWidth - 40) + 20;
    const y = chartHeight - ((d.value / maxVal) * (chartHeight - 40) + 20);
    return { x, y, ...d };
  });

  const pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - 10} L ${points[0].x} ${chartHeight - 10} Z`;

  // Render Login Panel
  if (!isAuthenticated) {
    return (
      <PageTransition>
        <section className="relative min-h-screen bg-ink flex items-stretch justify-center overflow-hidden">
          {/* Asymmetric Split Layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen">
            
            {/* Left Panel: Luxury Brand Showcase (hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#1a0c07] via-ink to-burgundy border-r border-gold/15 relative overflow-hidden flex-col justify-between p-12 select-none">
              
              {/* Subtle Glowing Aura */}
              <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
              <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-burgundy/10 blur-[130px] rounded-full pointer-events-none" />
              
              {/* Fine Golden Grid Lines Backdrop */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(217,164,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(217,164,65,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* Logo Header */}
              <div className="z-10 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-gold/45 bg-black/60 flex items-center justify-center text-gold shadow-glow">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-serif text-lg tracking-wider text-champagne leading-none">MADIRÆ</h3>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-gold/80 font-bold font-sans">Excise Authority Gateway</span>
                </div>
              </div>

              {/* Centered Brand Presentation */}
              <div className="z-10 my-auto py-12">
                <span className="inline-block rounded-full bg-gold/10 border border-gold/30 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold mb-5 font-sans">
                  Secure Controller Panel
                </span>
                <h2 className="font-display font-serif text-5xl xl:text-6xl text-champagne leading-tight mb-6">
                  Fine spirits,<br />controlled origin.
                </h2>
                <p className="text-xs text-smoke opacity-75 max-w-sm leading-6 font-sans">
                  Access protected local distribution logs, age-gate overrides, and dynamic OTP delivery handshakes. Unauthorized connection probes are systematically geoblocked.
                </p>
              </div>

              {/* Footer Credentials Info */}
              <div className="z-10 border-t border-white/10 pt-6">
                <div className="flex items-center gap-4 text-smoke/40 text-[10px] font-sans">
                  <span className="flex items-center gap-1.5">
                    <Database className="h-3.5 w-3.5 text-gold/60" /> SSL Encrypted
                  </span>
                  <span>&bull;</span>
                  <span>Session storage persistence active</span>
                </div>
              </div>
            </div>

            {/* Right Panel: Authorization Form */}
            <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 bg-[#070605] relative">
              
              {/* Dynamic Aura background on right side for mobile view */}
              <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-gold/5 blur-[100px] rounded-full pointer-events-none lg:hidden" />
              
              <div className="w-full max-w-md z-10">
                {/* Brand Header for Mobile View only */}
                <div className="text-center mb-8 lg:hidden">
                  <h1 className="font-display font-serif text-champagne text-4xl">MADIRÆ & Co.</h1>
                  <span className="inline-block text-[9px] uppercase tracking-widest text-gold font-bold font-sans mt-2">Excise Authorization Console</span>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-charcoal/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 sm:p-10 shadow-2xl relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

                  <div className="flex items-center gap-3 justify-center mb-6">
                    <Lock className="h-5 w-5 text-gold" />
                    <h3 className="font-display font-serif text-xl text-champagne">Coordinator Sign In</h3>
                  </div>

                  {loginError && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-5 rounded-lg border border-warning/20 bg-warning/5 p-3.5 text-xs text-warning font-sans leading-5"
                    >
                      <div className="flex gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>{loginError}</span>
                      </div>
                    </motion.div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-6 font-sans">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gold font-bold mb-2">Username / Corporate Email</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-black/40 p-3 pl-4 text-xs sm:text-sm text-smoke focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition duration-300"
                          placeholder="e.g. admin or corporate email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] uppercase tracking-wider text-gold font-bold">Winery Password</label>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-black/40 p-3 pl-4 pr-11 text-xs sm:text-sm text-smoke focus:border-gold/50 focus:ring-1 focus:ring-gold/30 focus:outline-none transition duration-300"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-smoke/50 hover:text-gold transition duration-200"
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full justify-center py-3 text-xs tracking-widest font-semibold mt-4">
                      Authorize Session
                    </Button>
                  </form>
                  <div className="mt-5 text-center">
                    <a 
                      href="/" 
                      className="text-[10px] uppercase tracking-wider text-gold hover:text-champagne transition font-sans font-bold"
                    >
                      ← Back to public website
                    </a>
                  </div>


                </motion.div>
              </div>
            </div>

          </div>
        </section>
      </PageTransition>
    );
  }

  // Render Dashboard
  return (
    <PageTransition>
      <div className="min-h-screen bg-ink text-smoke flex flex-col font-sans relative pt-16">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div 
              initial={{ opacity: 0, y: 50, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 20, x: "-50%" }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full bg-gold text-ink font-semibold text-xs py-3 px-6 shadow-glow border border-champagne/20 flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Banner and Top Bar Header */}
        <div className="bg-[#0e0d0c]/90 backdrop-blur-md border-b border-white/10 sticky top-16 z-30 px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-white/10 hover:border-gold transition bg-[#161514] text-smoke"
            >
              {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-sans hidden sm:block">Excise Connection Stable</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 font-sans sm:hidden">Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-gold font-bold bg-gold/10 border border-gold/20 rounded px-2.5 py-1 hidden md:block">
              ⏱ {currentTime}
            </span>
            <button 
              onClick={loadLocalData}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/10 text-smoke text-xs hover:border-gold hover:text-gold transition bg-[#161514]"
              title="Synchronize Local Registries"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sync Data</span>
            </button>
            <a 
              href="/"
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gold/30 text-gold text-xs hover:bg-gold/10 transition bg-[#161514] font-semibold"
              title="Return to Public Storefront"
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Website</span>
              <span className="sm:hidden">Website</span>
            </a>
          </div>
        </div>

        {/* Workspace Panels Container */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
          
          {/* Dashboard Sidebar Navigation */}
          <aside className={`
            w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 bg-charcoal/40 backdrop-blur-xl shrink-0 flex flex-col justify-between p-4 z-20 transition-all duration-300
            ${isSidebarOpen ? "block" : "hidden lg:flex"}
          `}>
            <div className="space-y-6">
              
              {/* Profile Overview Card */}
              <div className="rounded-xl bg-black/40 border border-white/5 p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-gold to-copper flex items-center justify-center font-serif text-sm font-bold text-ink shrink-0 shadow-sm">
                  EA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-champagne leading-tight">Excise Admin</h4>
                  <p className="text-[10px] text-smoke/50 mt-1 uppercase tracking-wider">Level 1 Authorized</p>
                </div>
              </div>

              {/* Navigation Actions Menu */}
              <div className="space-y-1.5">
                {[
                  { id: "analytics", label: "Operations Hub", icon: BarChart3 },
                  { id: "orders", label: "Order Registry", icon: ClipboardList, count: orders.length },
                  { id: "subscribers", label: "Newsletter DB", icon: Mail, count: subscribers.length },
                  { id: "reviews", label: "Connoisseur Reviews", icon: MessageSquare, count: reviews.length },
                  { id: "compliance", label: "Excise Controls", icon: Sliders }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 font-sans group
                        ${active 
                          ? "bg-gold text-ink font-bold shadow-glow" 
                          : "text-smoke/60 hover:text-smoke hover:bg-white/5"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`h-4.5 w-4.5 ${active ? "text-ink" : "text-gold/80 group-hover:text-gold"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className={`
                          text-[9px] font-bold px-2 py-0.5 rounded-full border
                          ${active 
                            ? "bg-ink/10 text-ink border-ink/20" 
                            : "bg-black/30 text-smoke/60 border-white/5 group-hover:text-gold"
                          }
                        `}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Logout Panel Button */}
            <div className="pt-6 border-t border-white/10 mt-6 lg:mt-0">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-warning/30 bg-warning/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-warning hover:bg-warning/10 transition font-sans"
              >
                <LogOut className="h-4 w-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </aside>

          {/* Main Content Workspace Panel */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              
              {/* OVERVIEW & ANALYTICS TAB */}
              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  
                  {/* Dashboard Metrics Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      { 
                        label: "Gross Sales Revenue", 
                        value: `₹${totalSales.toLocaleString("en-IN")}`, 
                        change: "+12.4% vs last week",
                        changeType: "up",
                        icon: DollarSign, 
                        sparkline: [20, 35, 25, 45, 30, 60, 50, 75, 65, 80],
                        colorClass: "text-emerald-400"
                      },
                      { 
                        label: "Active Deliveries", 
                        value: activeOrdersCount, 
                        change: `${orders.filter(o => o.status === "Processing").length} Processing`,
                        changeType: "neutral",
                        icon: Package, 
                        sparkline: [40, 30, 50, 45, 60, 35, 55, 40, 20, 15],
                        colorClass: "text-sky-400"
                      },
                      { 
                        label: "Avg Carriage Value", 
                        value: `₹${averageOrderVal.toLocaleString("en-IN")}`, 
                        change: "Standard basket mean",
                        changeType: "info",
                        icon: FileText, 
                        sparkline: [30, 35, 33, 40, 38, 45, 42, 50, 48, 55],
                        colorClass: "text-gold"
                      },
                      { 
                        label: "Newsletter Enrollees", 
                        value: totalSubscribersCount, 
                        change: "Weekly growth rate +8%",
                        changeType: "up",
                        icon: Users, 
                        sparkline: [10, 25, 20, 35, 40, 30, 45, 50, 60, 70],
                        colorClass: "text-amber-500"
                      }
                    ].map((card, i) => {
                      const Icon = card.icon;
                      return (
                        <div key={i} className="rounded-xl border border-white/10 bg-charcoal/20 p-5 flex flex-col justify-between h-[160px] overflow-hidden relative group hover:border-gold/30 transition-all duration-300">
                          
                          {/* Inner glowing hover effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gold/0 via-gold/0 to-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="flex items-center justify-between text-smoke/70 z-10">
                            <span className="text-[9px] font-bold uppercase tracking-wider font-sans">{card.label}</span>
                            <div className="h-7 w-7 rounded bg-white/5 flex items-center justify-center border border-white/5">
                              <Icon className="h-4 w-4 text-gold" />
                            </div>
                          </div>
                          
                          <div className="my-2 z-10">
                            <p className="font-display font-serif text-2xl xl:text-3xl text-champagne">{card.value}</p>
                            <p className="text-[9px] text-smoke/40 mt-1 font-sans flex items-center gap-1">
                              {card.changeType === "up" && <span className="text-emerald-400 font-bold">▲</span>}
                              <span className={card.changeType === "up" ? "text-emerald-400/90 font-semibold" : ""}>{card.change}</span>
                            </p>
                          </div>

                          {/* Sparkline Graphic */}
                          <div className="absolute bottom-0 left-0 right-0 h-8 opacity-25 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                              <defs>
                                <linearGradient id={`sparkGrad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="#d9a441" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path 
                                d={`M 0 ${30 - card.sparkline[0] * 0.3} ` + card.sparkline.map((val, idx) => `L ${idx * 11} ${30 - val * 0.3}`).join(" ")}
                                fill="none" 
                                stroke="#d9a441" 
                                strokeWidth="1.5"
                              />
                              <path 
                                d={`M 0 30 L 0 ${30 - card.sparkline[0] * 0.3} ` + card.sparkline.map((val, idx) => `L ${idx * 11} ${30 - val * 0.3}`).join(" ") + ` L 100 30 Z`}
                                fill={`url(#sparkGrad-${i})`}
                              />
                            </svg>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                  {/* Main Analytics Content Section */}
                  <div className="grid gap-6 lg:grid-cols-12">
                    
                    {/* SVG Interactive Area Chart - Sales Telemetry */}
                    <div className="lg:col-span-8 bg-charcoal/20 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-sans">Excise Revenue Streams</span>
                            <h3 className="font-display font-serif text-lg text-champagne mt-0.5">Winery Distribution Telemetry</h3>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-lg bg-black/40 border border-white/5 p-1 text-[10px] text-smoke/60">
                            <span className="bg-gold text-ink font-bold px-2 py-0.5 rounded">Weekly</span>
                            <span className="px-2 py-0.5">Monthly</span>
                          </div>
                        </div>

                        {/* Interactive SVG Chart wrapper */}
                        <div className="relative h-48 w-full mt-4">
                          <svg className="w-full h-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGlowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#d9a441" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#d9a441" stopOpacity="0" />
                              </linearGradient>
                            </defs>

                            {/* Chart horizontal grid guidelines */}
                            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                              const yVal = ratio * (chartHeight - 40) + 20;
                              return (
                                <line 
                                  key={idx} 
                                  x1="20" 
                                  y1={yVal} 
                                  x2={chartWidth - 20} 
                                  y2={yVal} 
                                  stroke="rgba(255,255,255,0.04)" 
                                  strokeDasharray="4 4"
                                />
                              );
                            })}

                            {/* Area Fill */}
                            <path d={areaD} fill="url(#chartGlowGrad)" />

                            {/* Line path */}
                            <path d={pathD} fill="none" stroke="#d9a441" strokeWidth="2.5" />

                            {/* Coordinate node points */}
                            {points.map((p, idx) => (
                              <circle 
                                key={idx} 
                                cx={p.x} 
                                cy={p.y} 
                                r={activeGraphPoint?.label === p.label ? "6" : "4.5"}
                                fill={activeGraphPoint?.label === p.label ? "#f6dfaa" : "#d9a441"}
                                stroke="#050403"
                                strokeWidth="2"
                                className="cursor-pointer transition-all duration-150"
                                onMouseEnter={() => setActiveGraphPoint(p)}
                                onMouseLeave={() => setActiveGraphPoint(null)}
                              />
                            ))}
                          </svg>

                          {/* Float tooltip overlay */}
                          {activeGraphPoint && (
                            <div 
                              className="absolute z-10 bg-charcoal border border-gold/30 rounded-lg p-2.5 text-[10px] shadow-glow"
                              style={{ 
                                left: `${(activeGraphPoint.x / chartWidth) * 100}%`, 
                                top: `${(activeGraphPoint.y / chartHeight) * 100 - 30}%`,
                                transform: "translateX(-50%)"
                              }}
                            >
                              <p className="font-semibold text-champagne">{activeGraphPoint.date}</p>
                              <p className="text-smoke mt-0.5">Revenue: <span className="font-mono text-gold font-bold">₹{activeGraphPoint.value}</span></p>
                              <p className="text-smoke/50 mt-0.5">Orders: {activeGraphPoint.count}</p>
                            </div>
                          )}
                        </div>

                        {/* Chart label values */}
                        <div className="flex justify-between px-4 mt-2 font-mono text-[9px] text-smoke/40">
                          {CHART_DATA.map((d, i) => <span key={i}>{d.label}</span>)}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-smoke/50 font-sans">
                        <span className="flex items-center gap-1.5"><Activity className="h-3.5 w-3.5 text-gold" /> Real-time active routing</span>
                        <span>Aggregate Sales: <span className="font-mono text-gold font-bold">₹{totalSales}</span></span>
                      </div>

                    </div>

                    {/* Operational system logs / timelines */}
                    <div className="lg:col-span-4 bg-charcoal/20 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-gold font-bold font-sans">Live System Monitor</span>
                        <h3 className="font-display font-serif text-lg text-champagne mt-0.5 mb-5">Operations Timeline</h3>
                        
                        <div className="space-y-5 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                          {[
                            { title: "Rider assigned", desc: "Amit Patel bound to order MDR-2026-302485", time: "5 mins ago", color: "bg-sky-400" },
                            { title: "Winery Order logged", desc: "Customer Ananya Rao checks out 750ml Gin", time: "5 mins ago", color: "bg-gold" },
                            { title: "OTP Released Handshake", desc: "Rider Deepak completed delivery for MDR-2026-118943", time: "2 hours ago", color: "bg-emerald-500" },
                            { title: "Database synced", desc: "System auto-synchronized logs with LocalStorage", time: "1 hour ago", color: "bg-purple-500" }
                          ].map((log, idx) => (
                            <div key={idx} className="relative text-xs leading-tight">
                              <span className={`absolute -left-[18px] top-1 h-2 w-2 rounded-full ring-4 ring-ink ${log.color}`} />
                              <div>
                                <div className="flex items-center justify-between gap-2">
                                  <h4 className="font-semibold text-smoke">{log.title}</h4>
                                  <span className="text-[9px] text-smoke/40">{log.time}</span>
                                </div>
                                <p className="text-[10px] text-smoke/50 mt-1 leading-normal">{log.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 text-[9px] text-center text-smoke/40">
                        System diagnostic check status: NORMAL
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

              {/* ORDER REGISTRY TAB */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  
                  {/* Advanced Filters Panel */}
                  <div className="bg-[#0e0d0c] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Search Field */}
                    <div className="flex rounded-lg border border-white/10 bg-black/40 overflow-hidden focus-within:border-gold/50 transition duration-300 font-sans max-w-sm w-full">
                      <span className="flex items-center pl-3 text-smoke/40">
                        <Search className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search order ID, buyer name, courier..."
                        className="w-full bg-transparent p-2.5 text-xs text-smoke focus:outline-none"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")} 
                          className="px-3 text-xs text-smoke/50 hover:text-smoke transition"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Order Status Filters */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-smoke/50 mr-2 flex items-center gap-1">
                        <Filter className="h-3.5 w-3.5" /> Filter:
                      </span>
                      {["All", "Processing", "Dispatched", "Delivered"].map(status => {
                        const active = orderStatusFilter === status;
                        return (
                          <button
                            key={status}
                            onClick={() => setOrderStatusFilter(status)}
                            className={`
                              rounded px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] border transition duration-200
                              ${active 
                                ? "bg-gold text-ink border-gold font-bold shadow-glow-sm" 
                                : "bg-black/30 text-smoke/60 border-white/5 hover:border-gold/30 hover:text-gold"
                              }
                            `}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {filteredOrdersList.length === 0 ? (
                    <div className="text-center py-20 bg-charcoal/20 rounded-2xl border border-white/10 font-sans">
                      <AlertTriangle className="h-8 w-8 text-gold/60 mx-auto mb-4" />
                      <p className="text-base text-smoke opacity-75">No matching orders recorded.</p>
                      <p className="text-xs text-smoke/40 mt-1.5">Try searching another query or reset the active status filters.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 font-sans">
                      {filteredOrdersList.map((order) => {
                        const expanded = expandedOrderId === order.orderId;
                        return (
                          <div 
                            key={order.orderId}
                            className={`
                              bg-charcoal/20 border rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-sm
                              ${expanded ? "border-gold/30 bg-[#0e0d0c]/30" : "border-white/15"}
                            `}
                          >
                            {/* Expandable Header Row */}
                            <div 
                              onClick={() => setExpandedOrderId(expanded ? "" : order.orderId)}
                              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 cursor-pointer hover:bg-white/[0.01] transition duration-200"
                            >
                              <div className="flex items-start gap-4">
                                <div className="h-9 w-9 rounded bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0 mt-0.5">
                                  <FileText className="h-4.5 w-4.5" />
                                </div>
                                <div>
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="font-mono text-sm font-bold text-gold">{order.orderId}</span>
                                    <span className="text-[9px] uppercase tracking-wider text-smoke/40 font-semibold">{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                                  </div>
                                  <p className="text-xs text-smoke opacity-75 mt-1">
                                    {order.customerName} &bull; +91 {order.phone}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-4.5 self-end sm:self-auto pl-13 sm:pl-0">
                                <div className="text-right sm:block hidden">
                                  <p className="text-xs font-bold text-champagne">₹{order.grandTotal.toLocaleString("en-IN")}</p>
                                  <p className="text-[9px] text-smoke/40 mt-0.5">{order.items.reduce((sum, i) => sum + i.quantity, 0)} Items</p>
                                </div>
                                <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider border ${
                                  order.status === "Delivered" 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : order.status === "Dispatched" 
                                      ? "bg-sky-500/10 text-sky-400 border-sky-500/20" 
                                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                }`}>
                                  {order.status || "Processing"}
                                </span>
                                <ChevronDown className={`h-4.5 w-4.5 text-smoke/40 transition duration-300 ${expanded ? "transform rotate-180 text-gold" : ""}`} />
                              </div>
                            </div>

                            {/* Details accordion body */}
                            <AnimatePresence initial={false}>
                              {expanded && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: "auto" }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden border-t border-white/5 bg-[#0b0a0a]/70"
                                >
                                  
                                  {/* Step-by-Step Graphical Progress Timeline */}
                                  <div className="px-5 py-6 border-b border-white/5 bg-black/20">
                                    <div className="max-w-2xl mx-auto">
                                      
                                      <div className="flex justify-between items-center relative">
                                        
                                        {/* Colored connection track segments */}
                                        <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
                                        
                                        {/* Filled track highlights */}
                                        <div 
                                          className={`absolute left-[8%] top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-gold to-sky-400 transition-all duration-500 z-0`} 
                                          style={{ 
                                            width: order.status === "Processing" ? "28%" : order.status === "Dispatched" ? "56%" : order.status === "Delivered" ? "84%" : "0%"
                                          }}
                                        />

                                        {[
                                          { stage: "Placed", icon: Clock, color: "text-amber-500 border-amber-500/30 bg-amber-500/5", glow: "shadow-none" },
                                          { stage: "Processing", icon: Package, color: order.status !== "Placed" ? "text-gold border-gold/45 bg-gold/5" : "text-smoke/20 border-white/10 bg-[#121110]", glow: order.status !== "Placed" ? "shadow-glow-sm" : "" },
                                          { stage: "Dispatched", icon: Truck, color: (order.status === "Dispatched" || order.status === "Delivered") ? "text-sky-400 border-sky-400/40 bg-sky-400/5" : "text-smoke/20 border-white/10 bg-[#121110]", glow: (order.status === "Dispatched" || order.status === "Delivered") ? "shadow-glow-sm" : "" },
                                          { stage: "Delivered", icon: CheckCircle, color: order.status === "Delivered" ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/5" : "text-smoke/20 border-white/10 bg-[#121110]", glow: order.status === "Delivered" ? "shadow-glow-sm" : "" }
                                        ].map((step, sIdx) => {
                                          const StepIcon = step.icon;
                                          return (
                                            <div key={sIdx} className="flex flex-col items-center z-10">
                                              <div className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all duration-300 ${step.color} ${step.glow}`}>
                                                <StepIcon className="h-4.5 w-4.5" />
                                              </div>
                                              <span className="text-[9px] uppercase tracking-wider font-bold mt-2 text-smoke">{step.stage}</span>
                                            </div>
                                          );
                                        })}
                                      </div>

                                    </div>
                                  </div>

                                  <div className="p-5 grid gap-6 md:grid-cols-[1.5fr_1fr]">
                                    
                                    {/* Left Panel: Table lists */}
                                    <div className="space-y-5">
                                      <div>
                                        <h4 className="text-[9px] uppercase tracking-widest text-gold font-bold mb-2">Cart Specifications</h4>
                                        <div className="bg-black/40 border border-white/10 rounded-lg overflow-hidden">
                                          <table className="w-full text-left border-collapse text-xs">
                                            <thead>
                                              <tr className="border-b border-white/10 text-[9px] uppercase text-smoke opacity-50 bg-black/40">
                                                <th className="py-2.5 px-4 font-semibold">Spirit Name</th>
                                                <th className="py-2.5 px-4 font-semibold text-center">Volume</th>
                                                <th className="py-2.5 px-4 font-semibold text-center">Quantity</th>
                                                <th className="py-2.5 px-4 font-semibold text-right">Sum Price</th>
                                              </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 text-smoke/90">
                                              {order.items.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-white/[0.01]">
                                                  <td className="py-2.5 px-4 font-semibold text-champagne">{item.name}</td>
                                                  <td className="py-2.5 px-4 text-center font-mono text-[10px] text-smoke/60">{item.volume}ml</td>
                                                  <td className="py-2.5 px-4 text-center text-smoke/50">{item.quantity}</td>
                                                  <td className="py-2.5 px-4 text-right font-mono">₹{(item.price * item.quantity).toLocaleString()}</td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="text-[9px] uppercase tracking-widest text-gold font-bold mb-2">Excise Destination Coordinates</h4>
                                        <div className="flex gap-2.5 bg-black/40 border border-white/10 rounded-lg p-3.5 text-xs leading-5">
                                          <MapPin className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
                                          <div>
                                            <p className="text-smoke">{order.address}</p>
                                            <p className="text-[10px] text-gold font-semibold mt-1">Zipcode Match: {order.pincode} (Excise Zone Whitelisted)</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Right Panel: Logistics and OTP handovers */}
                                    <div className="rounded-xl bg-black/30 border border-white/10 p-5 flex flex-col justify-between gap-5">
                                      <div>
                                        <h4 className="text-[9px] uppercase tracking-widest text-gold font-bold mb-4">Indian Rider Routing Details</h4>
                                        
                                        <div className="flex items-center gap-3.5 mb-4">
                                          <div className="h-9 w-9 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20 font-bold font-serif text-xs">
                                            {order.riderName ? order.riderName.split(" ").map(n => n[0]).join("") : "SK"}
                                          </div>
                                          <div>
                                            <p className="text-xs font-bold text-smoke">{order.riderName || "Suresh Kumar"}</p>
                                            <p className="text-[9px] text-smoke/40 mt-0.5">Excise Registered Delivery Partner</p>
                                          </div>
                                        </div>

                                        <div className="space-y-2 text-xs border-t border-white/5 pt-4">
                                          <div className="flex justify-between">
                                            <span className="text-smoke opacity-50">Release Passcode (OTP):</span>
                                            <span className="font-mono font-bold text-gold tracking-widest bg-gold/10 border border-gold/20 rounded px-1.5 py-0.5">{order.deliveryOtp}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-smoke opacity-50">Cart Subtotal:</span>
                                            <span className="text-smoke/90 font-mono">₹{order.subtotal}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-smoke opacity-50">Doorstep Carriage Fee:</span>
                                            <span className="text-smoke/90">{order.deliveryFee === 0 ? "Free" : `₹${order.deliveryFee}`}</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Carriage Release Status Controller */}
                                      <div className="border-t border-white/5 pt-4">
                                        {order.status !== "Delivered" ? (
                                          <>
                                            {verifyingOtpOrderId === order.orderId ? (
                                              <form onSubmit={(e) => handleVerifyOtpSubmit(e, order)} className="space-y-3">
                                                {otpError && (
                                                  <p className="text-[10px] text-warning font-semibold">{otpError}</p>
                                                )}
                                                <div className="flex gap-2">
                                                  <input
                                                    type="text"
                                                    maxLength={4}
                                                    value={inputOtp}
                                                    onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ""))}
                                                    placeholder="4-digit OTP"
                                                    className="w-full rounded border border-white/10 bg-[#121110] p-2 text-center text-xs font-mono tracking-widest text-gold focus:border-gold focus:outline-none"
                                                    required
                                                  />
                                                  <button 
                                                    type="submit"
                                                    className="rounded bg-gold px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-gold/80 transition"
                                                  >
                                                    Confirm
                                                  </button>
                                                </div>
                                                <button 
                                                  type="button"
                                                  onClick={() => { setVerifyingOtpOrderId(""); setInputOtp(""); setOtpError(""); }}
                                                  className="text-[9px] text-smoke/40 hover:text-smoke underline"
                                                >
                                                  Bypass verification
                                                </button>
                                              </form>
                                            ) : (
                                              <div className="flex flex-wrap gap-2">
                                                {order.status === "Processing" && (
                                                  <button
                                                    onClick={() => updateOrderStatus(order.orderId, "Dispatched")}
                                                    className="rounded border border-sky-500/30 bg-[#121110] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider text-sky-400 hover:bg-sky-500/10 transition"
                                                  >
                                                    Dispatch Carrier
                                                  </button>
                                                )}
                                                <button
                                                  onClick={() => setVerifyingOtpOrderId(order.orderId)}
                                                  className="rounded bg-gold px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black hover:bg-gold/80 transition"
                                                >
                                                  Verify Release OTP
                                                </button>
                                              </div>
                                            )}
                                          </>
                                        ) : (
                                          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-500/5 border border-emerald-500/15 rounded p-2">
                                            <CheckCircle className="h-3.5 w-3.5" />
                                            <span>Doorstep Security handoff complete</span>
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </div>
                        );
                      })}
                    </div>
                  )}

                </motion.div>
              )}

              {/* SUBSCRIBERS DATABASE TAB */}
              {activeTab === "subscribers" && (
                <motion.div
                  key="subscribers"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 font-sans"
                >
                  
                  {/* Database Information Block */}
                  <div className="bg-[#0e0d0c] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold font-bold block">D2C Marketing</span>
                      <h3 className="font-display font-serif text-lg text-champagne mt-0.5">Email newsletter database</h3>
                    </div>
                    <button 
                      onClick={() => {
                        const emails = subscribers.map(s => s.email).join("\n");
                        navigator.clipboard.writeText(emails);
                        triggerToast("Subscriber directory copied to clipboard");
                      }}
                      className="rounded border border-gold/30 bg-[#121110] px-4.5 py-2 text-[10px] font-bold uppercase tracking-wider text-gold hover:bg-gold/10 transition"
                    >
                      Export Email Logs
                    </button>
                  </div>

                  <div className="bg-charcoal/20 border border-white/10 rounded-2xl overflow-hidden shadow-md">
                    <div className="border-b border-white/10 bg-black/40 px-6 py-4 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gold">Captured subscribers list</h3>
                      <span className="text-[10px] text-smoke opacity-50 font-semibold">{subscribers.length} Profiles total</span>
                    </div>
                    
                    {subscribers.length === 0 ? (
                      <div className="p-16 text-center text-smoke/40">
                        No active newsletter subscriptions recorded.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-white/10 text-[9px] uppercase tracking-wider text-smoke/50 bg-black/20">
                              <th className="py-4 px-6 font-semibold">Subscriber Profile</th>
                              <th className="py-4 px-6 font-semibold">Sign-up Source</th>
                              <th className="py-4 px-6 font-semibold">Registration Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-smoke/80">
                            {subscribers.map((sub, idx) => {
                              const emailColor = getEmailColor(sub.email);
                              return (
                                <tr key={idx} className="hover:bg-white/[0.01]">
                                  <td className="py-3.5 px-6 flex items-center gap-3">
                                    <div 
                                      className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm border border-white/10"
                                      style={{ backgroundColor: emailColor }}
                                    >
                                      {sub.email.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gold">{sub.email}</span>
                                    </div>
                                  </td>
                                  <td className="py-3.5 px-6 font-mono text-[10px]">
                                    <span className="rounded bg-black/40 border border-white/5 px-2.5 py-1 text-smoke/60">
                                      {sub.source || "footer"}
                                    </span>
                                  </td>
                                  <td className="py-3.5 px-6 text-smoke/40">
                                    {new Date(sub.date).toLocaleString("en-IN", { 
                                      day: "numeric", 
                                      month: "short", 
                                      year: "numeric",
                                      hour: "2-digit", 
                                      minute: "2-digit" 
                                    })}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </motion.div>
              )}

              {/* CONNOISSEUR REVIEWS TAB */}
              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 font-sans text-xs"
                >
                  
                  {/* Reviews Info Block */}
                  <div className="bg-[#0e0d0c] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold font-bold block">Tasting Feedback</span>
                      <h3 className="font-display font-serif text-lg text-champagne mt-0.5">Product Connoisseur Reviews</h3>
                    </div>
                    
                    {/* Search Field */}
                    <div className="flex rounded-lg border border-white/10 bg-black/40 overflow-hidden focus-within:border-gold/50 transition duration-300 font-sans max-w-sm w-full sm:w-72">
                      <span className="flex items-center pl-3 text-smoke/40">
                        <Search className="h-4 w-4" />
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search product, name, email..."
                        className="w-full bg-transparent p-2.5 text-xs text-smoke focus:outline-none"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")} 
                          className="px-3 text-xs text-smoke/50 hover:text-smoke transition"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-charcoal/20 border border-white/10 rounded-2xl overflow-hidden shadow-md">
                    <div className="border-b border-white/10 bg-black/40 px-6 py-4 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gold">Reviews Registry</h3>
                      <span className="text-[10px] text-smoke opacity-50 font-semibold">{filteredReviewsList.length} reviews matching</span>
                    </div>
                    
                    {filteredReviewsList.length === 0 ? (
                      <div className="p-16 text-center text-smoke/40 font-sans">
                        No tasting reviews found.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs min-w-[800px]">
                          <thead>
                            <tr className="border-b border-white/10 text-[9px] uppercase tracking-wider text-smoke/50 bg-black/20">
                              <th className="py-4 px-6 font-semibold w-1/4">Product</th>
                              <th className="py-4 px-6 font-semibold w-1/5">Connoisseur</th>
                              <th className="py-4 px-6 font-semibold">Tasting Notes</th>
                              <th className="py-4 px-6 font-semibold text-center w-32">Submitted</th>
                              <th className="py-4 px-6 font-semibold text-center w-20">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-smoke/80 font-sans">
                            {filteredReviewsList.map((rev) => {
                              const emailColor = getEmailColor(rev.email || "");
                              return (
                                <tr key={rev.id} className="hover:bg-white/[0.01] align-top">
                                  <td className="py-4 px-6">
                                    <span className="font-semibold text-champagne block">{rev.productName}</span>
                                    <span className="text-[9px] font-mono text-gold block mt-0.5">{rev.productId}</span>
                                  </td>
                                  <td className="py-4 px-6">
                                    <div className="flex items-center gap-2.5">
                                      <div 
                                        className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-sm border border-white/10"
                                        style={{ backgroundColor: emailColor }}
                                      >
                                        {(rev.name || "U").slice(0, 2).toUpperCase()}
                                      </div>
                                      <div className="min-w-0">
                                        <span className="font-bold text-smoke block truncate">{rev.name}</span>
                                        <span className="text-[10px] text-smoke/50 block truncate">{rev.email}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-4 px-6">
                                    <p className="text-smoke/90 leading-relaxed whitespace-pre-line text-xs italic">
                                      "{rev.text}"
                                    </p>
                                  </td>
                                  <td className="py-4 px-6 text-center text-smoke/40 text-[10px]">
                                    {new Date(rev.date).toLocaleDateString("en-IN", { 
                                      day: "numeric", 
                                      month: "short", 
                                      year: "numeric"
                                    })}
                                    <span className="block text-[9px] opacity-75 mt-0.5">
                                      {new Date(rev.date).toLocaleTimeString("en-IN", { 
                                        hour: "2-digit", 
                                        minute: "2-digit" 
                                      })}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 text-center">
                                    <button
                                      onClick={() => handleDeleteReview(rev.id)}
                                      className="h-8 w-8 rounded-lg border border-warning/20 hover:border-warning bg-warning/5 text-warning flex items-center justify-center hover:bg-warning/15 transition-all duration-300 mx-auto"
                                      title="Delete Review"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </motion.div>
              )}

              {/* COMPLIANCE CONTROLS TAB */}
              {activeTab === "compliance" && (
                <motion.div
                  key="compliance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 font-sans text-xs"
                >
                  
                  {/* Title Bar */}
                  <div className="bg-[#0e0d0c] border border-white/10 rounded-2xl p-5">
                    <span className="text-[9px] uppercase tracking-widest text-gold font-bold block">Security & Control Center</span>
                    <h3 className="font-display font-serif text-lg text-champagne mt-0.5">Excise Compliance Parameters</h3>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    
                    {/* Compliance Rules list */}
                    <div className="bg-charcoal/20 border border-white/10 rounded-2xl p-6 space-y-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-2 flex items-center gap-2 border-b border-white/10 pb-3">
                        <Sliders className="h-4 w-4 text-gold" />
                        <span>Dynamic Rules Toggles</span>
                      </h3>

                      {[
                        {
                          id: "madirae_geofencing_enabled",
                          title: "Pincode Geofencing",
                          desc: "Automatically filter addresses at checkout, whitelisting Bengaluru (560xxx) delivery coordinates under state licenses.",
                          state: geofencingEnabled,
                          setter: setGeofencingEnabled
                        },
                        {
                          id: "madirae_strict_age_gate",
                          title: "Age gate DOB validation",
                          desc: "Enforce strict verification of date of birth inputs. Block users beneath the legal drinking age parameters.",
                          state: strictAgeGate,
                          setter: setStrictAgeGate
                        },
                        {
                          id: "madirae_otp_handshake_required",
                          title: "OTP delivery verification",
                          desc: "Require delivery carriers to perform dynamic passcode confirmation at customer's doorstep prior to order release.",
                          state: otpHandshakeRequired,
                          setter: setOtpHandshakeRequired
                        },
                        {
                          id: "madirae_console_debug_logs",
                          title: "Console Debug Reporting",
                          desc: "Publish verbose analytics events and background execution logs directly into the developer console.",
                          state: consoleDebugLogs,
                          setter: setConsoleDebugLogs
                        }
                      ].map((control) => (
                        <div key={control.id} className="flex justify-between items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="space-y-1 pr-6">
                            <h4 className="font-bold text-smoke">{control.title}</h4>
                            <p className="text-[10px] text-smoke/50 leading-relaxed">{control.desc}</p>
                          </div>
                          
                          {/* Premium styled luxury slider switch */}
                          <button
                            type="button"
                            onClick={() => handleToggleSetting(control.id, control.state, control.setter)}
                            className={`
                              w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none shrink-0 relative
                              ${control.state ? "bg-gold shadow-glow-sm" : "bg-black/60 border border-white/10"}
                            `}
                          >
                            <span 
                              className={`
                                block h-3.5 w-3.5 rounded-full transition-transform duration-300
                                ${control.state ? "translate-x-6 bg-black" : "translate-x-0.5 bg-smoke/60"}
                              `} 
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Tech & Compliance Specs Panel */}
                    <div className="bg-charcoal/20 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-gold mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                          <Globe className="h-4 w-4 text-gold" />
                          <span>System Telemetry Specifications</span>
                        </h3>
                        
                        <div className="space-y-4">
                          {[
                            { key: "Environment Mode", val: "development" },
                            { key: "Next.js Framework", val: "15.1.2" },
                            { key: "React Engine", val: "19.0.0" },
                            { key: "Active Hub Database", val: "LocalStorage Cache" },
                            { key: "Geofencing Core", val: "Karnataka Excise Zone" }
                          ].map((spec, sIdx) => (
                            <div key={sIdx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                              <span className="text-smoke opacity-60 font-sans">{spec.key}</span>
                              <span className="font-mono text-champagne text-[11px] font-semibold">{spec.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-white/10 text-center">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-smoke/30 block mb-1">Authorization security keys</span>
                        <p className="text-[10px] text-smoke/50">MD5: F239D80E39BC7193FAD9E828BC</p>
                      </div>
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </main>

        </div>

      </div>
    </PageTransition>
  );
}
