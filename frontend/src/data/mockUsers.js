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
  { id: 1, email: "admin@transitops.com", password: "Admin@123", role: "operations", name: "Operation Lead" },
  { id: 2, email: "driver@transitops.com", password: "Driver@123", role: "road-captain", name: "Road Captain" },
  { id: 3, email: "safety@transitops.com", password: "Safety@123", role: "safety", name: "Safety Officer" },
  { id: 4, email: "finance@transitops.com", password: "Finance@123", role: "finance", name: "Finance Hub" },
  { id: 5, email: "receiver@transitops.com", password: "Receiver@123", role: "destination", name: "Destination Control" },
];
