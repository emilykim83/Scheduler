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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      question: 'How does ${projectName} create personalized study schedules?',
      answer:
        '${projectName} uses AI to analyze your uploaded syllabus and generate a study plan tailored to your deadlines and preferences.',
    },
    {
      question: 'Can I integrate ${projectName} with other platforms?',
      answer:
        'Yes, ${projectName} supports integration with various educational platforms and calendar APIs to streamline your study resources.',
    },
    {
      question: 'What kind of notifications will I receive?',
      answer:
        "You'll receive reminders for upcoming assignments and exams, as well as suggestions for optimal study times based on your habits.",
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, ${projectName} offers a free trial period for new users to explore the features and see how it can benefit their study routine.',
    },
    {
      question: 'How can I upgrade my plan?',
      answer:
        'You can upgrade your plan through the account settings in ${projectName}. Choose the plan that best fits your needs and follow the prompts.',
    },
    {
      question: 'What support options are available?',
      answer:
        '${projectName} offers email support for all users. Premium and Business plan users receive priority support and additional resources.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to ${projectName} for any inquiries or support. Our team is here to assist you with any questions you may have.`}
        />
      </Head>
      <WebSiteHeader projectName={'Scheduler'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Scheduler'}
          image={['Customer service representative']}
          mainText={`Reach Out to ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Contact ${projectName} and let us assist you in optimizing your study experience.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Scheduler'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Scheduler'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Email communication illustration']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're available to assist you with any inquiries or support needs. Reach out to ${projectName} and expect a prompt response from our team.`}
        />
      </main>
      <WebSiteFooter projectName={'Scheduler'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
