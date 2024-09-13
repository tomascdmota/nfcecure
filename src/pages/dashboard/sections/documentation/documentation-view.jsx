import { useState } from 'react';

const primaryColor = '#822341';

const Section = ({ title, items }) => (
  <div className="mb-8">
    <h4 className="text-2xl mb-4" style={{ color: primaryColor }}>
      {title}
    </h4>
    {items.map((item, index) => (
      <Accordion key={index} item={item} />
    ))}
  </div>
);

const Accordion = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-300 rounded-md">
      <div
        className={`p-4 flex justify-between items-center cursor-pointer bg-[${primaryColor}] text-white`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{item.question}</p>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const DocumentationPage = () => {
  const sections = [
    {
      title: 'FAQs',
      items: [
        {
          question: 'How do I reset my password?',
          answer:
            "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
        },
        {
          question: 'Can I change my username?',
          answer:
            'Usernames cannot be changed once an account is created. If you need a new username, please contact support.',
        },
        {
          question: 'How do I update my profile information?',
          answer:
            "Log in to your account, go to 'Settings', and select 'Edit Profile' to update your information.",
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes, we use industry-standard encryption and security measures to protect your data.',
        },
        {
          question: 'How can I contact customer support?',
          answer:
            "You can reach our customer support team via email at support@example.com or through the 'Help' section in your account.",
        },
      ],
    },
    {
      title: 'User Management',
      items: [
        {
          question: 'How do I add a new user?',
          answer: "Go to the 'User Management' section, click 'Add User', and fill in the required information.",
        },
        {
          question: 'Can I set different permission levels?',
          answer:
            "Yes, you can assign roles such as 'Admin', 'Editor', or 'Viewer' when creating or editing a user.",
        },
        {
          question: 'How do I deactivate a user account?',
          answer:
            "In the 'User Management' section, find the user and click 'Deactivate Account' from the options menu.",
        },
        {
          question: 'Is there a limit to the number of users?',
          answer: 'The number of users depends on your subscription plan. Check your plan details for specific limits.',
        },
        {
          question: 'Can users have multiple roles?',
          answer: 'Currently, each user can only have one role assigned at a time.',
        },
      ],
    },
    {
      title: 'Product Management',
      items: [
        {
          question: 'How do I add a new product?',
          answer: "In the 'Product Management' section, click 'Add Product' and fill in the product details form.",
        },
        {
          question: 'Can I bulk upload products?',
          answer:
            "Yes, you can use our CSV import feature to bulk upload products. Go to 'Product Management' and select 'Bulk Import'.",
        },
        {
          question: 'How do I update product pricing?',
          answer:
            "Find the product in the 'Product Management  ' section, click 'Edit', and update the pricing information.",
        },
        {
          question: 'Can I set up product variants?',
          answer:
            'Yes, when adding or editing a product, you can create variants based on attributes like size or color.',
        },
        {
          question: 'How do I manage product categories?',
          answer:
            "Go to 'Product Management', select 'Categories', and use the interface to add, edit, or delete categories.",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl text-center mb-8" style={{ color: primaryColor }}>
        Documentation
      </h2>
      {sections.map((section, index) => (
        <Section key={index} title={section.title} items={section.items} />
      ))}
    </div>
  );
};

export default DocumentationPage;
