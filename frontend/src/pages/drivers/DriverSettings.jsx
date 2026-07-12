import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tags,
  ShieldCheck,
  GraduationCap,
  Bell,
  Settings2,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Check,
  AlertTriangle,
  Award,
  Zap,
  CalendarClock,
  Mail,
  Monitor,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  driverStatuses,
  licenseCategories,
  departments,
  roles,
  safetyScoreRules,
  trainingRequirements,
} from '../../data/drivers';

const SECTION_TABS = [
  { id: 'categories', label: 'Categories', icon: Tags },
  { id: 'safety', label: 'Safety Rules', icon: ShieldCheck },
  { id: 'training', label: 'Training', icon: GraduationCap },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'general', label: 'General', icon: Settings2 },
];

const CATEGORY_COLORS = {
  Violation: 'bg-red-50 text-red-600 border-red-200',
  Event: 'bg-amber-50 text-amber-600 border-amber-200',
  Incident: 'bg-orange-50 text-orange-600 border-orange-200',
  Reward: 'bg-emerald-50 text-emerald-600 border-emerald-200',
};

const CATEGORY_ICONS = {
  Violation: AlertTriangle,
  Event: Zap,
  Incident: AlertTriangle,
  Reward: Award,
};

export default function DriverSettings() {
  const [activeTab, setActiveTab] = useState('categories');

  const [deptList, setDeptList] = useState([...departments]);
  const [roleList, setRoleList] = useState([...roles]);
  const [statusList, setStatusList] = useState([...driverStatuses]);
  const [licenseCatList, setLicenseCatList] = useState([...licenseCategories]);
  const [safetyRules, setSafetyRules] = useState([...safetyScoreRules]);
  const [trainingReqs, setTrainingReqs] = useState([...trainingRequirements]);

  const [editingDept, setEditingDept] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [editingLicense, setEditingLicense] = useState(null);
  const [editingRule, setEditingRule] = useState(null);
  const [editingTraining, setEditingTraining] = useState(null);

  const [newDept, setNewDept] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newLicense, setNewLicense] = useState('');
  const [newRule, setNewRule] = useState({ rule: '', points: 0, category: 'Violation' });
  const [newTraining, setNewTraining] = useState({ name: '', frequency: 'Annual', mandatory: false });

  const [showAddDept, setShowAddDept] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showAddStatus, setShowAddStatus] = useState(false);
  const [showAddLicense, setShowAddLicense] = useState(false);
  const [showAddRule, setShowAddRule] = useState(false);
  const [showAddTraining, setShowAddTraining] = useState(false);

  const [notifications, setNotifications] = useState({
    licenseExpiry90: true,
    licenseExpiry60: true,
    licenseExpiry30: true,
    medicalExpiry: true,
    trainingDeadline: true,
    safetyScoreAlerts: true,
    incidentNotifications: true,
    emailNotifications: true,
    inAppNotifications: true,
  });

  const [generalSettings, setGeneralSettings] = useState({
    defaultSafetyScore: 80,
    maxDrivingHours: 11,
    minRestPeriod: 10,
    licenseRenewalNotice: 60,
    autoSuspendCount: 3,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateGeneral = (key, value) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }));
  };

  const getDriverCountForLicense = (cat) => {
    return 0;
  };

  const handleSave = () => {};

  const renderToggle = (enabled, onToggle) => (
    <button
      onClick={onToggle}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1',
        enabled ? 'bg-primary' : 'bg-slate-200'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
          enabled ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  );

  const renderCategoriesTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Departments</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage driver department categories</p>
          </div>
          <button
            onClick={() => setShowAddDept(!showAddDept)}
            className="btn btn-primary gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
        <AnimatePresence>
          {showAddDept && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  placeholder="New department name..."
                  className="flex-1 bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none transition-all font-semibold"
                />
                <button
                  onClick={() => {
                    if (newDept.trim()) {
                      setDeptList([...deptList, newDept.trim()]);
                      setNewDept('');
                      setShowAddDept(false);
                    }
                  }}
                  className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setShowAddDept(false); setNewDept(''); }}
                  className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Department Name</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deptList.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                  </td>
                  <td className="py-3 pr-4">
                    {editingDept === idx ? (
                      <input
                        type="text"
                        defaultValue={dept}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const updated = [...deptList];
                            updated[idx] = e.target.value;
                            setDeptList(updated);
                            setEditingDept(null);
                          }
                          if (e.key === 'Escape') setEditingDept(null);
                        }}
                        autoFocus
                        className="bg-white border border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none transition-all font-semibold w-64"
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-700">{dept}</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingDept(editingDept === idx ? null : idx)}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setDeptList(deptList.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Roles</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage driver role designations</p>
          </div>
          <button
            onClick={() => setShowAddRole(!showAddRole)}
            className="btn btn-primary gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
        <AnimatePresence>
          {showAddRole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="New role name..."
                  className="flex-1 bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none transition-all font-semibold"
                />
                <button
                  onClick={() => {
                    if (newRole.trim()) {
                      setRoleList([...roleList, newRole.trim()]);
                      setNewRole('');
                      setShowAddRole(false);
                    }
                  }}
                  className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setShowAddRole(false); setNewRole(''); }}
                  className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Role Name</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roleList.map((role, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                  </td>
                  <td className="py-3 pr-4">
                    {editingRole === idx ? (
                      <input
                        type="text"
                        defaultValue={role}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const updated = [...roleList];
                            updated[idx] = e.target.value;
                            setRoleList(updated);
                            setEditingRole(null);
                          }
                          if (e.key === 'Escape') setEditingRole(null);
                        }}
                        autoFocus
                        className="bg-white border border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none transition-all font-semibold w-64"
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-700">{role}</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingRole(editingRole === idx ? null : idx)}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setRoleList(roleList.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Operational Statuses</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage driver operational status values</p>
          </div>
          <button
            onClick={() => setShowAddStatus(!showAddStatus)}
            className="btn btn-primary gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
        <AnimatePresence>
          {showAddStatus && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  placeholder="New status name..."
                  className="flex-1 bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none transition-all font-semibold"
                />
                <button
                  onClick={() => {
                    if (newStatus.trim()) {
                      setStatusList([...statusList, newStatus.trim()]);
                      setNewStatus('');
                      setShowAddStatus(false);
                    }
                  }}
                  className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setShowAddStatus(false); setNewStatus(''); }}
                  className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Status Name</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statusList.map((status, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                  </td>
                  <td className="py-3 pr-4">
                    {editingStatus === idx ? (
                      <input
                        type="text"
                        defaultValue={status}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const updated = [...statusList];
                            updated[idx] = e.target.value;
                            setStatusList(updated);
                            setEditingStatus(null);
                          }
                          if (e.key === 'Escape') setEditingStatus(null);
                        }}
                        autoFocus
                        className="bg-white border border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none transition-all font-semibold w-64"
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-700">{status}</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingStatus(editingStatus === idx ? null : idx)}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setStatusList(statusList.filter((_, i) => i !== idx))}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-primary gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderSafetyTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Safety Score Rules</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Define rules that affect driver safety scores</p>
          </div>
          <button
            onClick={() => setShowAddRule(!showAddRule)}
            className="btn btn-primary gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Rule
          </button>
        </div>
        <AnimatePresence>
          {showAddRule && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newRule.rule}
                    onChange={(e) => setNewRule({ ...newRule, rule: e.target.value })}
                    placeholder="Rule name..."
                    className="bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none transition-all font-semibold"
                  />
                  <div className="relative">
                    <select
                      value={newRule.category}
                      onChange={(e) => setNewRule({ ...newRule, category: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
                    >
                      <option value="Violation">Violation</option>
                      <option value="Event">Event</option>
                      <option value="Incident">Incident</option>
                      <option value="Reward">Reward</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={newRule.points}
                      onChange={(e) => setNewRule({ ...newRule, points: Number(e.target.value) })}
                      className="flex-1 bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none transition-all font-semibold"
                    />
                    <button
                      onClick={() => {
                        if (newRule.rule.trim()) {
                          setSafetyRules([...safetyRules, { ...newRule, id: Date.now() }]);
                          setNewRule({ rule: '', points: 0, category: 'Violation' });
                          setShowAddRule(false);
                        }
                      }}
                      className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shrink-0"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setShowAddRule(false); setNewRule({ rule: '', points: 0, category: 'Violation' }); }}
                      className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Rule Name</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Points</th>
                <th className="pb-3 pr-4">Impact</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {safetyRules.map((rule, idx) => {
                const Icon = CATEGORY_ICONS[rule.category] || AlertTriangle;
                return (
                  <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 pr-4">
                      <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                    </td>
                    <td className="py-3 pr-4">
                      {editingRule === rule.id ? (
                        <input
                          type="text"
                          defaultValue={rule.rule}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const updated = safetyRules.map((r) =>
                                r.id === rule.id ? { ...r, rule: e.target.value } : r
                              );
                              setSafetyRules(updated);
                              setEditingRule(null);
                            }
                            if (e.key === 'Escape') setEditingRule(null);
                          }}
                          autoFocus
                          className="bg-white border border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none transition-all font-semibold w-64"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-700">{rule.rule}</span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border',
                          CATEGORY_COLORS[rule.category]
                        )}
                      >
                        <Icon className="w-3 h-3" />
                        {rule.category}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={cn(
                          'text-sm font-black font-mono',
                          rule.points > 0 ? 'text-emerald-600' : 'text-red-500'
                        )}
                      >
                        {rule.points > 0 ? '+' : ''}{rule.points}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            rule.points > 0 ? 'bg-emerald-500' : 'bg-red-400'
                          )}
                          style={{ width: `${Math.min(Math.abs(rule.points) * 3.3, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingRule(editingRule === rule.id ? null : rule.id)}
                          className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setSafetyRules(safetyRules.filter((r) => r.id !== rule.id))}
                          className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-primary gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderTrainingTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Training Requirements</h3>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Define mandatory and optional training programs</p>
          </div>
          <button
            onClick={() => setShowAddTraining(!showAddTraining)}
            className="btn btn-primary gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Requirement
          </button>
        </div>
        <AnimatePresence>
          {showAddTraining && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newTraining.name}
                    onChange={(e) => setNewTraining({ ...newTraining, name: e.target.value })}
                    placeholder="Training name..."
                    className="bg-white border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2 text-xs text-slate-800 outline-none transition-all font-semibold"
                  />
                  <div className="relative">
                    <select
                      value={newTraining.frequency}
                      onChange={(e) => setNewTraining({ ...newTraining, frequency: e.target.value })}
                      className="w-full bg-white border border-slate-200 text-xs font-bold text-slate-700 px-3 py-2 rounded-lg outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none pr-8"
                    >
                      <option value="Annual">Annual</option>
                      <option value="Bi-Annual">Bi-Annual</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="One-Time">One-Time</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500">Mandatory</span>
                    {renderToggle(newTraining.mandatory, () =>
                      setNewTraining({ ...newTraining, mandatory: !newTraining.mandatory })
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (newTraining.name.trim()) {
                          setTrainingReqs([...trainingReqs, { ...newTraining, id: Date.now() }]);
                          setNewTraining({ name: '', frequency: 'Annual', mandatory: false });
                          setShowAddTraining(false);
                        }
                      }}
                      className="p-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors shrink-0"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => { setShowAddTraining(false); setNewTraining({ name: '', frequency: 'Annual', mandatory: false }); }}
                      className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[9px] font-black text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pr-4">#</th>
                <th className="pb-3 pr-4">Training Name</th>
                <th className="pb-3 pr-4">Frequency</th>
                <th className="pb-3 pr-4">Mandatory</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trainingReqs.map((req, idx) => (
                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 pr-4">
                    <span className="text-[10px] font-bold text-slate-400">{idx + 1}</span>
                  </td>
                  <td className="py-3 pr-4">
                    {editingTraining === req.id ? (
                      <input
                        type="text"
                        defaultValue={req.name}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const updated = trainingReqs.map((r) =>
                              r.id === req.id ? { ...r, name: e.target.value } : r
                            );
                            setTrainingReqs(updated);
                            setEditingTraining(null);
                          }
                          if (e.key === 'Escape') setEditingTraining(null);
                        }}
                        autoFocus
                        className="bg-white border border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none transition-all font-semibold w-64"
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-700">{req.name}</span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                      <CalendarClock className="w-3 h-3 text-slate-400" />
                      {req.frequency}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {renderToggle(req.mandatory, () =>
                      setTrainingReqs(
                        trainingReqs.map((r) =>
                          r.id === req.id ? { ...r, mandatory: !r.mandatory } : r
                        )
                      )
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setEditingTraining(editingTraining === req.id ? null : req.id)}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setTrainingReqs(trainingReqs.filter((r) => r.id !== req.id))}
                        className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-primary gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Expiry Reminders</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Configure automatic expiry notification alerts</p>
        </div>
        <div className="flex flex-col divide-y divide-slate-100">
          {[
            { key: 'licenseExpiry90', label: 'License expiry — 90 days advance', desc: 'Notify drivers 90 days before license expiry' },
            { key: 'licenseExpiry60', label: 'License expiry — 60 days advance', desc: 'Notify drivers 60 days before license expiry' },
            { key: 'licenseExpiry30', label: 'License expiry — 30 days advance', desc: 'Notify drivers 30 days before license expiry' },
            { key: 'medicalExpiry', label: 'Medical certificate expiry', desc: 'Alert when medical certificate is nearing expiration' },
            { key: 'trainingDeadline', label: 'Training deadline reminders', desc: 'Remind drivers of upcoming training deadlines' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-xs font-bold text-slate-800">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.desc}</p>
              </div>
              {renderToggle(notifications[item.key], () => toggleNotification(item.key))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Alert Preferences</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Control when alerts are triggered</p>
        </div>
        <div className="flex flex-col divide-y divide-slate-100">
          {[
            { key: 'safetyScoreAlerts', label: 'Safety score drops below threshold', desc: 'Alert when a driver\'s safety score drops below the configured minimum' },
            { key: 'incidentNotifications', label: 'Incident notifications', desc: 'Immediate notification when an incident is reported' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-xs font-bold text-slate-800">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.desc}</p>
              </div>
              {renderToggle(notifications[item.key], () => toggleNotification(item.key))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Delivery Channels</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Choose how notifications are delivered</p>
        </div>
        <div className="flex flex-col divide-y divide-slate-100">
          {[
            { key: 'emailNotifications', label: 'Email notifications', desc: 'Send alerts via email to drivers and fleet managers', icon: Mail },
            { key: 'inAppNotifications', label: 'In-app notifications', desc: 'Show alerts within the TransitOps dashboard', icon: Monitor },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <Icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.desc}</p>
                  </div>
                </div>
                {renderToggle(notifications[item.key], () => toggleNotification(item.key))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-primary gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderGeneralTab = () => (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider font-headings">Safety & Compliance</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Core safety thresholds and compliance settings</p>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">Default Safety Score Threshold</label>
              <span className="text-xs font-black font-mono text-primary">{generalSettings.defaultSafetyScore}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={generalSettings.defaultSafetyScore}
              onChange={(e) => updateGeneral('defaultSafetyScore', Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] font-bold text-slate-400">0</span>
              <span className="text-[9px] font-bold text-slate-400">Drivers below this score receive alerts</span>
              <span className="text-[9px] font-bold text-slate-400">100</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Maximum Driving Hours Per Day</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={generalSettings.maxDrivingHours}
                  onChange={(e) => updateGeneral('maxDrivingHours', Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none transition-all font-semibold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">hrs</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Minimum Rest Period</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={generalSettings.minRestPeriod}
                  onChange={(e) => updateGeneral('minRestPeriod', Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none transition-all font-semibold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">hrs</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">License Renewal Advance Notice</label>
              <div className="relative">
                <input
                  type="number"
                  min="7"
                  max="180"
                  value={generalSettings.licenseRenewalNotice}
                  onChange={(e) => updateGeneral('licenseRenewalNotice', Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none transition-all font-semibold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">days</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">Auto-Suspend After Violations</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={generalSettings.autoSuspendCount}
                  onChange={(e) => updateGeneral('autoSuspendCount', Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg px-3 py-2.5 text-xs text-slate-800 outline-none transition-all font-semibold"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">count</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn btn-primary gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'categories':
        return renderCategoriesTab();
      case 'safety':
        return renderSafetyTab();
      case 'training':
        return renderTrainingTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'general':
        return renderGeneralTab();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight font-headings">Driver Settings</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Configure driver management rules and preferences</p>
        </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        {SECTION_TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-sm border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
