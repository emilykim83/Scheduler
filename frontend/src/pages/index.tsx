import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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
      name: 'AI-Powered Scheduling',
      description:
        'Automatically generate a personalized study schedule by analyzing your syllabus. Save time and focus on what matters most.',
      icon: 'mdiCalendarClock',
    },
    {
      name: 'Smart Reminders',
      description:
        'Receive timely notifications for upcoming assignments and exams. Never miss a deadline with our intelligent alert system.',
      icon: 'mdiBellAlert',
    },
    {
      name: 'Performance Insights',
      description:
        'Gain insights into your study habits and performance. Adjust your schedule based on AI analysis for optimal results.',
      icon: 'mdiChartLine',
    },
  ];

  const faqs = [
    {
      question: 'How does ${projectName} create my study schedule?',
      answer:
        '${projectName} analyzes your uploaded syllabus to identify key dates and deadlines, then uses AI to generate a personalized study plan tailored to your needs.',
    },
    {
      question: 'Can I adjust the schedule if needed?',
      answer:
        'Yes, you can easily adjust your study sessions within ${projectName} to fit your personal availability and preferences, ensuring flexibility in your planning.',
    },
    {
      question: 'What types of notifications will I receive?',
      answer:
        "You'll receive reminders for upcoming assignments and exams, as well as suggestions for optimal study times based on your past performance and habits.",
    },
    {
      question:
        'Is ${projectName} compatible with other educational platforms?',
      answer:
        'Yes, ${projectName} can integrate with various educational platforms and calendar APIs to streamline your study resources and scheduling.',
    },
    {
      question: 'Who can use ${projectName}?',
      answer:
        '${projectName} is designed for college and high school students looking to optimize their study schedules and improve academic performance.',
    },
    {
      question: 'Is there a cost to use ${projectName}?',
      answer:
        'Pricing details can vary, so please check our pricing page for the most up-to-date information on subscription plans and features.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`AI-Powered Study Schedule Optimizer`}</title>
        <meta
          name='description'
          content={`Optimize your study schedule with our AI-driven web app. Upload your syllabus and get personalized homework and exam preparation plans.`}
        />
      </Head>
      <WebSiteHeader projectName={'Scheduler'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Scheduler'}
          image={['Student using AI study app']}
          mainText={`Revolutionize Your Study Schedule with AI`}
          subTitle={`Upload your syllabus and let ${projectName} create a personalized study plan. Stay ahead with AI-driven scheduling and reminders.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <AboutUsSection
          projectName={'Scheduler'}
          image={['Team collaborating on project']}
          mainText={`Empowering Students with ${projectName}`}
          subTitle={`${projectName} is dedicated to helping students excel by providing AI-driven study schedules. Our mission is to simplify academic planning and enhance learning efficiency.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'Scheduler'}
          image={['AI scheduling interface screenshot']}
          withBg={0}
          features={features_points}
          mainText={`Discover ${projectName} Features`}
          subTitle={`Explore how ${projectName} can transform your study routine with AI-powered scheduling and smart reminders.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'Scheduler'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'Scheduler'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
