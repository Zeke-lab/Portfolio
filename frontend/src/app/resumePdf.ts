import { jsPDF } from "jspdf";
import type { PortfolioView } from "./portfolio/api";

const PAGE_WIDTH = 210;
const MARGIN = 16;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const NAVY: [number, number, number] = [20, 38, 64];
const TEAL: [number, number, number] = [24, 150, 145];

function value(text: string | null | undefined) {
  return text?.trim() ?? "";
}

async function imageToDataUrl(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    const size = 420;
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);
    const scale = Math.max(size / bitmap.width, size / bitmap.height);
    const width = bitmap.width * scale;
    const height = bitmap.height * scale;
    context.drawImage(bitmap, (size - width) / 2, (size - height) / 2, width, height);
    bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.9);
  } catch {
    return null;
  }
}

export async function downloadResumePdf(portfolio: PortfolioView) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const profile = portfolio.profile;
  let y = 15;

  const photo = profile?.resumePhotoUrl
    ? await imageToDataUrl(profile.resumePhotoUrl)
    : profile?.avatarUrl
      ? await imageToDataUrl(profile.avatarUrl)
      : null;
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_WIDTH, 48, "F");
  doc.setFillColor(...TEAL);
  doc.rect(0, 45, PAGE_WIDTH, 3, "F");

  if (photo) {
    try {
      doc.addImage(photo, "JPEG", PAGE_WIDTH - MARGIN - 28, 8, 28, 28, undefined, "FAST");
    } catch {
      // The resume remains usable when an external avatar cannot be embedded.
    }
  }

  const addSection = (title: string) => {
    y += 3;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...NAVY);
    doc.text(title.toUpperCase(), MARGIN, y);
    y += 2;
    doc.setDrawColor(...TEAL);
    doc.setLineWidth(0.55);
    doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
    y += 5;
  };

  const addText = (text: string, size = 8.8, lineHeight = 4, indent = 0) => {
    const content = value(text);
    if (!content) return;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(25, 25, 25);
    const lines = doc.splitTextToSize(content, CONTENT_WIDTH - indent) as string[];
    doc.text(lines, MARGIN + indent, y);
    y += lines.length * lineHeight;
  };

  const addBullet = (text: string) => {
    const content = value(text);
    if (!content) return;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.7);
    doc.setTextColor(25, 25, 25);
    const lines = doc.splitTextToSize(content, CONTENT_WIDTH - 5) as string[];
    doc.text("•", MARGIN, y);
    doc.text(lines, MARGIN + 4, y);
    y += lines.length * 3.9;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.setTextColor(255, 255, 255);
  doc.text(value(profile?.fullName) || "Resume", MARGIN, y + 3);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(215, 230, 240);
  doc.text(value(profile?.headline) || "Software Engineer", MARGIN, y + 3);
  y += 5;

  const contact = [profile?.email, profile?.phone, profile?.location]
    .map(value)
    .filter(Boolean)
    .join("  |  ");
  doc.setFontSize(7.8);
  if (contact) {
    doc.text(contact, MARGIN, y + 3);
    y += 4;
  }

  const links = [profile?.githubUrl, profile?.linkedinUrl, profile?.websiteUrl]
    .map(value)
    .filter(Boolean)
    .join("  |  ");
  if (links) {
    doc.setFontSize(7.4);
    doc.text(links, MARGIN, y + 3);
    y += 5;
  }

  y = 57;

  if (value(profile?.about) || value(profile?.intro)) {
    addSection("Professional Summary");
    addText(profile?.about || profile?.intro || "");
  }

  const skillGroups = Object.entries(portfolio.techGrid);
  if (skillGroups.length > 0) {
    addSection("Technical Skills");
    skillGroups.forEach(([category, group]) => {
      const skills = group.items.map((item) => item.name).filter(Boolean).join(", ");
      if (!skills) return;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.7);
      doc.text(`${category}:`, MARGIN + 3, y);
      const labelWidth = doc.getTextWidth(`${category}: `);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(skills, CONTENT_WIDTH - labelWidth - 3) as string[];
      doc.text(lines, MARGIN + 3 + labelWidth, y);
      y += lines.length * 4.2 + 2;
    });
  }

  if (portfolio.experience.length > 0) {
    addSection("Professional Experience");
    portfolio.experience.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.3);
      doc.text(`${item.role} | ${item.company}`, MARGIN, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.6);
      doc.text(`${item.period} | ${item.location}`, PAGE_WIDTH - MARGIN, y, { align: "right" });
      y += 3.8;
      addText(item.desc, 8.7, 3.9);
      item.bullets.forEach(addBullet);
      y += 1.5;
    });
  }

  if (portfolio.projects.length > 0) {
    addSection("Projects");
    portfolio.projects.slice(0, 3).forEach((project) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(project.title, MARGIN, y);
      y += 3.6;
      addText(project.summary || project.description, 8.6, 3.9);
      if (project.tech.length > 0) {
        addText(`Technologies: ${project.tech.join(", ")}`, 8.2, 3.7);
      }
      const projectLinks = [project.liveUrl, project.repoUrl].filter(Boolean).join(" | ");
      if (projectLinks) addText(projectLinks, 7.8, 3.5);
    });
  }

  if (portfolio.education.length > 0) {
    addSection("Education");
    portfolio.education.forEach((item) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.8);
      doc.text(`${item.degree} | ${item.university}`, MARGIN, y);
      doc.setFont("helvetica", "normal");
      doc.text(item.period, PAGE_WIDTH - MARGIN, y, { align: "right" });
      y += 6;
    });
  }

  if (portfolio.certs.length > 0) {
    addSection("Certifications");
    portfolio.certs.forEach((certification) => {
      const details = [certification.issuer, certification.year].filter(Boolean).join(" | ");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.8);
      doc.text(certification.title, MARGIN, y);
      if (details) {
        doc.setFont("helvetica", "normal");
        doc.text(details, PAGE_WIDTH - MARGIN, y, { align: "right" });
      }
      y += 4;
    });
  }

  const fileName = value(profile?.fullName).replace(/\s+/g, "-").toLowerCase() || "resume";
  doc.save(`${fileName}-resume.pdf`);
}
