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
  AboutUsDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const testimonials = [
    {
      text: '${projectName} has transformed the way I study. The AI-driven schedule keeps me on track and stress-free during exam season.',
      company: 'EduTech Innovations',
      user_name: 'Alex Johnson, Student Success Manager',
    },
    {
      text: "Thanks to ${projectName}, I can balance my coursework and extracurriculars effortlessly. It's a game-changer for busy students!",
      company: 'Future Scholars Inc.',
      user_name: 'Emily Carter, Academic Advisor',
    },
    {
      text: 'The personalized study plans from ${projectName} have significantly improved my grades. I feel more prepared and confident.',
      company: 'Bright Minds Academy',
      user_name: 'Michael Lee, Senior Tutor',
    },
    {
      text: 'I love how ${projectName} integrates with my calendar. It makes managing deadlines and assignments so much easier.',
      company: 'Smart Learning Solutions',
      user_name: 'Sarah Kim, Educational Consultant',
    },
    {
      text: 'As a teacher, I recommend ${projectName} to all my students. It helps them stay organized and focused on their studies.',
      company: 'Innovative Education Group',
      user_name: 'David Brown, High School Teacher',
    },
    {
      text: '${projectName} is an essential tool for any student looking to optimize their study habits. The AI insights are incredibly helpful.',
      company: 'NextGen Learning',
      user_name: 'Jessica Smith, Learning Specialist',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Learn More About ${projectName}`}</title>
        <meta
          name='description'
          content={`Discover the mission, values, and team behind ${projectName}. Learn how we empower students with AI-driven study solutions.`}
        />
      </Head>
      <WebSiteHeader projectName={'Scheduler'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Scheduler'}
          image={['Team brainstorming session']}
          mainText={`Meet the Visionaries Behind ${projectName}`}
          subTitle={`Discover the passion and innovation driving ${projectName}. Our team is committed to enhancing student success through cutting-edge AI technology.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Our Story`}
        />

        <AboutUsSection
          projectName={'Scheduler'}
          image={['Team discussing project goals']}
          mainText={`Our Mission and Vision at ${projectName}`}
          subTitle={`At ${projectName}, we strive to revolutionize education by providing AI-driven tools that empower students to achieve their academic goals efficiently and effectively.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Join Our Journey`}
        />

        <TestimonialsSection
          projectName={'Scheduler'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'Scheduler'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Reach out to us anytime, and our team will respond promptly to support your journey with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'Scheduler'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
