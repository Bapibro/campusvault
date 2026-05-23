'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';

import { resources as staticResources, subjectCategories, Resource } from '@/lib/data';
import { db } from '@/lib/firebase';
import ResourceCard from '@/components/ResourceCard';
import PurchaseModal from '@/components/PurchaseModal';
import StaggeredContainer, { StaggeredItem } from '@/components/StaggeredContainer';

const semesterFilters = ['All', 'Sem 1', 'Sem 2'];
const resourceTypeFilters = ['All', 'Notes', 'PYQ', 'Lab Manual'];

const getResourceType = (resource: Resource) => {
  const badge = resource.badge.toLowerCase();
  const title = resource.title.toLowerCase();

  if (badge.includes('pyq') || title.includes('pyq')) return 'PYQ';
  if (badge.includes('lab') || badge.includes('manual') || badge.includes('practical') || title.includes('lab manual')) return 'Lab Manual';

  return 'Notes';
};

const buildMarketplaceResource = (docSnap: { id: string; data: () => Record<string, unknown> }): Resource => {
  const data = docSnap.data();
  const type = String(data.type ?? data.badge ?? 'Notes');
  const badge = type === 'PYQ' ? 'PYQ' : type === 'Lab Manual' ? 'Lab Manual' : 'Notes';
  const subject = String(data.subject ?? '');
  const semester = String(data.semester ?? 'Sem 1');
  const title = String(data.title ?? 'Untitled resource');

  return {
    id: docSnap.id,
    title,
    subject,
    semester,
    price: String(data.price ?? '₹149'),
    badge,
    preview: String(data.preview ?? `${badge} resource for ${subject}.`)
  };
};

export default function MarketplacePage() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [liveResources, setLiveResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'resources'), orderBy('uploadedAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setLiveResources(snapshot.docs.map((docSnap) => buildMarketplaceResource({ id: docSnap.id, data: () => docSnap.data() })));
        setIsLoading(false);
      },
      () => {
        setLiveResources([]);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const allResources = useMemo(() => [...staticResources, ...liveResources], [liveResources]);

  const filteredResources = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return allResources.filter((resource) => {
      const subjectMatch = selectedSubject === 'All' || resource.subject === selectedSubject;
      const semesterMatch = selectedSemester === 'All' || resource.semester === selectedSemester;
      const typeMatch = selectedType === 'All' || getResourceType(resource) === selectedType;
      const searchMatch =
        normalizedSearch.length === 0 ||
        resource.title.toLowerCase().includes(normalizedSearch) ||
        resource.subject.toLowerCase().includes(normalizedSearch) ||
        resource.badge.toLowerCase().includes(normalizedSearch) ||
        resource.preview.toLowerCase().includes(normalizedSearch);

      return subjectMatch && semesterMatch && typeMatch && searchMatch;
    });
  }, [allResources, searchTerm, selectedSubject, selectedSemester, selectedType]);

  const clearFilters = () => {
    setSelectedSubject('All');
    setSelectedSemester('All');
    setSelectedType('All');
    setSearchTerm('');
  };

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    selectedSubject !== 'All' ||
    selectedSemester !== 'All' ||
    selectedType !== 'All';

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

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-card backdrop-blur-xl md:p-6"
            >
              <div className="space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-purple-200/80">Live search</p>
                  <div className="mt-3 relative">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-purple-200">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                        <path d="M8.5 14.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="m13.5 13.5 4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search notes, PYQs, lab manuals..."
                      aria-label="Search resources"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/75 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-purple-400/70 focus:shadow-[0_0_0_2px_rgba(168,85,247,0.18)]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-end">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-200">Resource type</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {resourceTypeFilters.map((resourceType) => (
                          <motion.button
                            key={resourceType}
                            type="button"
                            onClick={() => setSelectedType(resourceType)}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedType === resourceType ? 'bg-purple-600 text-white' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900'}`}
                          >
                            {resourceType}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-200">Subject</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <motion.button
                          type="button"
                          onClick={() => setSelectedSubject('All')}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedSubject === 'All' ? 'bg-purple-600 text-white' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900'}`}
                        >
                          All Subjects
                        </motion.button>
                        {subjectCategories.map((subject) => (
                          <motion.button
                            key={subject}
                            type="button"
                            onClick={() => setSelectedSubject(subject)}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedSubject === subject ? 'bg-purple-600 text-white' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900'}`}
                          >
                            {subject}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 xl:min-w-[240px]">
                    <div>
                      <p className="text-sm font-medium text-slate-200">Semester</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {semesterFilters.map((semester) => (
                          <motion.button
                            key={semester}
                            type="button"
                            onClick={() => setSelectedSemester(semester)}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedSemester === semester ? 'bg-purple-600 text-white' : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900'}`}
                          >
                            {semester}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={clearFilters}
                      disabled={!hasActiveFilters}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm font-semibold text-white transition hover:border-purple-400/40 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Clear filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
                    <div className="mt-5 h-5 w-3/4 animate-pulse rounded-full bg-white/10" />
                    <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-white/10" />
                    <div className="mt-4 h-4 w-5/6 animate-pulse rounded-full bg-white/10" />
                    <div className="mt-6 h-10 w-full animate-pulse rounded-2xl bg-purple-500/10" />
                  </motion.div>
                ))}
              </div>
            ) : filteredResources.length > 0 ? (
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
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 px-6 py-12 text-center shadow-card"
              >
                <p className="text-3xl">🔎</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">No resources match your filters</h2>
                <p className="mt-3 text-slate-300">Try adjusting your search term or clearing the filters to explore more resources.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </div>

          <PurchaseModal open={modalOpen} onClose={() => setModalOpen(false)} resource={selectedResource} />
        </div>
      </section>
    </main>
  );
}
