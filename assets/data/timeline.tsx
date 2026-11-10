import { Flame, MicVocal, Laptop } from "lucide-react";

export const markers = [
  {
    id: "day1",
    label: "Nov 12",
    events: [
      {
        id: "day1-event1",
        time: "08:00",
        displayTime: "8:00 AM - 09:30 AM",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Registration",
        description: "Attendee check-in and registration.",
        venue: "",
      },
      {
        id: "day1-event2",
        time: "09:30",
        displayTime: "9:30 AM - 10:15 AM",
        icon: <MicVocal className="h-auto sm:w-8" />,
        title: "Inauguration",
        description: "Opening ceremony of DevHost 2026.",
        venue: "Shashikiran Auditorium",
      },

      {
        id: "day1-event3",
        time: "10:15",
        displayTime: "10:15 AM - 10:45 AM",
        icon: <MicVocal className="h-auto sm:w-8" />,
        title: "Pre-Hackathon Briefing",
        description: "Briefing session before the flagship hackathon begins.",
        venue: "",
      },
      // {
      //   id: "day1-event3",
      //   displayTime: "10:15 AM - 10:45 AM",
      //   icon: <MicVocal className="h-auto sm:w-8" />,
      //   title:
      //     "Collaboration for Change: Transdisciplinary Solutions to Social Problems",
      //   description:
      //     "A brief on how drone-based mapping and cross-disciplinary collaboration use geospatial intelligence to drive sustainable, resilient, and community-focused solutions to modern social and environmental challenges.",
      //   speaker: "Dr. Pruthviraj Umesh",
      //   role: "Associate Professor @ National Institute of Technology Karnataka",
      //   venue: "",
      // },
      {
        id: "day1-event4",
        time: "10:00",
        displayTime: "10:00 AM - 12:00 PM",
        icon: <MicVocal className="h-auto sm:w-8" />,
        title: "Voice of the Oracle (Tech Pitch)",
        description:
          "A tech pitch competition where teams present their ideas before a panel of judges and compete for the top spot.",
        venue: "Ground Floor Seminar Hall",
      },
      {
        id: "day1-event5",
        time: "13:00",
        displayTime: "10:00 AM - 12:30 PM",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Siege of Troy (CTF)",
        description:
          "A Capture the Flag cybersecurity challenge where participants take on the roles of attackers and defenders.",
        venue: "Ground Floor AIML Lab",
      },
      {
        id: "day1-event6",
        time: "11:00",
        displayTime: "11:00 AM ",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Flagship Hackathon Begins",
        description: "Official kickoff of the flagship hackathon.",
        venue: "Skill Labs",
      },
      {
        id: "day1-event7",
        time: "15:00",
        displayTime: "3:00 PM - 05:00 PM",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "The Sphinx Trial (Competitive Programming)",
        description:
          "A competitive programming contest where participants solve algorithmic problems under time pressure.",
        venue: "Ground Floor CSE Central Lab",
      },
      {
        id: "day1-event8",
        time: "17:00",
        displayTime: "5:00 PM - 06:00 PM",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Bonfire",
        description:
          "A casual evening for participants to connect, unwind, and recharge.",
        venue: "",
      },
    ],
  },
  {
    id: "day2",
    label: "Nov 13",
    events: [
      {
        id: "day2-event1",
        time: "10:00",
        displayTime: "10:00 AM - 12:30 PM",
        icon: <Laptop className="h-auto sm:w-8" />,
        sessionType: "workshop",
        title:
          "Beyond AI Agents: Building Multi-Agent Systems with Microsoft Agent Framework",
        description:
          "Explore Microsoft's Agent Framework to build collaborative AI agents. Learn about agent creation, tool integration, orchestration, workflows, memory, and state management using Python and .NET.",
        speaker: "Vasudevan Badiadka",
        role: "Software Engineer II at Microsoft",
        venue: "Gallery Classroom",
      },

      {
        id: "day2-event2",
        time: "10:00",
        displayTime: "10:00 AM - 05:00 PM",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Arena of Ares (BGMI)",
        description:
          "A BGMI gaming tournament open to participants throughout the day.",
        venue: "CAED and CIM Lab",
      },

      {
        id: "day2-event3",
        time: "13:30",
        displayTime: "1:30 PM - 4:00 PM",
        icon: <Laptop className="h-auto sm:w-8" />,
        sessionType: "workshop",
        title:
          "Engineering Foundations for the AI Era: Systems Thinking, Harness Engineering & Agentic Development",
        description: "",
        speaker: "Prashant Joshi",
        role: "Senior Software Engineer at Vinyl Equity",
        venue: "Gallery Classroom",
      },
      {
        id: "day2-event4",
        time: "16:00",
        displayTime: "4:00 PM",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Concert Night",
        description:
          "A live music evening for participants to unwind and celebrate the spirit of DevHost",
        venue: "",
      },
    ],
  },
  {
    id: "day3",
    label: "Nov 14",
    events: [
      {
        id: "day3-event1",
        time: "03:00",
        displayTime: "3:00 AM",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Hackathon Wind-Up",
        description:
          "Final hours for teams to wrap up their builds before judging begins.",
        venue: "Skill Labs",
      },
      {
        id: "day3-event2",
        time: "09:00",
        displayTime: "9:00 AM Onwards",
        icon: <Flame className="h-auto sm:w-8" />,
        title: "Hackathon Judging Begins",
        description: "Teams present their projects to a panel of judges.",
        venue: "",
      },

      // {
      //   id: "day3-event3",
      //   time: "09:30",
      //   displayTime: "9:30 AM",
      //   icon: <MicVocal className="h-auto sm:w-8" />,
      //   title: "DevTalk starts",
      //   description: "Technical talks and knowledge sessions.",
      //   venue: "Ground Floor Seminar Hall",
      // },

      {
        id: "day3-event3.1",
        displayTime: "9:30 AM - 10:10 AM",
        icon: <MicVocal className="h-auto sm:w-8" />,
        sessionType: "devtalk",
        title: "AWS WAF",
        description:
          "Explore how AWS Web Application Firewall (WAF) protects web applications from common attacks and malicious traffic. Learn about Web ACLs, managed rules, AWS integrations, and practical security best practices.",
        speaker: "Shamitha Shetty",
        role: "Cloud Support Engineer I at Amazon Web Services (AWS)",
        venue: "Ground Floor Seminar Hall",
      },

      {
        id: "day3-event3.2",
        displayTime: "10:15 AM - 10:55 AM",
        icon: <MicVocal className="h-auto sm:w-8" />,
        sessionType: "devtalk",
        title: "From Prompts to Production: Building a Software Career with AI",
        description: "",
        speaker: "Muaaz Musthafa",
        role: "Software Developer III | Full Stack Developer at EG India",
        venue: "Ground Floor Seminar Hall",
      },

      {
        id: "day3-event3.3",
        displayTime: "11:00 AM - 11:40 AM",
        icon: <MicVocal className="h-auto sm:w-8" />,
        sessionType: "devtalk",
        title:
          "Build Your First AI-Powered Application in 60 Minutes — From LLM APIs to RAG",
        description:
          "Build an AI-powered application that reads documents, answers questions, and avoids making up information. Explore prompting, structured outputs, embeddings, and Retrieval-Augmented Generation (RAG) through hands-on coding.",
        speaker: "Adarsh Shetty",
        role: "Software Developer at CodeCraft Technologies Pvt. Ltd.",
        venue: "Ground Floor Seminar Hall",
      },

      // {
      //   id: "day3-event3.4",
      //   displayTime: "11:45 AM - 12:25 PM",
      //   icon: <MicVocal className="h-auto sm:w-8" />,
      //   title: "",
      //   description: "",
      //   speaker: "Basavarajeshwari (Sony) Ambi",
      //   role: "Product Manager at Masai",
      //   venue: "Ground Floor Seminar Hall",
      // },

      {
        id: "day3-event4",
        time: "14:30",
        displayTime: "2:30 PM Onwards",
        icon: <MicVocal className="h-auto sm:w-8" />,
        title: "Hackathon Valedictory",
        description:
          "Closing ceremony to celebrate the builders, honor the winners, and bring DevHost 2026 to a close.",
        venue: "",
      },
      //{
      //  id: "day3-event5",
      //  time: "15:30",
      //  displayTime: "2:30 PM - 04:00 PM",
      //  icon: <MicVocal className="h-auto sm:w-8" />,
      //  title: "DevTalk ends",
      // description: "",
      //  venue: "Shashikiran Auditorium",
      //},
    ],
  },
];
