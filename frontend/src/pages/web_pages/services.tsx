import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  PricingDesigns,
  ContactFormDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Scheduler';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'AI-Driven Study Plans',
      description:
        'Automatically generate personalized study schedules based on your syllabus. Focus on what matters most and optimize your study time.',
      icon: 'mdiCalendarCheck',
    },
    {
      name: 'Seamless Integrations',
      description:
        'Connect with educational platforms and calendar APIs to streamline your resources and keep all your study materials in one place.',
      icon: 'mdiLinkVariant',
    },
    {
      name: 'Customizable Alerts',
      description:
        'Set up smart reminders for assignments and exams. Stay on top of your deadlines with notifications tailored to your preferences.',
      icon: 'mdiBellRing',
    },
  ];

  const pricing_features = {
    standard: {
      features: ['AI-Driven Study Plans', 'Customizable Alerts'],
      limited_features: ['Basic Integrations', 'Limited Support'],
    },
    premium: {
      features: [
        'AI-Driven Study Plans',
        'Customizable Alerts',
        'Seamless Integrations',
      ],
      also_included: ['Priority Support', 'Advanced Analytics'],
    },
    business: {
      features: [
        'AI-Driven Study Plans',
        'Customizable Alerts',
        'Seamless Integrations',
        'Dedicated Account Manager',
        'Comprehensive Analytics',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individual students seeking to optimize their study schedules with essential features.',
    premium:
      'Perfect for small teams or educational groups needing enhanced features and priority support.',
    business:
      'Designed for large educational institutions or enterprises requiring comprehensive tools and dedicated support.',
  };

  const testimonials = [
    {
      text: '${projectName} has been a lifesaver for managing my study schedule. The AI-driven plans keep me organized and stress-free.',
      company: 'Study Solutions Co.',
      user_name: 'Anna Thompson, Student',
    },
    {
      text: 'Our team loves using ${projectName} for its seamless integrations and smart reminders. It has improved our productivity significantly.',
      company: 'EduTech Group',
      user_name: 'James Lee, Team Leader',
    },
    {
      text: 'The personalized study plans from ${projectName} have helped me improve my grades. I feel more confident and prepared for exams.',
      company: 'Bright Future Academy',
      user_name: 'Sophia Martinez, High School Student',
    },
    {
      text: 'As an educator, I recommend ${projectName} to all my students. It helps them stay on track and manage their time effectively.',
      company: 'Innovative Learning Institute',
      user_name: 'Michael Brown, Teacher',
    },
    {
      text: '${projectName} offers excellent features for a reasonable price. The premium plan is perfect for our small educational team.',
      company: 'Smart Learning Hub',
      user_name: 'Emily Davis, Program Coordinator',
    },
    {
      text: 'The business plan of ${projectName} provides comprehensive tools and support that our institution needs. Highly recommended!',
      company: 'Global Education Network',
      user_name: 'David Wilson, Director',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - Discover What ${projectName} Offers`}</title>
        <meta
          name='description'
          content={`Explore the innovative services provided by ${projectName}, including AI-driven study scheduling, smart reminders, and more. Learn about our pricing plans and hear from satisfied users.`}
        />
      </Head>
      <WebSiteHeader projectName={'Scheduler'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Scheduler'}
          image={['Student using study app']}
          mainText={`Unlock Your Potential with ${projectName}`}
          subTitle={`Discover how ${projectName} can transform your academic journey with AI-powered tools and personalized study solutions. Explore our services designed to enhance your learning experience.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Services`}
        />

        <FeaturesSection
          projectName={'Scheduler'}
          image={['AI-driven study planner']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover the powerful features of ${projectName} that make studying more efficient and effective for students.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'Scheduler'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <TestimonialsSection
          projectName={'Scheduler'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied ${projectName} Users `}
        />

        <ContactFormSection
          projectName={'Scheduler'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support team']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Have questions or need assistance? Reach out to us anytime, and our team will respond promptly to help you make the most of ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'Scheduler'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
