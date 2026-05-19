'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { resources, subjectCategories, Resource } from '@/lib/data';
import ResourceCard from '@/components/ResourceCard';
import PurchaseModal from '@/components/PurchaseModal';
import StaggeredContainer, { StaggeredItem } from '@/components/StaggeredContainer';

const semesterFilters = ['All', 'Sem 1', 'Sem 2'];

export default function MarketplacePage() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const subjectMatch = selectedSubject === 'All' || resource.subject === selectedSubject;
      const semesterMatch = selectedSemester === 'All' || resource.semester === selectedSemester;
      return subjectMatch && semesterMatch;
    });
  }, [selectedSubject, selectedSemester]);

  return (
    <main className="min-h-screen pb-20">
      <section className="bg-surface pb-16 pt-14">
        <div className="container">
          <div className="space-y-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Marketplace</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">Browse curated first-year engineering resources</h1>
                <p className="mt-4 max-w-2xl text-slate-300">Explore Engineering Chemistry, Physics, Maths, Graphics, CMS, BCME, Data Structures, and Environmental Engineering study materials.</p>
              </div>
              <Link href="/payment" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white/90 transition hover:border-purple-400/40">
                Payment Flow Guide
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSubject('All')}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedSubject === 'All' ? 'bg-purple-600 text-white' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900'}`}
                >
                  All Subjects
                </button>
                {subjectCategories.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => setSelectedSubject(subject)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedSubject === subject ? 'bg-purple-600 text-white' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900'}`}
                  >
                    {subject}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {semesterFilters.map((semester) => (
                  <button
                    key={semester}
                    type="button"
                    onClick={() => setSelectedSemester(semester)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedSemester === semester ? 'bg-purple-600 text-white' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900'}`}
                  >
                    {semester}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <StaggeredContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {filteredResources.map((resource) => (
                <StaggeredItem key={resource.id}>
                  <ResourceCard
                    resource={resource}
                    onBuy={() => {
                      setSelectedResource(resource);
                      setModalOpen(true);
                    }}
                  />
                </StaggeredItem>
              ))}
            </StaggeredContainer>
          </div>
          <PurchaseModal open={modalOpen} onClose={() => setModalOpen(false)} resource={selectedResource} />
        </div>
      </section>
    </main>
  );
}
