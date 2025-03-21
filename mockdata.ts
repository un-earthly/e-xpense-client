
const stats = [
    { id: 1, name: 'Active Users', value: '100,000+' },
    { id: 2, name: 'Transactions Tracked', value: '$2.5B+' },
    { id: 3, name: 'Money Saved', value: '$500M+' },
]
const features = [
    {
        name: 'Easy Tracking',
        description: 'Track all your expenses in one place with our intuitive interface and smart categorization.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Secure Data',
        description: 'Your financial data is protected with enterprise-grade security and encryption.',
        icon: LockClosedIcon,
    },
    {
        name: 'Smart Reports',
        description: 'Generate detailed reports and insights to understand your spending patterns.',
        icon: ChartBarIcon,
    },
    {
        name: 'Budget Planning',
        description: 'Set budgets, track goals, and get notifications to stay on top of your finances.',
        icon: WalletIcon,
    },
];
const tiers = [
    {
        name: 'Free',
        id: 'tier-free',
        href: '#',
        priceMonthly: '$0',
        description: 'Perfect for individuals starting their financial journey.',
        features: [
            'Basic expense tracking',
            'Monthly reports',
            'Up to 50 transactions/month',
            'Email support'
        ],
        featured: false,
    },
    {
        name: 'Pro',
        id: 'tier-pro',
        href: '#',
        priceMonthly: '$9.99',
        description: 'Everything you need for serious expense management.',
        features: [
            'Unlimited transactions',
            'Advanced analytics',
            'Custom categories',
            'Priority support',
            'Budget planning tools',
            'Export reports'
        ],
        featured: true,
    },
]

const faqs = [
    {
        id: 1,
        question: 'How does the expense tracking work?',
        answer: 'Our smart system automatically categorizes your expenses and allows manual adjustments. You can import transactions or add them manually.'
    },
    {
        id: 2,
        question: 'Can I export my expense data?',
        answer: 'Yes, Pro users can export their data in multiple formats including PDF, CSV, and Excel.'
    },
    {
        id: 3,
        question: 'Is my financial data secure?',
        answer: 'We use bank-level encryption and security measures to protect your data. We never store sensitive financial information.'
    },
    {
        id: 4,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for Pro subscriptions.'
    },
    {
        id: 5,
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your Pro subscription at any time. Your data will remain accessible on the Free plan.'
    }
]
const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]