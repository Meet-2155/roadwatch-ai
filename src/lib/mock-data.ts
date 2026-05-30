export type ComplaintStatus = "Submitted" | "Assigned" | "In Progress" | "Resolved";
export type IssueType = "Pothole" | "Crack" | "Waterlogging" | "Damaged Road Sign" | "Road Blockage";
export type Severity = "Low" | "Medium" | "High" | "Critical";

export interface Complaint {
  complaintId: string;
  issueType: IssueType;
  severity: Severity;
  roadHealthScore: number;
  location: string;
  authority: string;
  status: ComplaintStatus;
  timestamp: string;
  description?: string;
  confidence?: number;
}

export const mockComplaints: Complaint[] = [
  { complaintId: "RW1024", issueType: "Pothole", severity: "High", roadHealthScore: 42, location: "Whitefield, Bangalore", authority: "BBMP", status: "In Progress", timestamp: "2025-05-28 14:22", confidence: 94 },
  { complaintId: "RW1025", issueType: "Waterlogging", severity: "Critical", roadHealthScore: 28, location: "Indiranagar, Bangalore", authority: "BBMP", status: "Assigned", timestamp: "2025-05-29 09:10", confidence: 91 },
  { complaintId: "RW1026", issueType: "Crack", severity: "Medium", roadHealthScore: 64, location: "NH-44, Hosur Road", authority: "NHAI", status: "Resolved", timestamp: "2025-05-20 11:45", confidence: 88 },
  { complaintId: "RW1027", issueType: "Damaged Road Sign", severity: "Low", roadHealthScore: 78, location: "MG Road, Bangalore", authority: "PWD", status: "Submitted", timestamp: "2025-05-30 08:00", confidence: 82 },
  { complaintId: "RW1028", issueType: "Road Blockage", severity: "High", roadHealthScore: 35, location: "Koramangala 5th Block", authority: "Local Authority", status: "In Progress", timestamp: "2025-05-27 17:30", confidence: 96 },
  { complaintId: "RW1029", issueType: "Pothole", severity: "Medium", roadHealthScore: 58, location: "HSR Layout Sector 2", authority: "BBMP", status: "Resolved", timestamp: "2025-05-15 13:00", confidence: 90 },
];

export const mockBudgets = [
  { roadName: "Outer Ring Road", allocated: 12_50_00_000, spent: 8_75_00_000, contractor: "Skyline Infra Pvt Ltd", lastRepair: "2025-03-14" },
  { roadName: "Hosur Road (NH-44)", allocated: 24_00_00_000, spent: 19_20_00_000, contractor: "NHAI Direct Works", lastRepair: "2025-01-22" },
  { roadName: "MG Road", allocated: 4_50_00_000, spent: 3_10_00_000, contractor: "Karnataka PWD", lastRepair: "2024-11-08" },
  { roadName: "Whitefield Main Road", allocated: 7_80_00_000, spent: 5_40_00_000, contractor: "Urban Roads Ltd", lastRepair: "2025-04-02" },
  { roadName: "Indiranagar 100ft Rd", allocated: 5_20_00_000, spent: 4_90_00_000, contractor: "BBMP Works Dept", lastRepair: "2025-02-18" },
];

export const monthlyTrend = [
  { month: "Jan", complaints: 120, resolved: 86 },
  { month: "Feb", complaints: 145, resolved: 112 },
  { month: "Mar", complaints: 168, resolved: 130 },
  { month: "Apr", complaints: 142, resolved: 119 },
  { month: "May", complaints: 198, resolved: 142 },
];

export const issueBreakdown = [
  { name: "Pothole", value: 42 },
  { name: "Crack", value: 23 },
  { name: "Waterlogging", value: 15 },
  { name: "Road Sign", value: 11 },
  { name: "Blockage", value: 9 },
];

export function routeAuthority(issue: IssueType, location: string): string {
  if (location.toLowerCase().includes("nh-") || issue === "Road Blockage" && location.includes("NH")) return "NHAI";
  if (issue === "Damaged Road Sign") return "PWD";
  if (location.toLowerCase().includes("bangalore") || location.toLowerCase().includes("bengaluru")) return "BBMP";
  return "Local Authority";
}

export function generateComplaintId(): string {
  return "RW" + Math.floor(1030 + Math.random() * 9000);
}
