import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import SemiFooter from './Components/SemiFooter';
import ChatWidget from './Components/ChatWidget';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const AboutSEMI = lazy(() => import('./pages/AboutSEMI'));
const OurMission = lazy(() => import('./pages/OurMission'));
const ExecutiveMembers = lazy(() => import('./pages/ExecutiveMembers'));
const NationalBoard = lazy(() => import('./pages/NationalBoard'));
const PastPresidents = lazy(() => import('./pages/PastPresidents'));
const StateChapters = lazy(() => import('./pages/StateChapters'));
const Constitution = lazy(() => import('./pages/Constitution'));
const Contact = lazy(() => import('./pages/Contact'));
const OurWorkOverview = lazy(() => import('./pages/OurWorkOverview'));
const AdvocacyAndPolicy = lazy(() => import('./pages/AdvocacyAndPolicy'));
const TrainingAndCapacityBuilding = lazy(() => import('./pages/TrainingAndCapacityBuilding'));
const ConferencesAndEvents = lazy(() => import('./pages/ConferencesAndEvents'));
const CommunityOutreach = lazy(() => import('./pages/CommunityOutreach'));
const ClinicalGuidelines = lazy(() => import('./pages/ClinicalGuidelines'));
const Publications = lazy(() => import('./pages/Publications'));
const ReportsAndWhitePapers = lazy(() => import('./pages/ReportsAndWhitePapers'));
const WorkshopsAndTraining = lazy(() => import('./pages/WorkshopsAndTraining'));
const CCTEM = lazy(() => import('./pages/CCTEM'));
const MembershipBenefits = lazy(() => import('./pages/MembershipBenefits'));
const MembershipJoin = lazy(() => import('./pages/MembershipJoin'));
const MemberLogin = lazy(() => import('./pages/MemberLogin'));
const Newsletter = lazy(() => import('./pages/Newsletter'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

import Loader from './Components/Loader';

import ScrollToTop from './Components/ScrollToTop';
import ScrollToTopButton from './Components/ScrollToTopButton';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToTopButton />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about/semi" element={<AboutSEMI />} />
          <Route path="/about/mission-vision" element={<OurMission />} />
          <Route path="/about/executive-members" element={<ExecutiveMembers />} />
          <Route path="/about/national-board" element={<NationalBoard />} />
          <Route path="/about/past-presidents" element={<PastPresidents />} />
          <Route path="/about/state-chapters" element={<StateChapters />} />
          <Route path="/about/constitution" element={<Constitution />} />
          <Route path="/work/overview" element={<OurWorkOverview />} />
          <Route path="/work/advocacy" element={<AdvocacyAndPolicy />} />
          <Route path="/work/training" element={<TrainingAndCapacityBuilding />} />
          <Route path="/work/events" element={<ConferencesAndEvents />} />
          <Route path="/work/outreach" element={<CommunityOutreach />} />
          
          {/* Education Routes */}
          <Route path="/education/workshops" element={<WorkshopsAndTraining />} />
          <Route path="/education/cct-em" element={<CCTEM />} />

          {/* Membership Routes */}
          <Route path="/membership/benefits" element={<MembershipBenefits />} />
          <Route path="/membership/join" element={<MembershipJoin />} />
          <Route path="/membership/login" element={<MemberLogin />} />

          {/* Resources Routes */}
          <Route path="/resources/guidelines" element={<ClinicalGuidelines />} />
          <Route path="/resources/publications" element={<Publications />} />
          <Route path="/resources/reports" element={<ReportsAndWhitePapers />} />
          <Route path="/news/newsletter" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ChatWidget />
      <SemiFooter />
    </BrowserRouter>
  );
}

export default App;
