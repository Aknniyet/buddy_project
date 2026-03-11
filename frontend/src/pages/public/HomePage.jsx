import PublicLayout from "../../layouts/PublicLayout";
import "../../styles/home.css";

import {
  Users,
  MessageSquare,
  CheckCircle,
  Globe,
  Calendar,
  Shield,
  UserPlus,
  Search,
  MessagesSquare,
  Handshake,
  Star,
} from "lucide-react";

function HomePage() {
  const features = [
    {
      icon: Users,
      title: "Smart Matching",
      text: "Our system helps match international students with buddies based on interests, language, and study background.",
    },
    {
      icon: MessageSquare,
      title: "Direct Messaging",
      text: "Students can communicate directly with their buddy and ask questions about study, city life, and university.",
    },
    {
      icon: CheckCircle,
      title: "Adaptation Tracking",
      text: "Use a simple checklist to track important steps like registration, transport, banking, and daily life tasks.",
    },
    {
      icon: Globe,
      title: "Cultural Exchange",
      text: "Learn more about Kazakhstan, local traditions, and student life while building meaningful friendships.",
    },
    {
      icon: Calendar,
      title: "Event Planning",
      text: "Join activities and meetings with other students to feel more connected to the university community.",
    },
    {
      icon: Shield,
      title: "Verified Students",
      text: "All buddies are verified university students, which makes the platform safer and more trustworthy.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Your Profile",
      text: "Sign up and fill in your profile with your interests, language skills, and the support you need.",
    },
    {
      number: "02",
      icon: Search,
      title: "Find Your Buddy",
      text: "Browse buddy profiles or let the system help you find a suitable match.",
    },
    {
      number: "03",
      icon: MessagesSquare,
      title: "Start Communication",
      text: "Send a request, get accepted, and begin chatting with your buddy directly on the platform.",
    },
    {
      number: "04",
      icon: Handshake,
      title: "Meet and Adapt",
      text: "Get support with documents, daily life, campus navigation, and social integration.",
    },
  ];

  const testimonials = [
    {
      name: "Yuki Tanaka",
      role: "International Student from Japan",
      text: "My buddy helped me with everyday things like transport, banking, and understanding university life. I felt much more confident in my first weeks.",
    },
    {
      name: "Arman Tulegenov",
      role: "Local Student Buddy",
      text: "Being a buddy helped me meet amazing people from other countries and share our culture with them. It was a very rewarding experience.",
    },
    {
      name: "Carlos Silva",
      role: "International Student from Brazil",
      text: "The adaptation checklist and direct communication with my buddy made everything easier. I always knew what step to do next.",
    },
  ];

  return (
    <PublicLayout>
      <div className="home-page">
        <section className="hero-section">
          <div className="container hero-content">
            <div className="hero-left">
              <div className="hero-badge">Connecting Students in Kazakhstan</div>

              <h1 className="hero-title">
                Your Journey
                <br />
                Starts with a <span>Friend</span>
              </h1>

              <p className="hero-description">
                BuddyConnect helps international students adapt to university
                life in Kazakhstan by connecting them with local student buddies
                for guidance, support, and friendship.
              </p>

              <div className="hero-buttons">
                <button className="primary-btn">Get Started</button>
                <button className="secondary-btn">Learn More</button>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-card-bg"></div>

              <div className="match-card">
                <div className="match-card-header">
                  <h3>Perfect Match Found!</h3>
                  <p>Based on your interests and profile</p>
                </div>

                <div className="match-profile">
                  <div className="match-avatar">A</div>

                  <div className="match-info">
                    <h4>Aigerim S.</h4>
                    <p>Computer Science, Almaty</p>
                  </div>
                </div>

                <div className="match-tags">
                  <span>Photography</span>
                  <span>Hiking</span>
                  <span>Cooking</span>
                </div>

                <button className="match-btn">View Profile</button>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>Everything You Need to Settle In</h2>
              <p>
                BuddyConnect provides the tools and support that help students
                feel welcome, safe, and connected from the very beginning.
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div className="feature-card" key={index}>
                    <div className="feature-icon">
                      <Icon size={28} />
                    </div>

                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="container">
            <div className="section-header">
              <h2>How It Works</h2>
              <p>
                Getting started is simple. Follow these steps to find your buddy
                and begin your journey.
              </p>
            </div>

            <div className="steps-grid">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div className="step-card" key={index}>
                      
                      <div className="step-icon-wrapper">
                        <div className="step-icon">
                          <Icon size={26} />
                        </div>

                        <span className="step-number">{step.number}</span>
                      </div>

                      <h3>{step.title}</h3>
                      <p>{step.text}</p>

                    </div>
                  );
                })}
              </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2>What Our Students Say</h2>
              <p>
                Hear from students who used BuddyConnect to make their first
                months at university easier and more enjoyable.
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((item, index) => (
                <div className="testimonial-card" key={index}>
                  <div className="stars">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                  </div>

                  <p className="testimonial-text">“{item.text}”</p>

                  <div className="testimonial-user">
                    <div className="testimonial-avatar">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container cta-content">
            <h2>Ready to Find Your Buddy?</h2>
            <p>
              Join BuddyConnect today and start building friendships that make
              your university journey easier, warmer, and more memorable.
            </p>

            <div className="cta-buttons">
              <button className="cta-primary">I’m an International Student</button>
              <button className="cta-secondary">I Want to Be a Buddy</button>
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
}

export default HomePage;