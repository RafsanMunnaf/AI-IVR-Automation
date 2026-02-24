import { hotel_booking_assistant_id } from "@/env";
import {
  Bot,
  Building2,
  Calendar,
  Cpu,
  FileText,
  GraduationCap,
  Hotel,
  Landmark,
  Lightbulb,
  Mic,
  Phone,
  PhoneCall,
  Radio,
  RadioTower,
  Siren,
  Users,
  Utensils,
  Volume2,
  Workflow,
} from "lucide-react";

// services section Data
export const services = [
  {
    icon: Hotel,
    title: "Hotel Booking",
    delay: 0,
    description:
      "Automate room reservations and guest inquiries instantly. Our AI handles bookings, check-in details, and amenity FAQs 24/7, ensuring your guests never have to wait on hold.",
    agent_id: null,
    active: false,
  },
  {
    icon: Utensils,
    title: "Restaurant",
    delay: 400,
    description:
      "Streamline table reservations and takeout orders. AI handles menu inquiries, dietary requests, and peak-hour bookings, allowing staff to focus on a premium dining experience.",
    agent_id: null,
    active: false,
  },
  {
    icon: GraduationCap,
    title: "Academic Institution",
    delay: 100,
    description:
      "Streamline student admissions and administrative support. Let the AI answer questions about course details, tuition fees, and class schedules, freeing up staff for complex tasks.",
    agent_id: null,
    active: false,
  },
  {
    icon: Building2,
    title: "Hospital",
    delay: 200,
    description:
      "Simplify patient appointment scheduling. Our AI agent assists patients with booking doctor visits, checking department availability, and answering general health service queries efficiently.",
    agent_id: null,
    active: false,
  },
  {
    icon: Users,
    title: "Coaching & Consulting",
    delay: 300,
    description:
      "Capture leads and schedule consultations automatically. The AI engages potential clients, explains your programs, and books appointments directly into your calendar.",
    agent_id: null,
    active: false,
  },

  {
    icon: Landmark,
    title: "Banking",
    delay: 500,
    description:
      "Enhance financial support with AI assisting customers with balance inquiries, transactions, branch locations, and loan applications, available 24/7 for seamless banking experiences.",
    agent_id: null,
    active: false,
  },
  {
    icon: RadioTower,
    title: "Telecommunication",
    delay: 600,
    description:
      "Automate plan upgrades, technical troubleshooting, service activations, and bill payments. AI reduces wait times, improving customer support efficiency and first-contact resolution.",
    agent_id: null,
    active: false,
  },
  {
    icon: Siren,
    title: "Emergency Services",
    delay: 700,
    description:
      "Improve response times with AI collecting vital data, prioritizing urgent calls, dispatching ambulances, and providing callers with immediate guidance for critical situations.",
    agent_id: null,
    active: false,
  },
];

//// For the services page

export const OurServices = [
  {
    active: true,
    agent_id: "AG-001",
    icon: "📞",
    title: "Inbound Booking",
    description:
      "Handle incoming calls efficiently with AI-powered voice agents that can schedule appointments, answer questions, and provide instant booking confirmations 24/7.",
    delay: 0,
  },
  {
    active: true,
    agent_id: "AG-002",
    icon: "📅",
    title: "Restaurant",
    description:
      "Streamline your restaurant operations with automated reservation management, waitlist handling, and customer inquiry responses through intelligent voice interactions.",
    delay: 0.1,
  },
  {
    active: true,
    agent_id: "AG-003",
    icon: "🔔",
    title: "Academic Institution",
    description:
      "Enhance student engagement with automated admission inquiries, course information, campus tour scheduling, and general administrative support.",
    delay: 0.2,
  },
  {
    active: true,
    agent_id: "AG-004",
    icon: "🏥",
    title: "Hospital",
    description:
      "Improve patient care coordination with automated appointment scheduling, prescription refill requests, and basic health information assistance.",
    delay: 0.3,
  },
  {
    active: false,
    agent_id: "AG-005",
    icon: "💬",
    title: "Customer Support",
    description:
      "Provide exceptional customer service with AI agents that handle FAQs, troubleshooting, and ticket creation while escalating complex issues to human agents.",
    delay: 0.4,
  },
  {
    active: false,
    agent_id: "AG-006",
    icon: "🚗",
    title: "Auto Service",
    description:
      "Simplify vehicle service scheduling with automated appointment booking, service reminders, and maintenance inquiry handling for automotive businesses.",
    delay: 0.5,
  },
];

export const processSteps = [
  {
    icon: Mic,
    title: "User Voice Input",
    description: "User speaks naturally",
    delay: 0,
  },
  {
    icon: Phone,
    title: "Twilio Voice API",
    description: "Captures audio stream",
    delay: 100,
  },
  {
    icon: FileText,
    title: "Speech-to-Text",
    description: "ElevenLabs Scribe v1",
    delay: 200,
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description: "GPT analyzes & decides",
    delay: 300,
  },
  {
    icon: Volume2,
    title: "Text Response",
    description: "AI generates reply",
    delay: 400,
  },
  {
    icon: PhoneCall,
    title: "Voice Output",
    description: "Twilio delivers audio",
    delay: 500,
  },
];

//////////
/////Features and why chose us
export const features = [
  {
    icon: Mic,
    title: "Real-time Voice Understanding",
    description:
      "Advanced speech recognition with full Bengali language support for natural conversations.",
    delay: 0,
  },
  {
    icon: Lightbulb,
    title: "Powered by Industry Leaders",
    description:
      "Built on Twilio, ElevenLabs, and OpenAI for reliable, high-quality voice interactions.",
    delay: 100,
  },
  {
    icon: Calendar,
    title: "Fully Automated Scheduling",
    description:
      "AI handles the entire booking process from start to finish without human intervention.",
    delay: 200,
  },
  {
    icon: Radio,
    title: "Fast & Reliable Voice Flows",
    description:
      "Low-latency responses with robust error handling for seamless user experience.",
    delay: 300,
  },
];

/////

export const SLIDE_DATA = [
  {
    id: 1,
    title: "Nexus E-Commerce",
    category: "Web Application",
    imageUrl:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop",
    description:
      "A high-performance headless commerce engine with real-time inventory management.",
    techStack: ["Next.js", "TypeScript", "Stripe", "Redis"],
    links: { live: "#", source: "#" },
    status: "Production",
  },
  {
    id: 2,
    title: "SynthAI Analytics",
    category: "SaaS Platform",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop",
    description:
      "Predictive analytics dashboard powered by custom LLM integrations for enterprise data.",
    techStack: ["React", "Python", "FastAPI", "TensorFlow"],
    links: { live: "#", source: "#" },
    status: "Beta",
  },
  {
    id: 3,
    title: "Velo Finance",
    category: "Fintech App",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1920&h=1080&fit=crop",
    description:
      "Modern crypto wallet with cross-chain swapping and institutional-grade security.",
    techStack: ["React Native", "Solidity", "Ethers.js", "Node.js"],
    links: { live: "#", source: "#" },
    status: "Production",
  },
  {
    id: 4,
    title: "Lumina CRM",
    category: "Internal Tooling",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop",
    description:
      "Streamlined customer relationship management for creative agencies and studios.",
    techStack: ["Vue.js", "Supabase", "Tailwind", "PostgreSQL"],
    links: { live: "#", source: "#" },
    status: "Production",
  },
  {
    id: 5,
    title: "Aura Social",
    category: "Mobile Design",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&h=1080&fit=crop",
    description:
      "A privacy-focused social network emphasizing ephemeral sharing and zero-knowledge proofs.",
    techStack: ["Flutter", "Rust", "IPFS", "Docker"],
    links: { live: "#", source: "#" },
    status: "Concept",
  },
];
