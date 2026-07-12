import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { useToast } from "../../components/common/Toast";
import { 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Search, 
  Filter, 
  Upload, 
  X, 
  Eye, 
  Edit, 
  ArrowLeftRight, 
  Trash, 
  Save,
  RotateCcw,
  Barcode,
  Tag,
  Hash,
  MapPin,
  RefreshCw,
  Building,
  User,
  DollarSign,
  Calendar,
  Layers
} from "lucide-react";
import { cn } from "../../utils/utils";

// Initial items extended with full enterprise data fields
const initialInventory = [
  { 
    id: "INV-001", 
    item: "Electronics Package A", 
    quantity: 245, 
    location: "Mumbai Central Hub", 
    lastUpdated: "2026-07-12", 
    status: "In Stock", 
    category: "Electronics",
    itemCode: "ITM-1001",
    sku: "EL-PKG-A-001",
    barcode: "8901234567890",
    unit: "Cartons",
    minStock: 50,
    maxStock: 500,
    reorderLevel: 100,
    storageSection: "Zone A",
    rackNumber: "R-12",
    shelfNumber: "S-04",
    binNumber: "B-02",
    supplierName: "Reliance Retail Ltd",
    supplierContact: "+91 98200 12345",
    purchasePrice: 450,
    sellingPrice: 750,
    mfgDate: "2026-01-15",
    expiryDate: "2027-01-15",
    description: "Bulk consumer electronics accessories package.",
    image: null
  },
  { 
    id: "INV-002", 
    item: "Auto Parts Kit B", 
    quantity: 120, 
    location: "Chennai Distribution", 
    lastUpdated: "2026-07-12", 
    status: "In Stock", 
    category: "Auto Parts",
    itemCode: "ITM-1002",
    sku: "AP-KIT-B-002",
    barcode: "8901234567891",
    unit: "Pieces",
    minStock: 30,
    maxStock: 300,
    reorderLevel: 60,
    storageSection: "Zone B",
    rackNumber: "R-08",
    shelfNumber: "S-02",
    binNumber: "B-07",
    supplierName: "HUL Distribution",
    supplierContact: "+91 98555 56789",
    purchasePrice: 120,
    sellingPrice: 200,
    mfgDate: "2026-02-10",
    expiryDate: "",
    description: "Heavy-duty automotive spares & repair kit.",
    image: null
  },
  { 
    id: "INV-003", 
    item: "Textile Bundle C", 
    quantity: 80, 
    location: "Delhi North Facility", 
    lastUpdated: "2026-07-11", 
    status: "Low Stock", 
    category: "Textiles",
    itemCode: "ITM-1003",
    sku: "TX-BDL-C-003",
    barcode: "8901234567892",
    unit: "Boxes",
    minStock: 50,
    maxStock: 500,
    reorderLevel: 100,
    storageSection: "Zone C",
    rackNumber: "R-15",
    shelfNumber: "S-01",
    binNumber: "B-03",
    supplierName: "Amazon India",
    supplierContact: "+91 98333 34567",
    purchasePrice: 800,
    sellingPrice: 1350,
    mfgDate: "2026-03-01",
    expiryDate: "",
    description: "Premium cotton textiles bundles, 100m rolls.",
    image: null
  },
  { 
    id: "INV-004", 
    item: "Chemical Drums D", 
    quantity: 45, 
    location: "Kochi Port Terminal", 
    lastUpdated: "2026-07-11", 
    status: "In Stock", 
    category: "Chemicals",
    itemCode: "ITM-1004",
    sku: "CH-DRM-D-004",
    barcode: "8901234567893",
    unit: "Liters",
    minStock: 20,
    maxStock: 100,
    reorderLevel: 40,
    storageSection: "HazMat A",
    rackNumber: "R-02",
    shelfNumber: "S-05",
    binNumber: "B-01",
    supplierName: "Tata Chemicals",
    supplierContact: "+91 98444 45678",
    purchasePrice: 220,
    sellingPrice: 380,
    mfgDate: "2026-01-20",
    expiryDate: "2028-01-20",
    description: "Industrial cleaning chemicals solvent agent.",
    image: null
  },
  { 
    id: "INV-005", 
    item: "Steel Coils E", 
    quantity: 15, 
    location: "Mumbai Central Hub", 
    lastUpdated: "2026-07-10", 
    status: "Critical", 
    category: "Metals",
    itemCode: "ITM-1005",
    sku: "ST-COI-E-005",
    barcode: "8901234567894",
    unit: "Tons",
    minStock: 20,
    maxStock: 100,
    reorderLevel: 35,
    storageSection: "Zone Heavy",
    rackNumber: "Floor",
    shelfNumber: "A-01",
    binNumber: "H-05",
    supplierName: "Global Iron Ltd",
    supplierContact: "+91 22 4589 1234",
    purchasePrice: 4200,
    sellingPrice: 5900,
    mfgDate: "2025-11-05",
    expiryDate: "",
    description: "Cold rolled structural steel coils.",
    image: null
  },
  { 
    id: "INV-006", 
    item: "FMCG Cartons F", 
    quantity: 500, 
    location: "Bangalore Tech Park", 
    lastUpdated: "2026-07-12", 
    status: "In Stock", 
    category: "FMCG",
    itemCode: "ITM-1006",
    sku: "FM-CRT-F-006",
    barcode: "8901234567895",
    unit: "Cartons",
    minStock: 100,
    maxStock: 1500,
    reorderLevel: 250,
    storageSection: "Zone FMCG",
    rackNumber: "R-22",
    shelfNumber: "S-03",
    binNumber: "B-12",
    supplierName: "HUL Distribution",
    supplierContact: "+91 98555 56789",
    purchasePrice: 90,
    sellingPrice: 150,
    mfgDate: "2026-05-12",
    expiryDate: "2026-11-12",
    description: "Pre-packaged packaged fast moving consumer goods.",
    image: null
  },
];

const warehouses = [
  "Mumbai Central Hub",
  "Chennai Distribution",
  "Delhi North Facility",
  "Bangalore Tech Park",
  "Kochi Port Terminal"
];

const categories = [
  "Electronics",
  "Auto Parts",
  "Textiles",
  "Chemicals",
  "Metals",
  "FMCG"
];

const units = [
  "Pieces",
  "Boxes",
  "Cartons",
  "Kg",
  "Liters",
  "Tons"
];

export default function InventoryPage() {
  const showToast = useToast();

  // Mock database state
  const [items, setItems] = useState(initialInventory);
  
  // Search & Filter State
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterWarehouse, setFilterWarehouse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modal State
  const [activeModal, setActiveModal] = useState(null); // 'add' | 'edit' | 'view' | 'updateStock' | 'transferStock' | 'delete'
  const [selectedItem, setSelectedItem] = useState(null);

  // Form State
  const [formValues, setFormValues] = useState(getEmptyFormValues());
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // Stock Adjustment Form State
  const [stockAdjustment, setStockAdjustment] = useState({
    action: "add",
    qty: "",
    reason: "Received Shipment"
  });
  const [stockAdjustmentErrors, setStockAdjustmentErrors] = useState({});

  // Transfer Form State
  const [transferState, setTransferState] = useState({
    targetWarehouse: "",
    qty: "",
    storageSection: "",
    rackNumber: "",
    shelfNumber: "",
    binNumber: ""
  });
  const [transferErrors, setTransferErrors] = useState({});

  // Initialize values helper
  function getEmptyFormValues() {
    return {
      item: "",
      itemCode: "",
      category: "",
      sku: "",
      barcode: "",
      quantity: "",
      unit: "Pieces",
      minStock: "",
      maxStock: "",
      reorderLevel: "",
      location: "",
      storageSection: "",
      rackNumber: "",
      shelfNumber: "",
      binNumber: "",
      supplierName: "",
      supplierContact: "",
      purchasePrice: "",
      sellingPrice: "",
      mfgDate: "",
      expiryDate: "",
      description: "",
      image: null
    };
  }

  // Calculate status badge helper
  const calculateStatus = (qty, reorder, min) => {
    const q = Number(qty);
    const r = Number(reorder);
    const m = Number(min);
    if (q <= m) return "Critical";
    if (q <= r) return "Low Stock";
    return "In Stock";
  };

  // KPIs dynamically computed
  const kpis = useMemo(() => {
    let inStock = 0;
    let lowStock = 0;
    let critical = 0;

    items.forEach(item => {
      if (item.status === "In Stock") inStock++;
      else if (item.status === "Low Stock") lowStock++;
      else if (item.status === "Critical") critical++;
    });

    return {
      total: items.length,
      inStock,
      lowStock,
      critical
    };
  }, [items]);

  // Filtered Inventory Data
  const filteredData = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = 
        item.item.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.itemCode.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = filterCategory === "All" || item.category === filterCategory;
      const matchesWarehouse = filterWarehouse === "All" || item.location === filterWarehouse;
      const matchesStatus = filterStatus === "All" || item.status === filterStatus;

      return matchesSearch && matchesCategory && matchesWarehouse && matchesStatus;
    });
  }, [items, search, filterCategory, filterWarehouse, filterStatus]);

  // Auto-generate Item Code helper
  const generateItemCode = () => {
    let isUnique = false;
    let randomCode = "";
    while (!isUnique) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      randomCode = `ITM-${randomNum}`;
      if (!items.some(item => item.itemCode === randomCode)) {
        isUnique = true;
      }
    }
    setFormValues(prev => ({ ...prev, itemCode: randomCode }));
    setFormErrors(prev => ({ ...prev, itemCode: "" }));
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setFormErrors(prev => ({ ...prev, image: "Only PNG, JPG, or JPEG images are allowed." }));
      return;
    }

    setFormErrors(prev => ({ ...prev, image: "" }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormValues(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
    
    if (!formValues.item.trim()) errors.item = "Item Name is required.";
    
    if (!formValues.itemCode.trim()) {
      errors.itemCode = "Item Code is required.";
    } else if (items.some(item => item.itemCode === formValues.itemCode && (!selectedItem || item.id !== selectedItem.id))) {
      errors.itemCode = "Item Code must be unique.";
    }

    if (!formValues.category) errors.category = "Category is required.";

    if (!formValues.sku.trim()) {
      errors.sku = "SKU is required.";
    } else if (items.some(item => item.sku === formValues.sku && (!selectedItem || item.id !== selectedItem.id))) {
      errors.sku = "SKU must be unique.";
    }

    if (formValues.quantity === "" || isNaN(formValues.quantity) || Number(formValues.quantity) < 0) {
      errors.quantity = "Quantity must be a positive number.";
    }

    if (formValues.minStock === "" || isNaN(formValues.minStock) || Number(formValues.minStock) < 0) {
      errors.minStock = "Minimum stock level is required.";
    }

    if (formValues.maxStock === "" || isNaN(formValues.maxStock) || Number(formValues.maxStock) < 0) {
      errors.maxStock = "Maximum stock level is required.";
    } else if (Number(formValues.maxStock) < Number(formValues.minStock)) {
      errors.maxStock = "Max stock must be greater than or equal to min stock.";
    }

    if (formValues.reorderLevel === "" || isNaN(formValues.reorderLevel) || Number(formValues.reorderLevel) < 0) {
      errors.reorderLevel = "Reorder level is required.";
    }

    if (!formValues.location) errors.location = "Warehouse location is required.";

    if (formValues.purchasePrice === "" || isNaN(formValues.purchasePrice) || Number(formValues.purchasePrice) < 0) {
      errors.purchasePrice = "Purchase price is required.";
    }

    if (formValues.sellingPrice === "" || isNaN(formValues.sellingPrice) || Number(formValues.sellingPrice) < 0) {
      errors.sellingPrice = "Selling price is required.";
    } else if (Number(formValues.sellingPrice) < Number(formValues.purchasePrice)) {
      errors.sellingPrice = "Selling price cannot be less than purchase price.";
    }

    if (!formValues.mfgDate) {
      errors.mfgDate = "Manufacturing date is required.";
    }

    if (formValues.expiryDate && formValues.mfgDate && new Date(formValues.expiryDate) <= new Date(formValues.mfgDate)) {
      errors.expiryDate = "Expiry date must be after manufacturing date.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Inventory Item
  const handleSave = (addAnother = false) => {
    if (!validateForm()) {
      showToast("Please fix the validation errors before saving.", "error");
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const itemStatus = calculateStatus(formValues.quantity, formValues.reorderLevel, formValues.minStock);

    if (selectedItem) {
      // Edit mode
      setItems(prev => prev.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            ...formValues,
            quantity: Number(formValues.quantity),
            minStock: Number(formValues.minStock),
            maxStock: Number(formValues.maxStock),
            reorderLevel: Number(formValues.reorderLevel),
            purchasePrice: Number(formValues.purchasePrice),
            sellingPrice: Number(formValues.sellingPrice),
            status: itemStatus,
            lastUpdated: todayStr
          };
        }
        return item;
      }));
      showToast(`Item "${formValues.item}" updated successfully!`, "success");
      setActiveModal(null);
      setSelectedItem(null);
    } else {
      // Add mode
      const newItemId = `INV-0${items.length + 1}`;
      const newItem = {
        ...formValues,
        id: newItemId,
        quantity: Number(formValues.quantity),
        minStock: Number(formValues.minStock),
        maxStock: Number(formValues.maxStock),
        reorderLevel: Number(formValues.reorderLevel),
        purchasePrice: Number(formValues.purchasePrice),
        sellingPrice: Number(formValues.sellingPrice),
        status: itemStatus,
        lastUpdated: todayStr
      };

      setItems(prev => [newItem, ...prev]);
      showToast(`Item "${formValues.item}" added to inventory!`, "success");

      if (addAnother) {
        setFormValues(getEmptyFormValues());
        setImagePreview(null);
      } else {
        setActiveModal(null);
      }
    }
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormValues({ ...item });
    setImagePreview(item.image);
    setFormErrors({});
    setActiveModal("edit");
  };

  // Open Add Modal
  const openAddModal = () => {
    setSelectedItem(null);
    setFormValues(getEmptyFormValues());
    setImagePreview(null);
    setFormErrors({});
    setActiveModal("add");
  };

  // Open View Modal
  const openViewModal = (item) => {
    setSelectedItem(item);
    setActiveModal("view");
  };

  // Open Update Stock Modal
  const openUpdateStockModal = (item) => {
    setSelectedItem(item);
    setStockAdjustment({
      action: "add",
      qty: "",
      reason: "Received Shipment"
    });
    setStockAdjustmentErrors({});
    setActiveModal("updateStock");
  };

  // Handle Stock Update Submit
  const handleUpdateStock = () => {
    const errors = {};
    if (stockAdjustment.qty === "" || isNaN(stockAdjustment.qty) || Number(stockAdjustment.qty) <= 0) {
      errors.qty = "Quantity must be a positive number.";
    } else if (stockAdjustment.action === "reduce" && Number(stockAdjustment.qty) > selectedItem.quantity) {
      errors.qty = `Cannot reduce stock below 0. Maximum available: ${selectedItem.quantity}.`;
    }

    if (Object.keys(errors).length > 0) {
      setStockAdjustmentErrors(errors);
      return;
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const adjustmentVal = Number(stockAdjustment.qty) * (stockAdjustment.action === "add" ? 1 : -1);
    const newQty = selectedItem.quantity + adjustmentVal;
    const newStatus = calculateStatus(newQty, selectedItem.reorderLevel, selectedItem.minStock);

    setItems(prev => prev.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          quantity: newQty,
          status: newStatus,
          lastUpdated: todayStr
        };
      }
      return item;
    }));

    showToast(`Stock updated for ${selectedItem.item}. New quantity: ${newQty}`, "success");
    setActiveModal(null);
  };

  // Open Transfer Stock Modal
  const openTransferStockModal = (item) => {
    setSelectedItem(item);
    setTransferState({
      targetWarehouse: "",
      qty: "",
      storageSection: "",
      rackNumber: "",
      shelfNumber: "",
      binNumber: ""
    });
    setTransferErrors({});
    setActiveModal("transferStock");
  };

  // Handle Transfer Submit
  const handleTransferStock = () => {
    const errors = {};
    if (!transferState.targetWarehouse) {
      errors.targetWarehouse = "Target warehouse is required.";
    } else if (transferState.targetWarehouse === selectedItem.location) {
      errors.targetWarehouse = "Target warehouse must be different from the current warehouse.";
    }

    if (transferState.qty === "" || isNaN(transferState.qty) || Number(transferState.qty) <= 0) {
      errors.qty = "Quantity must be a positive number.";
    } else if (Number(transferState.qty) > selectedItem.quantity) {
      errors.qty = `Cannot transfer more than current quantity. Max available: ${selectedItem.quantity}.`;
    }

    if (Object.keys(errors).length > 0) {
      setTransferErrors(errors);
      return;
    }

    const transferQty = Number(transferState.qty);
    const todayStr = new Date().toISOString().split("T")[0];

    if (transferQty === selectedItem.quantity) {
      // Transfer whole quantity - just update warehouse and layout location
      setItems(prev => prev.map(item => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            location: transferState.targetWarehouse,
            storageSection: transferState.storageSection || item.storageSection,
            rackNumber: transferState.rackNumber || item.rackNumber,
            shelfNumber: transferState.shelfNumber || item.shelfNumber,
            binNumber: transferState.binNumber || item.binNumber,
            lastUpdated: todayStr
          };
        }
        return item;
      }));
    } else {
      // Transfer split quantity
      // 1. Reduce current item qty
      const updatedQty = selectedItem.quantity - transferQty;
      const updatedStatus = calculateStatus(updatedQty, selectedItem.reorderLevel, selectedItem.minStock);
      
      setItems(prev => {
        const list = prev.map(item => {
          if (item.id === selectedItem.id) {
            return {
              ...item,
              quantity: updatedQty,
              status: updatedStatus,
              lastUpdated: todayStr
            };
          }
          return item;
        });

        // 2. Create new item entry or add to existing target warehouse entry
        const existingInTargetIdx = list.findIndex(item => 
          item.itemCode === selectedItem.itemCode && 
          item.location === transferState.targetWarehouse
        );

        if (existingInTargetIdx > -1) {
          list[existingInTargetIdx].quantity += transferQty;
          list[existingInTargetIdx].status = calculateStatus(
            list[existingInTargetIdx].quantity,
            list[existingInTargetIdx].reorderLevel,
            list[existingInTargetIdx].minStock
          );
          list[existingInTargetIdx].lastUpdated = todayStr;
        } else {
          const newItemId = `INV-0${list.length + 1}`;
          const transferredItem = {
            ...selectedItem,
            id: newItemId,
            quantity: transferQty,
            location: transferState.targetWarehouse,
            storageSection: transferState.storageSection || "",
            rackNumber: transferState.rackNumber || "",
            shelfNumber: transferState.shelfNumber || "",
            binNumber: transferState.binNumber || "",
            status: calculateStatus(transferQty, selectedItem.reorderLevel, selectedItem.minStock),
            lastUpdated: todayStr
          };
          list.unshift(transferredItem);
        }

        return list;
      });
    }

    showToast(`Transferred ${transferQty} ${selectedItem.unit} of ${selectedItem.item} to ${transferState.targetWarehouse}.`, "success");
    setActiveModal(null);
  };

  // Open Delete Modal
  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setActiveModal("delete");
  };

  // Handle Delete Item
  const handleDelete = () => {
    setItems(prev => prev.filter(item => item.id !== selectedItem.id));
    showToast(`Item "${selectedItem.item}" removed from inventory.`, "success");
    setActiveModal(null);
    setSelectedItem(null);
  };

  // DataTable columns mapped to inventory structure
  const columns = [
    { key: "id", label: "ID", sortable: true, width: "10%" },
    { 
      key: "item", 
      label: "Item", 
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg border border-neutral-border flex items-center justify-center bg-slate-50 overflow-hidden">
            {row.image ? (
              <img src={row.image} alt={val} className="w-full h-full object-cover" />
            ) : (
              <Package className="w-4 h-4 text-neutral-textMuted" />
            )}
          </div>
          <div>
            <p className="font-bold text-neutral-textMain text-xs font-headings">{val}</p>
            <p className="text-[10px] text-neutral-textMuted uppercase font-semibold">{row.itemCode} • {row.sku}</p>
          </div>
        </div>
      )
    },
    { 
      key: "quantity", 
      label: "Quantity", 
      sortable: true,
      render: (val, row) => (
        <span className="font-semibold text-xs font-headings">
          {val} <span className="text-[10px] text-neutral-textMuted font-normal">{row.unit}</span>
        </span>
      )
    },
    { key: "location", label: "Warehouse", sortable: true },
    { key: "lastUpdated", label: "Last Updated", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (val) => {
        const variant = val === "In Stock" ? "success" : val === "Low Stock" ? "warning" : "danger";
        return <StatusBadge status={val} variant={variant} />;
      },
    },
    { key: "category", label: "Category", sortable: true },
  ];

  // custom actions mapped for DataTable row menu
  const rowActionsList = (row, idx, closeMenu) => [
    {
      label: "View Details",
      onClick: () => { openViewModal(row); closeMenu(); }
    },
    {
      label: "Edit Item",
      onClick: () => { openEditModal(row); closeMenu(); }
    },
    {
      label: "Update Stock",
      onClick: () => { openUpdateStockModal(row); closeMenu(); }
    },
    {
      label: "Transfer Stock",
      onClick: () => { openTransferStockModal(row); closeMenu(); }
    },
    {
      label: "Delete Item",
      className: "text-danger hover:bg-danger-light",
      onClick: () => { openDeleteModal(row); closeMenu(); }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Inventory"
        subtitle="Track stock levels and manage warehouse inventory"
        actions={
          <button 
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg transition-colors shadow-soft-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        }
      />

      {/* Dynamic KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Items" value={kpis.total.toString()} icon={Package} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="In Stock" value={kpis.inStock.toString()} icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Low Stock" value={kpis.lowStock.toString()} icon={AlertTriangle} color="bg-amber-50 text-amber-600" delay={0.1} />
        <KPICard title="Critical" value={kpis.critical.toString()} icon={XCircle} color="bg-red-50 text-red-600" delay={0.15} />
      </div>

      {/* Filters Bar Component */}
      <div className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-3 w-full flex-1">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
            <input
              type="text"
              placeholder="Search by Name, SKU, Code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans"
            />
            {search && (
              <button 
                onClick={() => setSearch("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-textMuted hover:text-neutral-textMain"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 flex-1 max-w-lg w-full">
            {/* Category Dropdown */}
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full h-9 px-2 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all font-sans text-neutral-textMain"
              >
                <option value="All">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Warehouse Dropdown */}
            <div>
              <select
                value={filterWarehouse}
                onChange={(e) => setFilterWarehouse(e.target.value)}
                className="w-full h-9 px-2 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all font-sans text-neutral-textMain"
              >
                <option value="All">All Warehouses</option>
                {warehouses.map(wh => <option key={wh} value={wh}>{wh}</option>)}
              </select>
            </div>

            {/* Status Dropdown */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-9 px-2 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all font-sans text-neutral-textMain"
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(search || filterCategory !== "All" || filterWarehouse !== "All" || filterStatus !== "All") && (
          <button 
            onClick={() => {
              setSearch("");
              setFilterCategory("All");
              setFilterWarehouse("All");
              setFilterStatus("All");
            }}
            className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1 shrink-0 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* Main Inventory Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        searchable={false} // turned off because we use our customized advanced search filters bar above!
        pageSize={10}
        rowActions={(row, idx, closeMenu) => (
          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-neutral-border rounded-lg shadow-soft-lg py-1 z-20 font-sans">
            <button 
              onClick={() => { openViewModal(row); closeMenu(); }}
              className="w-full text-left px-3 py-2 text-xs text-neutral-textMain hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-textMuted" /> View Details
            </button>
            <button 
              onClick={() => { openEditModal(row); closeMenu(); }}
              className="w-full text-left px-3 py-2 text-xs text-neutral-textMain hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <Edit className="w-3.5 h-3.5 text-neutral-textMuted" /> Edit Item
            </button>
            <button 
              onClick={() => { openUpdateStockModal(row); closeMenu(); }}
              className="w-full text-left px-3 py-2 text-xs text-neutral-textMain hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-neutral-textMuted" /> Update Stock
            </button>
            <button 
              onClick={() => { openTransferStockModal(row); closeMenu(); }}
              className="w-full text-left px-3 py-2 text-xs text-neutral-textMain hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-textMuted" /> Transfer Stock
            </button>
            <button 
              onClick={() => { openDeleteModal(row); closeMenu(); }}
              className="w-full text-left px-3 py-2 text-xs text-danger hover:bg-red-50 flex items-center gap-2 transition-colors border-t border-neutral-border/40 mt-1"
            >
              <Trash className="w-3.5 h-3.5 text-danger" /> Delete Item
            </button>
          </div>
        )}
      />

      {/* ==================================================== */}
      {/* 1. ADD / EDIT ITEM MODAL                             */}
      {/* ==================================================== */}
      <Modal
        open={activeModal === "add" || activeModal === "edit"}
        onClose={() => setActiveModal(null)}
        title={activeModal === "edit" ? "Edit Inventory Item" : "Add Inventory Item"}
        subtitle={activeModal === "edit" ? `Updating ${selectedItem?.itemCode}` : "Register a new item inside stock warehouses"}
        size="lg"
        className="max-h-[85vh] flex flex-col font-sans"
      >
        <div className="flex-1 overflow-y-auto px-1 pr-2 space-y-6 max-h-[55vh]">
          {/* A. Basic Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" /> Basic Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Item Name *</label>
                <input
                  type="text"
                  name="item"
                  value={formValues.item}
                  onChange={handleInputChange}
                  placeholder="e.g. Chemical Container H"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.item ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.item && <p className="text-danger text-[10px] mt-1">{formErrors.item}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Item Code *</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="itemCode"
                    value={formValues.itemCode}
                    onChange={handleInputChange}
                    placeholder="e.g. ITM-8894"
                    className={cn(
                      "flex-1 h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                      formErrors.itemCode ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                    )}
                  />
                  <button
                    type="button"
                    onClick={generateItemCode}
                    className="px-3 h-9 text-xs font-bold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-all border border-transparent flex items-center gap-1 shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Auto
                  </button>
                </div>
                {formErrors.itemCode && <p className="text-danger text-[10px] mt-1">{formErrors.itemCode}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Category *</label>
                <select
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full h-9 px-2 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.category ? "border-danger" : "border-neutral-border focus:border-primary"
                  )}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                {formErrors.category && <p className="text-danger text-[10px] mt-1">{formErrors.category}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  value={formValues.sku}
                  onChange={handleInputChange}
                  placeholder="e.g. CH-CON-H-008"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.sku ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.sku && <p className="text-danger text-[10px] mt-1">{formErrors.sku}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Barcode (UPC/EAN)</label>
                <input
                  type="text"
                  name="barcode"
                  value={formValues.barcode}
                  onChange={handleInputChange}
                  placeholder="e.g. 8901234567"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* B. Stock & Packaging */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1.5 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-warning" /> Stock Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formValues.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.quantity ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.quantity && <p className="text-danger text-[10px] mt-1">{formErrors.quantity}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Unit of Measure *</label>
                <select
                  name="unit"
                  value={formValues.unit}
                  onChange={handleInputChange}
                  className="w-full h-9 px-2 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary transition-all"
                >
                  {units.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Min Stock Level *</label>
                <input
                  type="number"
                  name="minStock"
                  value={formValues.minStock}
                  onChange={handleInputChange}
                  placeholder="20"
                  min="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.minStock ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.minStock && <p className="text-danger text-[10px] mt-1">{formErrors.minStock}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Max Stock Level *</label>
                <input
                  type="number"
                  name="maxStock"
                  value={formValues.maxStock}
                  onChange={handleInputChange}
                  placeholder="500"
                  min="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.maxStock ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.maxStock && <p className="text-danger text-[10px] mt-1">{formErrors.maxStock}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Reorder Level *</label>
                <input
                  type="number"
                  name="reorderLevel"
                  value={formValues.reorderLevel}
                  onChange={handleInputChange}
                  placeholder="50"
                  min="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.reorderLevel ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.reorderLevel && <p className="text-danger text-[10px] mt-1">{formErrors.reorderLevel}</p>}
              </div>
            </div>
          </div>

          {/* C. Warehouse Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-info" /> Warehouse Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Warehouse *</label>
                <select
                  name="location"
                  value={formValues.location}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full h-9 px-2 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.location ? "border-danger" : "border-neutral-border focus:border-primary"
                  )}
                >
                  <option value="">Select Warehouse Location</option>
                  {warehouses.map(wh => <option key={wh} value={wh}>{wh}</option>)}
                </select>
                {formErrors.location && <p className="text-danger text-[10px] mt-1">{formErrors.location}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Storage Section</label>
                <input
                  type="text"
                  name="storageSection"
                  value={formValues.storageSection}
                  onChange={handleInputChange}
                  placeholder="e.g. Zone B"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Rack Number</label>
                <input
                  type="text"
                  name="rackNumber"
                  value={formValues.rackNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. R-03"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Shelf Number</label>
                <input
                  type="text"
                  name="shelfNumber"
                  value={formValues.shelfNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. S-02"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Bin Number</label>
                <input
                  type="text"
                  name="binNumber"
                  value={formValues.binNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. B-09"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
          </div>

          {/* D. Supplier Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1.5 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-purple-600" /> Supplier Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Supplier Name</label>
                <input
                  type="text"
                  name="supplierName"
                  value={formValues.supplierName}
                  onChange={handleInputChange}
                  placeholder="e.g. Supreme Industries"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Supplier Contact</label>
                <input
                  type="text"
                  name="supplierContact"
                  value={formValues.supplierContact}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 99000 12345"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Purchase Price (₹) *</label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={formValues.purchasePrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.purchasePrice ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.purchasePrice && <p className="text-danger text-[10px] mt-1">{formErrors.purchasePrice}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Selling Price (₹) *</label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={formValues.sellingPrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.sellingPrice ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {formErrors.sellingPrice && <p className="text-danger text-[10px] mt-1">{formErrors.sellingPrice}</p>}
              </div>
            </div>
          </div>

          {/* E. Additional & Upload */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1.5 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" /> Additional Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Manufacturing Date *</label>
                <input
                  type="date"
                  name="mfgDate"
                  value={formValues.mfgDate}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.mfgDate ? "border-danger" : "border-neutral-border focus:border-primary"
                  )}
                />
                {formErrors.mfgDate && <p className="text-danger text-[10px] mt-1">{formErrors.mfgDate}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Expiry Date (Optional)</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formValues.expiryDate}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    formErrors.expiryDate ? "border-danger" : "border-neutral-border focus:border-primary"
                  )}
                />
                {formErrors.expiryDate && <p className="text-danger text-[10px] mt-1">{formErrors.expiryDate}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Description</label>
                <textarea
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  placeholder="Detailed notes regarding packaging, handling, material specifications..."
                  rows={3}
                  className="w-full px-3 py-2 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-sans"
                />
              </div>

              {/* Image upload preview */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-xs font-semibold text-neutral-textMain">Upload Item Image</label>
                <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border border-dashed border-neutral-border rounded-xl bg-slate-50/50">
                  <div className="w-20 h-20 rounded-lg border border-neutral-border bg-white flex items-center justify-center overflow-hidden shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-7 h-7 text-neutral-textMuted" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <p className="text-xs font-bold text-neutral-textMain">Select PNG, JPG, or JPEG file</p>
                    <p className="text-[10px] text-neutral-textMuted">Image preview will automatically display after upload</p>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={handleImageChange}
                      id="item-image-file"
                      className="hidden"
                    />
                    <label
                      htmlFor="item-image-file"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-neutral-border hover:bg-neutral-light rounded-lg cursor-pointer transition-colors shadow-soft-sm"
                    >
                      <Upload className="w-3.5 h-3.5" /> Choose Image
                    </label>
                    {formErrors.image && <p className="text-danger text-[10px] mt-1">{formErrors.image}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Buttons Footer */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pt-5 mt-5 border-t border-neutral-border/60">
          <div>
            <button
              type="button"
              onClick={() => {
                setFormValues(selectedItem ? { ...selectedItem } : getEmptyFormValues());
                setImagePreview(selectedItem ? selectedItem.image : null);
                setFormErrors({});
              }}
              className="px-4 py-2 border border-neutral-border text-neutral-textMain text-xs font-semibold rounded-lg hover:bg-neutral-light transition-all flex items-center gap-1.5 active:scale-95 w-full sm:w-auto justify-center"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="px-4 py-2 border border-neutral-border text-neutral-textMain text-xs font-semibold rounded-lg hover:bg-neutral-light transition-all active:scale-95 text-center"
            >
              Cancel
            </button>
            
            {/* Show 'Save & Add Another' only when creating a new item */}
            {!selectedItem && (
              <button
                type="button"
                onClick={() => handleSave(true)}
                className="px-4 py-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-all active:scale-95 text-center"
              >
                Save & Add Another
              </button>
            )}

            <button
              type="button"
              onClick={() => handleSave(false)}
              className="px-5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 justify-center"
            >
              <Save className="w-3.5 h-3.5" /> {selectedItem ? "Save Changes" : "Save Item"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ==================================================== */}
      {/* 2. VIEW DETAILS MODAL                                */}
      {/* ==================================================== */}
      <Modal
        open={activeModal === "view"}
        onClose={() => setActiveModal(null)}
        title="Inventory Item Details"
        subtitle={selectedItem?.itemCode}
        size="lg"
        className="font-sans"
      >
        {selectedItem && (
          <div className="space-y-6">
            {/* Row 1: Header summary */}
            <div className="flex gap-4 items-start p-4 border border-neutral-border rounded-xl bg-slate-50/50">
              <div className="w-16 h-16 rounded-xl border border-neutral-border bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                {selectedItem.image ? (
                  <img src={selectedItem.image} alt={selectedItem.item} className="w-full h-full object-cover" />
                ) : (
                  <Package className="w-7 h-7 text-neutral-textMuted" strokeWidth={1.5} />
                )}
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-base font-extrabold text-neutral-textMain font-headings truncate leading-snug">{selectedItem.item}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-neutral-textMuted font-headings uppercase">{selectedItem.itemCode}</span>
                  <span className="text-neutral-border font-light text-xs">•</span>
                  <span className="text-xs font-bold text-neutral-textMuted font-headings uppercase">{selectedItem.sku}</span>
                  <span className="text-neutral-border font-light text-xs">•</span>
                  <StatusBadge 
                    status={selectedItem.status} 
                    variant={selectedItem.status === "In Stock" ? "success" : selectedItem.status === "Low Stock" ? "warning" : "danger"} 
                  />
                </div>
              </div>
            </div>

            {/* Grid detailed sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[45vh] overflow-y-auto pr-1">
              {/* Box A: Stock & Storage */}
              <div className="bg-white border border-neutral-border rounded-xl p-4 space-y-3.5 shadow-soft-sm">
                <h4 className="text-xs font-extrabold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-primary" /> Stock & Storage
                </h4>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Current Stock</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.quantity} {selectedItem.unit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">UOM</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.unit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Min Stock Level</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.minStock} {selectedItem.unit}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Max Stock Level</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.maxStock} {selectedItem.unit}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Reorder Level</p>
                    <p className="font-bold text-amber-600 mt-0.5">{selectedItem.reorderLevel} {selectedItem.unit}</p>
                  </div>
                </div>
              </div>

              {/* Box B: Location details */}
              <div className="bg-white border border-neutral-border rounded-xl p-4 space-y-3.5 shadow-soft-sm">
                <h4 className="text-xs font-extrabold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-info" /> Location Details
                </h4>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <div className="col-span-2">
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Warehouse</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Section</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.storageSection || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Rack Number</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.rackNumber || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Shelf Number</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.shelfNumber || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Bin Number</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.binNumber || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Box C: Financial & Supplier */}
              <div className="bg-white border border-neutral-border rounded-xl p-4 space-y-3.5 shadow-soft-sm">
                <h4 className="text-xs font-extrabold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-purple-600" /> Financial & Supplier
                </h4>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <div className="col-span-2">
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Supplier</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.supplierName || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Supplier Contact</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.supplierContact || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Purchase Price</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">₹{selectedItem.purchasePrice}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Selling Price</p>
                    <p className="font-bold text-emerald-600 mt-0.5">₹{selectedItem.sellingPrice}</p>
                  </div>
                </div>
              </div>

              {/* Box D: Dates & Additional */}
              <div className="bg-white border border-neutral-border rounded-xl p-4 space-y-3.5 shadow-soft-sm">
                <h4 className="text-xs font-extrabold text-neutral-textMain uppercase tracking-wider border-b border-neutral-border/50 pb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Additional Details
                </h4>
                <div className="grid grid-cols-2 gap-y-3 text-xs">
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Manufacturing Date</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.mfgDate || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Expiry Date</p>
                    <p className="font-bold text-neutral-textMain mt-0.5">{selectedItem.expiryDate || "—"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Barcode (UPC/EAN)</p>
                    <p className="font-bold text-neutral-textMain mt-0.5 font-sans tracking-wide">{selectedItem.barcode || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Text Description Box */}
              <div className="md:col-span-2 bg-white border border-neutral-border rounded-xl p-4 space-y-2 shadow-soft-sm">
                <p className="text-[10px] text-neutral-textMuted font-semibold uppercase">Product Description</p>
                <p className="text-xs text-neutral-textMain leading-relaxed font-sans">{selectedItem.description || "No description provided for this item."}</p>
              </div>
            </div>

            {/* Modal Close Button */}
            <div className="flex justify-end pt-4 border-t border-neutral-border/60">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-neutral-light border border-neutral-border hover:bg-neutral-border/30 text-neutral-textMain text-xs font-semibold rounded-lg transition-colors active:scale-95"
              >
                Close View
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ==================================================== */}
      {/* 3. UPDATE STOCK MODAL                                */}
      {/* ==================================================== */}
      <Modal
        open={activeModal === "updateStock"}
        onClose={() => setActiveModal(null)}
        title="Update Stock Levels"
        subtitle={selectedItem?.item}
        size="sm"
        className="font-sans"
      >
        {selectedItem && (
          <div className="space-y-5">
            <div className="p-3.5 bg-slate-50 border border-neutral-border rounded-lg flex items-center justify-between text-xs">
              <div>
                <p className="text-neutral-textMuted uppercase text-[9px] font-semibold">Current Quantity</p>
                <p className="font-bold text-neutral-textMain mt-0.5 text-sm font-headings">{selectedItem.quantity} {selectedItem.unit}</p>
              </div>
              <div>
                <p className="text-neutral-textMuted uppercase text-[9px] font-semibold text-right">UOM</p>
                <p className="font-bold text-neutral-textMain mt-0.5 text-right">{selectedItem.unit}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Adjustment Action</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStockAdjustment(prev => ({ ...prev, action: "add" }))}
                    className={cn(
                      "py-2 text-xs font-bold rounded-lg border transition-all active:scale-[0.98]",
                      stockAdjustment.action === "add"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-600"
                        : "bg-white border-neutral-border text-neutral-textMuted hover:bg-neutral-light"
                    )}
                  >
                    Add Stock (+)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStockAdjustment(prev => ({ ...prev, action: "reduce" }))}
                    className={cn(
                      "py-2 text-xs font-bold rounded-lg border transition-all active:scale-[0.98]",
                      stockAdjustment.action === "reduce"
                        ? "bg-red-50 border-red-200 text-danger"
                        : "bg-white border-neutral-border text-neutral-textMuted hover:bg-neutral-light"
                    )}
                  >
                    Reduce Stock (-)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Quantity to Adjust *</label>
                <input
                  type="number"
                  value={stockAdjustment.qty}
                  onChange={(e) => {
                    setStockAdjustment(prev => ({ ...prev, qty: e.target.value }));
                    setStockAdjustmentErrors({});
                  }}
                  min="1"
                  placeholder="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    stockAdjustmentErrors.qty ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {stockAdjustmentErrors.qty && <p className="text-danger text-[10px] mt-1">{stockAdjustmentErrors.qty}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Adjustment Reason</label>
                <select
                  value={stockAdjustment.reason}
                  onChange={(e) => setStockAdjustment(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full h-9 px-2 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary transition-all text-neutral-textMain"
                >
                  {stockAdjustment.action === "add" ? (
                    <>
                      <option value="Received Shipment">Received Shipment</option>
                      <option value="Return from Customer">Customer Return</option>
                      <option value="Stock Audit Inbound">Audit Correction (Add)</option>
                    </>
                  ) : (
                    <>
                      <option value="Sales Order Pick">Sales Dispatch</option>
                      <option value="Damaged Goods">Damaged/Scrapped</option>
                      <option value="Lost Stock">Lost/Missing</option>
                      <option value="Stock Audit Outbound">Audit Correction (Reduce)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-border/60">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border border-neutral-border text-neutral-textMain text-xs font-semibold rounded-lg hover:bg-neutral-light transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStock}
                className="px-5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
              >
                Confirm Update
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ==================================================== */}
      {/* 4. TRANSFER STOCK MODAL                              */}
      {/* ==================================================== */}
      <Modal
        open={activeModal === "transferStock"}
        onClose={() => setActiveModal(null)}
        title="Transfer Warehouse Stock"
        subtitle={selectedItem?.item}
        size="md"
        className="font-sans"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 border border-neutral-border rounded-lg text-xs">
              <div>
                <p className="text-neutral-textMuted uppercase text-[9px] font-semibold">Source Location</p>
                <p className="font-bold text-neutral-textMain mt-0.5 truncate">{selectedItem.location}</p>
              </div>
              <div>
                <p className="text-neutral-textMuted uppercase text-[9px] font-semibold text-right">Available Qty</p>
                <p className="font-bold text-neutral-textMain mt-0.5 text-right font-headings">{selectedItem.quantity} {selectedItem.unit}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Target Warehouse *</label>
                <select
                  value={transferState.targetWarehouse}
                  onChange={(e) => {
                    setTransferState(prev => ({ ...prev, targetWarehouse: e.target.value }));
                    setTransferErrors(prev => ({ ...prev, targetWarehouse: "" }));
                  }}
                  className={cn(
                    "w-full h-9 px-2 text-xs bg-white border rounded-lg outline-none transition-all text-neutral-textMain",
                    transferErrors.targetWarehouse ? "border-danger" : "border-neutral-border focus:border-primary"
                  )}
                >
                  <option value="">Select Target Warehouse</option>
                  {warehouses.map(wh => <option key={wh} value={wh}>{wh}</option>)}
                </select>
                {transferErrors.targetWarehouse && <p className="text-danger text-[10px] mt-1">{transferErrors.targetWarehouse}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Quantity to Transfer *</label>
                <input
                  type="number"
                  value={transferState.qty}
                  onChange={(e) => {
                    setTransferState(prev => ({ ...prev, qty: e.target.value }));
                    setTransferErrors(prev => ({ ...prev, qty: "" }));
                  }}
                  min="1"
                  placeholder="0"
                  className={cn(
                    "w-full h-9 px-3 text-xs bg-white border rounded-lg outline-none transition-all",
                    transferErrors.qty ? "border-danger focus:ring-2 focus:ring-danger/10" : "border-neutral-border focus:border-primary focus:ring-2 focus:ring-primary/10"
                  )}
                />
                {transferErrors.qty && <p className="text-danger text-[10px] mt-1">{transferErrors.qty}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Target Storage Section</label>
                <input
                  type="text"
                  value={transferState.storageSection}
                  onChange={(e) => setTransferState(prev => ({ ...prev, storageSection: e.target.value }))}
                  placeholder="e.g. Zone Fast"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Target Rack Number</label>
                <input
                  type="text"
                  value={transferState.rackNumber}
                  onChange={(e) => setTransferState(prev => ({ ...prev, rackNumber: e.target.value }))}
                  placeholder="e.g. R-19"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-textMain mb-1">Target Shelf Number</label>
                <input
                  type="text"
                  value={transferState.shelfNumber}
                  onChange={(e) => setTransferState(prev => ({ ...prev, shelfNumber: e.target.value }))}
                  placeholder="e.g. S-01"
                  className="w-full h-9 px-3 text-xs bg-white border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-neutral-border/60">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 border border-neutral-border text-neutral-textMain text-xs font-semibold rounded-lg hover:bg-neutral-light transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleTransferStock}
                className="px-5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-lg transition-all active:scale-95"
              >
                Execute Transfer
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ==================================================== */}
      {/* 5. DELETE CONFIRMATION MODAL                         */}
      {/* ==================================================== */}
      <ConfirmationModal
        open={activeModal === "delete"}
        onClose={() => setActiveModal(null)}
        onConfirm={handleDelete}
        title="Remove Item from Inventory"
        message={`Are you sure you want to delete "${selectedItem?.item}" (${selectedItem?.itemCode}) from the warehouse stock records? This action cannot be undone.`}
        confirmText="Delete Record"
        variant="danger"
      />
    </motion.div>
  );
}
