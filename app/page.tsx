'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { pricingPlans, resources, subjectCategories, Resource } from '@/lib/data';
import PricingCard from '@/components/PricingCard';
import ResourceCard from '@/components/ResourceCard';
import UPIPaymentPanel from '@/components/UPIPaymentPanel';
import PurchaseModal from '@/components/PurchaseModal';
import RevealSection from '@/components/RevealSection';
import { SlideInLeft, SlideInRight } from '@/components/SlideInSection';
import StaggeredContainer, { StaggeredItem } from '@/components/StaggeredContainer';

const quickStats = [
  { label: 'Curated notes', value: '42+' },
  { label: 'Live uploads', value: '12' },
  { label: 'Subjects ready', value: '9' },
];

export default function HomePage() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openPurchaseModal = (resource: Resource) => {
    setSelectedResource(resource);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen overflow-hidden pb-20">
      <section className="relative overflow-hidden bg-surface py-20">
        <div className="absolute inset-x-0 top-0 h-72 bg-hero-radial opacity-90" />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <SlideInLeft className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-white/5 px-4 py-2 text-sm text-purple-100 shadow-card"
              >
                First-year B.Tech essentials • Focused for engineering students
              </motion.div>
              <div className="max-w-2xl space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="text-5xl font-semibold tracking-tight text-white sm:text-6xl"
                >
                  CampusVault brings modern notes, PYQs, and lab manuals for first-year engineering.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg leading-8 text-slate-300"
                >
                  Access Engineering Chemistry, Physics, Maths, Graphics, CMS, BCME, Data Structures, and Environmental Engineering resources curated for Sem 1 and Sem 2.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <motion.a
                  href="/marketplace"
                  whileHover={{ y: -2, scale: 1.02, boxShadow: '0 0 34px rgba(139, 92, 246, 0.32)' }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-4 text-sm font-semibold text-white transition"
                >
                  Explore Marketplace
                </motion.a>
                <motion.a
                  href="/signup"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/90 transition hover:border-purple-400/40"
                >
                  Get Started
                </motion.a>
              </motion.div>
              <div className="grid gap-3 sm:grid-cols-3">
                {quickStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="text-sm text-slate-300">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </SlideInLeft>
            <SlideInRight>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl"
              >
                <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-950/80 p-8 shadow-glow">
                  <div className="pointer-events-none absolute -left-12 top-6 h-28 w-28 rounded-full bg-purple-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute right-6 bottom-8 h-24 w-24 rounded-full bg-cyan-500/10 blur-3xl" />
                  <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">First-Year Exam Booster</p>
                  <h2 className="mt-4 text-3xl font-semibold text-white">Semester-ready bundles for engineering students</h2>
                  <p className="mt-4 text-slate-300">Get subject-specific notes, question banks, handwritten records, and lab guides purpose-built for the first-year curriculum.</p>
                  <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-200">
                    <div className="flex items-center justify-between">
                      <span>Engineering Chemistry + Physics</span>
                      <span className="font-semibold text-white">Sem 1 support</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Graphics, CMS, BCME</span>
                      <span className="font-semibold text-white">Complete resources</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SlideInRight>
          </div>
        </div>
      </section>

      <RevealSection className="container pt-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Subject categories</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">CampusVault brings every first-year engineering subject in one place</h2>
            </div>
            <p className="max-w-xl text-sm text-slate-300">From exam crash notes to practical files, this platform is built for B.Tech students navigating the first-year semesters.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {subjectCategories.map((subject) => (
              <span key={subject} className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-200 shadow-sm transition hover:border-purple-400/40 hover:text-white">
                {subject}
              </span>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="container pt-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Trending notes</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Top first-year engineering resources</h2>
          </div>
          <Link href="/marketplace" className="text-sm font-semibold text-purple-200 transition hover:text-purple-100">View full marketplace →</Link>
        </div>
        <div className="mt-10">
          <StaggeredContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {resources.map((resource) => (
              <StaggeredItem key={resource.id}>
                <ResourceCard resource={resource} onBuy={() => openPurchaseModal(resource)} />
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </RevealSection>
      <PurchaseModal open={modalOpen} onClose={() => setModalOpen(false)} resource={selectedResource} />

      <RevealSection className="container pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Lab manual service</p>
            <h2 className="text-3xl font-semibold text-white">Custom records and practical files for engineering labs</h2>
            <p className="max-w-2xl text-slate-300">Order lab manuals, handwritten records, practical files, and complete first-year academic submissions with a polished student-focused layout.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
                <h3 className="text-lg font-semibold text-white">Lab Manuals</h3>
                <p className="mt-3 text-sm text-slate-300">Complete practical reports and formatted lab files for chemistry, physics, and environmental labs.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
                <h3 className="text-lg font-semibold text-white">Handwritten Records</h3>
                <p className="mt-3 text-sm text-slate-300">Neat handwritten-style records and practical files that look ready for submission.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
                <h3 className="text-lg font-semibold text-white">PYQ & Assignments</h3>
                <p className="mt-3 text-sm text-slate-300">Curated previous year questions, assignment solutions, and exam-ready study material.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
                <h3 className="text-lg font-semibold text-white">Semester Prep</h3>
                <p className="mt-3 text-sm text-slate-300">Focused support for Sem 1 and Sem 2 with subject-specific question banks and review sheets.</p>
              </div>
            </div>
            <Link href="/signup" className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-4 text-sm font-semibold text-white transition hover:brightness-110">
              Request a custom service
            </Link>
          </div>
          <UPIPaymentPanel />
        </div>
      </RevealSection>

      <RevealSection className="container pt-20">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Premium plans</p>
          <h2 className="text-3xl font-semibold text-white">Choose a plan that fits your first-year engineering goals</h2>
        </div>
        <div className="mt-10">
          <StaggeredContainer className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <StaggeredItem key={plan.title}>
                <PricingCard title={plan.title} price={plan.price} description={plan.description} features={plan.features} featured={plan.featured} />
              </StaggeredItem>
            ))}
          </StaggeredContainer>
        </div>
      </RevealSection>
      <footer className="text-center py-6 text-gray-400 text-sm border-t border-white/10 mt-20">
        Made with ❤️ by Saurabh Mukherjee
      </footer>
    </main>
  );
}
