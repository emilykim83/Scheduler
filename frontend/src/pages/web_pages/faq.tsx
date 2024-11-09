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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is an AI-powered application that helps students create personalized study schedules by analyzing their syllabuses and optimizing their study time.',
    },
    {
      question: 'Can I customize my study schedule?',
      answer:
        'Yes, you can adjust your study sessions within ${projectName} to fit your personal availability and preferences, ensuring flexibility in your planning.',
    },
    {
      question: 'How does ${projectName} send notifications?',
      answer:
        '${projectName} sends smart reminders for upcoming assignments and exams, helping you stay on top of your deadlines with timely alerts.',
    },
    {
      question: 'Is there a mobile version of ${projectName}?',
      answer:
        'Currently, ${projectName} is available as a web application. We are working on a mobile version to enhance accessibility and convenience.',
    },
    {
      question: 'What support options are available for users?',
      answer:
        '${projectName} offers email support for all users. Premium and Business plan users receive priority support and additional resources.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        '${projectName} takes data security seriously. We use industry-standard encryption and security measures to protect your personal information.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how to get the most out of our application.`}
        />
      </Head>
      <WebSiteHeader projectName={'Scheduler'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Scheduler'}
          image={['Person reading FAQ page']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn how to maximize your experience with our application.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Scheduler'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Scheduler'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support illustration']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions or need assistance? Contact ${projectName} anytime, and our team will respond promptly to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'Scheduler'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
