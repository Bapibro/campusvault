"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

import { auth, db } from "@/lib/firebase";
import { subjectCategories } from "@/lib/data";

type ResourceForm = {
  title: string;
  subject: string;
  semester: string;
  price: string;
  pdfUrl: string;
};

type AdminResource = {
  id: string;
  title: string;
  subject: string;
  semester: string;
  price: string;
  pdfUrl: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "admin@campusvault.com")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const emptyForm: ResourceForm = {
  title: "",
  subject: subjectCategories[0],
  semester: "Sem 1",
  price: "",
  pdfUrl: ""
};

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" }
};

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [resources, setResources] = useState<AdminResource[]>([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [feedbackTone, setFeedbackTone] = useState<"success" | "error">("success");
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<"overview" | "manage">("overview");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ResourceForm>(emptyForm);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAdmin(Boolean(user?.email && adminEmails.includes(user.email)));
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      setResources([]);
      setResourcesLoading(false);
      return;
    }

    setResourcesLoading(true);

    const q = query(collection(db, "resources"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setResources(
          snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: String(data.title ?? ""),
              subject: String(data.subject ?? ""),
              semester: String(data.semester ?? ""),
              price: String(data.price ?? ""),
              pdfUrl: String(data.pdfUrl ?? ""),
              createdAt: data.createdAt?.toDate?.() ?? null,
              updatedAt: data.updatedAt?.toDate?.() ?? null
            };
          })
        );
        setResourcesLoading(false);
      },
      () => {
        setResourcesLoading(false);
        setFeedback("Unable to load resources right now. Please refresh and try again.");
        setFeedbackTone("error");
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  const summary = useMemo(() => {
    return {
      totalResources: resources.length,
      notes: resources.filter((resource) => resource.title.toLowerCase().includes("notes") || resource.pdfUrl.toLowerCase().includes("notes")).length,
      labManuals: resources.filter((resource) => resource.title.toLowerCase().includes("lab") || resource.title.toLowerCase().includes("manual") || resource.pdfUrl.toLowerCase().includes("manual")).length
    };
  }, [resources]);

  const handleAdminLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setAuthLoading(true);
    setAuthError("");

    try {
      await signInWithEmailAndPassword(auth, adminEmail.trim(), adminPassword);
      setAuthError("");
    } catch (error) {
      setAuthError(error instanceof Error ? error.message.replace("Firebase: Error (auth/", "").replace(")", "") : "Unable to sign in.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const beginEdit = (resource: AdminResource) => {
    setForm({
      title: resource.title,
      subject: resource.subject,
      semester: resource.semester,
      price: resource.price,
      pdfUrl: resource.pdfUrl
    });
    setEditingId(resource.id);
    setActiveSection("manage");
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      return "Title is required.";
    }

    if (!form.subject.trim()) {
      return "Subject is required.";
    }

    if (!form.semester.trim()) {
      return "Semester is required.";
    }

    if (!form.price.trim()) {
      return "Price is required.";
    }

    if (!form.pdfUrl.trim()) {
      return "PDF link is required.";
    }

    try {
      new URL(form.pdfUrl);
    } catch {
      return "Please enter a valid PDF link.";
    }

    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setFeedback(validationError);
      setFeedbackTone("error");
      return;
    }

    setIsSaving(true);
    setFeedback("");

    try {
      const payload = {
        title: form.title.trim(),
        subject: form.subject,
        semester: form.semester,
        price: form.price.trim(),
        pdfUrl: form.pdfUrl.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, "resources", editingId), payload);
        setFeedback("Resource updated successfully.");
      } else {
        await addDoc(collection(db, "resources"), payload);
        setFeedback("Resource added successfully.");
      }

      setFeedbackTone("success");
      resetForm();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not save the resource.");
      setFeedbackTone("error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (resourceId: string) => {
    setFeedback("");

    try {
      await deleteDoc(doc(db, "resources", resourceId));
      setFeedback("Resource deleted successfully.");
      setFeedbackTone("success");

      if (editingId === resourceId) {
        resetForm();
      }
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not delete the resource.");
      setFeedbackTone("error");
    }
  };

  if (!isAuthReady) {
    return (
      <main className="min-h-screen bg-surface px-6 py-20">
        <div className="container mx-auto max-w-2xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-card backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Admin dashboard</p>
            <h1 className="mt-3 text-2xl font-semibold text-white">Checking access...</h1>
          </div>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-surface px-6 py-20">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            {...cardMotion}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Secure admin access</p>
            <h1 className="mt-4 text-3xl font-semibold text-white">CampusVault admin sign in</h1>
            <p className="mt-3 text-slate-300">
              Use an approved admin account to access the dashboard. The current account is not authorized for admin actions.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleAdminLogin}>
              <label className="block">
                <span className="text-sm text-slate-300">Admin email</span>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(event) => setAdminEmail(event.target.value)}
                  placeholder="admin@campusvault.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-purple-400/60"
                />
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Password</span>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  placeholder="Enter admin password"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-purple-400/60"
                />
              </label>

              {authError ? (
                <p className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {authError}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={authLoading}
                  className="rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {authLoading ? "Signing in..." : "Sign in as admin"}
                </button>
                <Link href="/login" className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-purple-400/40">
                  Go to student login
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-card backdrop-blur-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Admin dashboard</p>
              <h1 className="mt-3 text-2xl font-semibold text-white">CampusVault control room</h1>
              <p className="mt-2 text-sm text-slate-300">Signed in as {currentUser?.email}</p>
            </div>

            <nav className="mt-8 space-y-2">
              <button
                type="button"
                onClick={() => setActiveSection("overview")}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeSection === "overview" ? "bg-purple-600 text-white" : "bg-slate-950/70 text-slate-200 hover:bg-slate-900"}`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveSection("manage")}
                className={`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeSection === "manage" ? "bg-purple-600 text-white" : "bg-slate-950/70 text-slate-200 hover:bg-slate-900"}`}
              >
                Manage resources
              </button>
            </nav>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <Link href="/marketplace" className="block rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-purple-400/40">
                Open marketplace
              </Link>
              <Link href="/payment" className="block rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-purple-400/40">
                Payment flow
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
              >
                Sign out
              </button>
            </div>
          </aside>

          <div className="space-y-6">
            <motion.section {...cardMotion} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur-xl">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Dashboard overview</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Keep CampusVault resources up to date</h2>
                  <p className="mt-3 max-w-2xl text-slate-300">
                    Add new study materials, edit existing notes, and remove outdated files directly from Firestore.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Total items</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{summary.totalResources}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Notes</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{summary.notes}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Lab manuals</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{summary.labManuals}</p>
                  </div>
                </div>
              </div>
            </motion.section>

            {feedback ? (
              <motion.div
                {...cardMotion}
                className={`rounded-2xl border px-4 py-3 text-sm ${feedbackTone === "success" ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100" : "border-rose-400/40 bg-rose-500/10 text-rose-100"}`}
              >
                {feedback}
              </motion.div>
            ) : null}

            <div className="grid gap-6 xl:grid-cols-[1.05fr_1.1fr]">
              <motion.section
                {...cardMotion}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-purple-200/80">Add or edit resource</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{editingId ? "Edit current resource" : "Upload a new resource"}</h2>
                  </div>
                  {editingId ? (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200 transition hover:border-purple-400/40"
                    >
                      Cancel edit
                    </button>
                  ) : null}
                </div>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <label className="block">
                    <span className="text-sm text-slate-300">Title</span>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                      placeholder="Engineering Chemistry Unit 1 Notes"
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-purple-400/60"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-slate-300">Subject</span>
                      <select
                        value={form.subject}
                        onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-purple-400/60"
                      >
                        {subjectCategories.map((subject) => (
                          <option key={subject} value={subject} className="bg-slate-950">
                            {subject}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className="text-sm text-slate-300">Semester</span>
                      <select
                        value={form.semester}
                        onChange={(event) => setForm((current) => ({ ...current, semester: event.target.value }))}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-purple-400/60"
                      >
                        <option value="Sem 1" className="bg-slate-950">Sem 1</option>
                        <option value="Sem 2" className="bg-slate-950">Sem 2</option>
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-sm text-slate-300">Price</span>
                      <input
                        type="text"
                        value={form.price}
                        onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                        placeholder="₹149"
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-purple-400/60"
                      />
                    </label>

                    <label className="block">
                      <span className="text-sm text-slate-300">PDF link</span>
                      <input
                        type="url"
                        value={form.pdfUrl}
                        onChange={(event) => setForm((current) => ({ ...current, pdfUrl: event.target.value }))}
                        placeholder="https://example.com/resource.pdf"
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-purple-400/60"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSaving ? (editingId ? "Updating..." : "Saving...") : editingId ? "Update resource" : "Add resource"}
                  </button>
                </form>
              </motion.section>

              <motion.section
                {...cardMotion}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-purple-200/80">Current resources</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">Manage published notes</h2>
                  </div>
                  {resourcesLoading ? (
                    <span className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200">Loading...</span>
                  ) : null}
                </div>

                <div className="mt-6 space-y-3">
                  {resources.length === 0 && !resourcesLoading ? (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/60 px-4 py-8 text-center text-slate-300">
                      No resources are currently stored in Firestore.
                    </div>
                  ) : null}

                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">{resource.title}</p>
                          <p className="mt-2 text-sm text-slate-300">
                            {resource.subject} • {resource.semester} • {resource.price}
                          </p>
                          <a
                            href={resource.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-sm text-purple-200 underline decoration-purple-200/40 underline-offset-2"
                          >
                            Open PDF
                          </a>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => beginEdit(resource)}
                            className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-200 transition hover:border-purple-400/40"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(resource.id)}
                            className="rounded-full border border-rose-400/40 bg-rose-500/10 px-3 py-1 text-sm text-rose-100 transition hover:bg-rose-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
