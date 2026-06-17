import React from "react";
import "./OperationStats.css";

import FinancialImg  from "../assets/FinancialMgnt.png";
import EmployeeImg   from "../assets/EmployeRecord.png";
import SupplierImg   from "../assets/Supplier.png";
import LedgerImg     from "../assets/LedgerReports.png";
import ChequeImg     from "../assets/ChequeRecord.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

// ─── Watermark Icons ──────────────────────────────────────────────────────────

const WatermarkBarChart: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8"  y="10" width="12" height="60" rx="2" />
    <rect x="26" y="30" width="12" height="40" rx="2" />
    <rect x="44" y="20" width="12" height="50" rx="2" />
    <rect x="62" y="40" width="12" height="30" rx="2" />
    <path d="M4 75h74" />
    <path d="M8 30 L26 20 L44 10 L62 25" strokeDasharray="3 2" />
  </svg>
);

const WatermarkGear: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="40" cy="40" r="12" />
    <path d="M40 8v8M40 64v8M8 40h8M64 40h8M17 17l5.6 5.6M57.4 57.4l5.6 5.6M57.4 22.6l5.6-5.6M17 63l5.6-5.6" />
    <circle cx="40" cy="40" r="4" />
  </svg>
);

const WatermarkCalculator: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="8"  width="52" height="64" rx="6" />
    <rect x="22" y="16" width="36" height="16" rx="3" />
    <circle cx="26" cy="46" r="3" /><circle cx="40" cy="46" r="3" /><circle cx="54" cy="46" r="3" />
    <circle cx="26" cy="58" r="3" /><circle cx="40" cy="58" r="3" /><circle cx="54" cy="58" r="3" />
  </svg>
);

const WatermarkMonitor: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="10" width="68" height="44" rx="5" />
    <path d="M26 54v10M54 54v10M18 64h44" />
    <path d="M14 20h52M14 28h30M14 36h20" />
    <rect x="50" y="26" width="14" height="14" rx="2" />
  </svg>
);

const WatermarkCheckboard: React.FC<IconProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 80 80" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="10" y="8"  width="60" height="64" rx="5" />
    <path d="M10 22h60M22 8v14" />
    <circle cx="16" cy="15" r="3" />
    <path d="M20 34l6 6 14-14M20 52l6 6 14-14" />
  </svg>
);

// ─── Button Icons (unique per card) ──────────────────────────────────────────

const IconFinancial = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <circle cx="12" cy="12" r="3" />
    <path d="M2 9h2M20 9h2M2 15h2M20 15h2" />
    <path d="M7 12h1M16 12h1" />
  </svg>
);

const IconEmployee = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
  </svg>
);

const IconSuppliers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
    <circle cx="19" cy="7" r="3" />
    <path d="M17.5 5.5L19 7l2-2" />
  </svg>
);

const IconLedger = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8M8 11h6M8 15h4" />
  </svg>
);

const IconCheque = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="13" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 14h4M14 14h4" />
    <path d="M6 17h2M16 17h2" />
    <path d="M12 3v3" strokeDasharray="2 1" />
  </svg>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  Icon: React.FC;
  bgImage?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, Icon, bgImage }) => (
  <button className="stat-card" type="button">
    {bgImage && (
      <div
        className="stat-card-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
    )}
    <div className="stat-icon-wrap">
      <Icon />
    </div>
    <span className="stat-card-label">{label}</span>
  </button>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const OperationStats: React.FC = () => {
  return (
    <section id="OperationStats" data-nav="light" className="ops-section">
      {/* Diagonal split backgrounds */}
      <div aria-hidden="true" className="ops-bg-purple" />
      <div aria-hidden="true" className="ops-bg-white" />

      {/* Watermarks — left */}
      <WatermarkMonitor    className="wm wm-left-monitor"  />
      <WatermarkBarChart   className="wm wm-left-barchart" />
      <WatermarkCalculator className="wm wm-left-calc"     />
      <WatermarkCheckboard className="wm wm-left-check"    />

      {/* Watermarks — right */}
      <WatermarkMonitor    className="wm wm-right-monitor"  />
      <WatermarkGear       className="wm wm-right-gear"     />
      <WatermarkCalculator className="wm wm-right-calc"     />
      <WatermarkBarChart   className="wm wm-right-barchart" />
      <WatermarkCheckboard className="wm wm-right-check"    />

      {/* Content */}
      <div className="ops-content">
        <h2 className="ops-title">Operations Stats</h2>

        {/* Row 1 — 3 cards */}
        <div className="ops-row ops-row-1">
          <StatCard label={"Financial\nManagement"} Icon={IconFinancial} bgImage={FinancialImg} />
          <StatCard label={"Employee\nRecords"}     Icon={IconEmployee}  bgImage={EmployeeImg}  />
          <StatCard label={"Suppliers &\nCustomers"} Icon={IconSuppliers} bgImage={SupplierImg} />
        </div>

        {/* Row 2 — 2 cards */}
        <div className="ops-row">
          <StatCard label={"Ledger\nReports"} Icon={IconLedger} bgImage={LedgerImg} />
          <StatCard label={"Cheque\nRecords"} Icon={IconCheque} bgImage={ChequeImg} />
        </div>
      </div>
    </section>
  );
};

export default OperationStats;