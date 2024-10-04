import React, { useState } from "react";
import Dropdown from "./Dropdown";

const faqData = [
    {
        question: <h2>How will it integrate with other calendars?</h2>,
        answer: <span>Our app will seamlessly sync with popular calendar services like Google Calendar and Outlook. This means you’ll never miss an important meeting or double-book your time.</span>,
    },
    {
        question: <h2>Will I be able to customize my availability?</h2>,
        answer: <span>Absolutely! Users will easily set their available hours and block out specific times when they're busy. Our goal will be to ensure that your schedule reflects your preferences.</span>,
    },
    {
        question: <h2>Will my data be safe with your app?</h2>,
        answer: <span>Absolutely! We will prioritize your privacy and security. All data will be encrypted and stored securely, and we will follow best practices to keep your information safe.</span>,
    },
    {
        question: <h2>How will this app benefit my startup?</h2>,
        answer: <span>This app will enhance productivity by streamlining your scheduling process, allowing your team to focus on what truly matters—growing your startup! Plus, with Microsoft’s support, you will have the tools and resources to innovate faster.</span>,
    },
];


const FAQ = () => {

  return (
    <>
      <div className="flex max-sm:flex-col md:space-x-3 max-sm:space-y-3 mt-24" id="faq">
        <div className="basis-1/2">
          <h1>FAQ</h1>
          <p>Frequently Asked Questions</p>
          <p><strong>timLOT</strong> is in current development</p>
        </div>
        <div className="flex-grow space-y-3 max-w-lg transition-all">
          {faqData.map((item, index) => (
            <Dropdown
              key={index}
              question={item.question}
              answer={item.answer}
              className="p-3 bg-primary border-2 border-black"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;
