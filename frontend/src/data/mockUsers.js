export const roleLabels = {
  operations: "Operations Lead",
  "road-captain": "Road Captain",
  safety: "Safety Officer",
  finance: "Finance Hub",
  destination: "Destination Control",
};

export const roleDashboardMap = {
  operations: "/dashboard/operations",
  "road-captain": "/dashboard/road-captain",
  safety: "/dashboard/safety",
  finance: "/dashboard/finance",
  destination: "/dashboard/destination",
};

export const roleDescriptions = {
  operations: "Manage vehicles, drivers, fleet operations, and reports.",
  "road-captain": "Manage assigned trips, routes, fuel logs, and deliveries.",
  safety: "Monitor driver compliance, incidents, inspections, and licenses.",
  finance: "Manage expenses, fuel costs, profitability, and invoices.",
  destination: "Track incoming deliveries, warehouse operations, and proof of delivery.",
};

export const roleIcons = {
  operations: "LayoutDashboard",
  "road-captain": "Navigation",
  safety: "ShieldCheck",
  finance: "BarChart3",
  destination: "MapPin",
};

export const mockUsers = [
  { id: 1, email: "admin@transitops.com", password: "admin123", role: "operations", name: "Admin User" },
  { id: 2, email: "operations@transitops.com", password: "password123", role: "operations", name: "Sarah Chen" },
  { id: 3, email: "captain@transitops.com", password: "password123", role: "road-captain", name: "Mike Johnson" },
  { id: 4, email: "safety@transitops.com", password: "password123", role: "safety", name: "Emma Wilson" },
  { id: 5, email: "finance@transitops.com", password: "password123", role: "finance", name: "James Miller" },
  { id: 6, email: "destination@transitops.com", password: "password123", role: "destination", name: "Lisa Brown" },
  { id: 7, email: "demo@transitops.com", password: "demo123", role: "operations", name: "Demo User" },
];
