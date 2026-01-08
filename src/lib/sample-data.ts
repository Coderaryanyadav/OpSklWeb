import { Profile, Gig } from "@/types";

export const personSampleData: Profile[] = [
    {
        id: "1",
        name: "Rahul Kumar",
        title: "Senior Full-Stack Developer",
        bio: "Dedicated software architect with 8+ years of experience in building scalable web applications. Specialist in Next.js, Go, and PostgreSQL. I focus on clean code and exceptional user experiences.",
        rating: 4.9,
        reviews: 42,
        xp: 2850,
        location: "Bangalore, KA",
        verified: true,
        aadhaarVerified: true,
        skills: ["Next.js", "TypeScript", "Node.js", "Docker", "Go", "AWS"],
        rate: 1200,
        completedGigs: 38,
        portfolio: [
            { title: "Fintech App", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
            { title: "AI Dashboard", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" }
        ]
    },
    {
        id: "2",
        name: "Aisha Verma",
        title: "UI/UX Designer",
        bio: "Product designer passionate about creating intuitive and beautiful digital experiences. Expert in Figma and Design Systems.",
        rating: 4.8,
        reviews: 29,
        xp: 1950,
        location: "Remote",
        verified: true,
        aadhaarVerified: true,
        skills: ["Figma", "Branding", "Webflow", "Design Systems"],
        rate: 950,
        completedGigs: 25,
        portfolio: [
            { title: "E-commerce Mobile App", img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=800&q=80" }
        ]
    },
    {
        id: "3",
        name: "Vikram Singh",
        title: "Python & Data Scientist",
        bio: "ML Engineer focusing on NLP and predictive analytics. Helping startups leverage their data for growth.",
        rating: 5.0,
        reviews: 12,
        xp: 1200,
        location: "Delhi, DL",
        verified: false,
        aadhaarVerified: false,
        skills: ["Python", "TensorFlow", "Pandas", "NLP"],
        rate: 1500,
        completedGigs: 10,
        portfolio: []
    }
];

export const gigSampleData: Gig[] = [
    {
        id: "1",
        title: "E-commerce Website Design",
        description: "Need a modern, responsive design for my fashion store. Looking for someone with experience in Shopify or custom React builds.",
        budget: { min: 15000, max: 25000 },
        skills: ["UI/UX", "Figma", "React"],
        client: {
            name: "Priya Sharma",
            verified: true
        },
        location: "Mumbai, Maharashtra",
        postedDate: new Date().toISOString()
    },
    {
        id: "2",
        title: "Full Stack Developer for SaaS",
        description: "Looking for an experienced developer to build a subscription-based platform. Must be proficient in Next.js and Supabase.",
        budget: { min: 45000, max: 80000 },
        skills: ["Next.js", "Supabase", "TypeScript"],
        client: {
            name: "TechFlow Solutions",
            verified: true
        },
        location: "Bangalore, KA",
        postedDate: new Date(Date.now() - 86400000).toISOString()
    }
];
