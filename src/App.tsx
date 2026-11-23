import { useState, useCallback } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroStatement } from './components/IntroStatement';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { TechStackSection } from './components/TechStackSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedContactService, setSelectedContactService] = useState<string>('Website');

  const scrollToContact = useCallback((serviceOption?: string) => {
    if (serviceOption) {
      setSelectedContactService(serviceOption);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#08090D] text-[#F5F5F7] flex flex-col">
        <Navbar onStartProject={() => scrollToContact()} />

        <main className="flex-1">
          <Hero onStartProject={() => scrollToContact()} />
          <IntroStatement />
          <ServicesSection onSelectServiceForContact={(service) => scrollToContact(service)} />
          <ProjectsSection onSelectServiceForContact={(service) => scrollToContact(service)} />
          <AboutSection />
          <WhyChooseUs onStartProject={() => scrollToContact()} />
          <ProcessSection />
          <TechStackSection />
          <FaqSection />
          <ContactSection preselectedService={selectedContactService} />
        </main>

        <Footer onSelectServiceForContact={(service) => scrollToContact(service)} />
      </div>
    </MotionConfig>
  );
}
