import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "MonApp - Gestion de ressources",
  description: "Application Full Stack Next.js pour gérer vos ressources en toute simplicité",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            background: #0a0c1a; 
            color: #eef4ff; 
            font-family: 'Segoe UI', system-ui, sans-serif; 
            min-height: 100vh; 
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.8rem;
            padding: 1rem 2.5rem;
            border-radius: 16px;
            font-weight: 700;
            font-size: 1.2rem;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            min-height: 60px;
            min-width: 180px;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          .btn-primary { background: #2563eb; color: #fff; }
          .btn-primary:hover { background: #1d4ed8; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
          .btn-success { background: #16a34a; color: #fff; }
          .btn-success:hover { background: #15803d; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.35); }
          .btn-danger { background: #dc2626; color: #fff; }
          .btn-danger:hover { background: #b91c1c; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(220,38,38,0.35); }
          .btn-warning { background: #f59e0b; color: #fff; }
          .btn-warning:hover { background: #d97706; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,158,11,0.35); }
          .btn-purple { background: #7c3aed; color: #fff; }
          .btn-purple:hover { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.35); }
          .btn-outline { background: transparent; border: 2px solid #2563eb; color: #2563eb; }
          .btn-outline:hover { background: #2563eb; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.25); }
          .card {
            background: #fff;
            border-radius: 24px;
            padding: 3rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 700px;
            width: 100%;
            margin: 0 auto;
          }
          .card-dashboard {
            background: rgba(255,255,255,0.06);
            backdrop-filter: blur(10px);
            border-radius: 24px;
            padding: 3rem;
            border: 1px solid rgba(255,255,255,0.08);
          }
          .page-title {
            font-size: 2.8rem;
            font-weight: 800;
            color: #fff;
            letter-spacing: -0.02em;
          }
          .page-subtitle {
            font-size: 1.2rem;
            color: #94a3b8;
            margin-top: 0.5rem;
          }
          .form-group { margin-bottom: 1.5rem; }
          .form-group label { display: block; font-size: 1rem; font-weight: 600; color: #1e293b; margin-bottom: 0.5rem; }
          .form-group .input-icon { position: relative; }
          .form-group .input-icon i {
            position: absolute;
            left: 1.2rem;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 1.2rem;
          }
          .form-group input, .form-group textarea {
            width: 100%;
            padding: 1rem 1.2rem 1rem 3.5rem;
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            font-size: 1.1rem;
            transition: border-color 0.15s, box-shadow 0.15s;
            background: #fff;
            color: #1e293b;
            font-family: inherit;
            min-height: 60px;
          }
          .form-group textarea {
            padding: 1rem 1.2rem;
            min-height: 180px;
            resize: vertical;
          }
          .form-group input:focus, .form-group textarea:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 4px rgba(37,99,235,0.15);
          }
          .form-group .checkbox-group {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-top: 0.5rem;
          }
          .form-group .checkbox-group input[type="checkbox"] {
            width: 24px;
            height: 24px;
            accent-color: #2563eb;
            cursor: pointer;
          }
          .form-group .checkbox-group label {
            color: #1e293b;
            font-size: 1rem;
            cursor: pointer;
          }
          .resource-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
            margin-top: 1rem;
          }
          .resource-card {
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 20px;
            padding: 1.5rem;
            transition: all 0.3s;
          }
          .resource-card:hover {
            transform: translateY(-4px);
            background: rgba(255,255,255,0.12);
            box-shadow: 0 12px 40px rgba(0,0,0,0.2);
          }
          .card-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .card-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: rgba(37,99,235,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #60a5fa;
            font-size: 1.4rem;
            flex-shrink: 0;
          }
          .card-title {
            font-weight: 700;
            font-size: 1.2rem;
            color: #fff;
            line-height: 1.3;
          }
          .card-date {
            font-size: 0.85rem;
            color: #94a3b8;
            display: flex;
            align-items: center;
            gap: 0.3rem;
            margin-top: 0.2rem;
          }
          .card-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 1rem;
          }
          .card-actions .btn-sm {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-weight: 600;
            transition: all 0.2s;
            min-height: 40px;
            flex: 1;
            justify-content: center;
          }
          .btn-sm-view { background: rgba(59,130,246,0.2); color: #60a5fa; }
          .btn-sm-view:hover { background: rgba(59,130,246,0.3); }
          .btn-sm-edit { background: rgba(245,158,11,0.2); color: #fbbf24; }
          .btn-sm-edit:hover { background: rgba(245,158,11,0.3); }
          .btn-sm-delete { background: rgba(239,68,68,0.2); color: #f87171; }
          .btn-sm-delete:hover { background: rgba(239,68,68,0.3); }
          .badge-status {
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 0.3rem 0.8rem;
            border-radius: 40px;
            background: rgba(255,255,255,0.08);
            color: #94a3b8;
            border: 1px solid rgba(255,255,255,0.08);
          }
          .badge-status.published { background: rgba(22,163,74,0.2); color: #4ade80; border-color: rgba(22,163,74,0.2); }
          .badge-status.draft { background: rgba(245,158,11,0.2); color: #fbbf24; border-color: rgba(245,158,11,0.2); }
          .hero { text-align: center; padding: 3rem 0; }
          .hero h1 { font-size: 4rem; font-weight: 800; color: #fff; margin-bottom: 1.5rem; letter-spacing: -0.02em; line-height: 1.1; }
          .hero p { font-size: 1.4rem; color: #94a3b8; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6; }
          .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
          .form-link { text-align: center; margin-top: 0.75rem; font-size: 0.9rem; color: #64748b; }
          .form-link a { color: #2563eb; text-decoration: none; font-weight: 600; }
          .form-link a:hover { text-decoration: underline; }
          .footer {
            border-top: 1px solid rgba(255,255,255,0.08);
            padding: 1.5rem 2rem;
            text-align: center;
            margin-top: 2rem;
          }
          .footer p { color: #94a3b8; font-size: 0.95rem; }
          .footer span { color: #2563eb; font-weight: 600; }
          .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem 3rem;
            background: #0f172a;
            color: #fff;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            min-height: 80px;
          }
          .navbar-brand {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-weight: 700;
            font-size: 1.8rem;
            color: #fff;
          }
          .logo-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #2563eb, #7c3aed);
            border-radius: 12px;
            color: #fff;
            font-size: 1.4rem;
            box-shadow: 0 4px 12px rgba(37,99,235,0.3);
          }
          .navbar-profile {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.1rem;
            color: #e2e8f0;
          }
          .avatar {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 700;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(59,130,246,0.3);
          }
          @media (max-width: 768px) {
            .navbar { padding: 1rem; flex-wrap: wrap; }
            .navbar-brand { font-size: 1.4rem; }
            .logo-icon { width: 40px; height: 40px; font-size: 1.1rem; }
            .avatar { width: 40px; height: 40px; font-size: 1rem; }
            .navbar-profile span { display: none; }
            .hero h1 { font-size: 2.5rem; }
            .card { padding: 1.5rem; }
            .card-dashboard { padding: 1.5rem; }
            .btn { padding: 0.8rem 1.5rem; font-size: 1rem; min-width: 140px; min-height: 50px; }
            .resource-grid { grid-template-columns: 1fr; }
            .page-title { font-size: 2rem; }
          }
        `}</style>
      </head>
      <body className="bg-[#0a0c1a] text-[#eef4ff] min-h-screen font-sans">
        <main>{children}</main>
      </body>
    </html>
  )
}
