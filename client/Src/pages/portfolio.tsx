import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Code, 
  Smartphone, 
  Database,
  Briefcase,
  GraduationCap,
  University,
  School,
  Linkedin,
  Github,
  Twitter,
  Send,
  Menu,
  X
} from "lucide-react";
import profilePhoto from "@/assets/photo (2).png";

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // Active navigation highlighting
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('[data-nav-link]');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 200) {
          current = section.getAttribute('id') || '';
        }
      });
      
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
          link.classList.add('text-primary');
        } else {
          link.classList.remove('text-primary');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-slate-800">
              Rohit Yadav
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} data-nav-link href="#home" className="text-slate-600 hover:text-primary transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} data-nav-link href="#about" className="text-slate-600 hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollToSection('skills')} data-nav-link href="#skills" className="text-slate-600 hover:text-primary transition-colors">Skills</button>
              <button onClick={() => scrollToSection('experience')} data-nav-link href="#experience" className="text-slate-600 hover:text-primary transition-colors">Experience</button>
              <button onClick={() => scrollToSection('education')} data-nav-link href="#education" className="text-slate-600 hover:text-primary transition-colors">Education</button>
              <button onClick={() => scrollToSection('portfolio')} data-nav-link href="#portfolio" className="text-slate-600 hover:text-primary transition-colors">Portfolio</button>
              <button onClick={() => scrollToSection('contact')} data-nav-link href="#contact" className="text-slate-600 hover:text-primary transition-colors">Contact</button>
            </div>
            <button 
              className="md:hidden text-slate-600 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-2 space-y-1">
              <button onClick={() => scrollToSection('home')} className="block py-2 text-slate-600 hover:text-primary w-full text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="block py-2 text-slate-600 hover:text-primary w-full text-left">About</button>
              <button onClick={() => scrollToSection('skills')} className="block py-2 text-slate-600 hover:text-primary w-full text-left">Skills</button>
              <button onClick={() => scrollToSection('experience')} className="block py-2 text-slate-600 hover:text-primary w-full text-left">Experience</button>
              <button onClick={() => scrollToSection('education')} className="block py-2 text-slate-600 hover:text-primary w-full text-left">Education</button>
              <button onClick={() => scrollToSection('portfolio')} className="block py-2 text-slate-600 hover:text-primary w-full text-left">Portfolio</button>
              <button onClick={() => scrollToSection('contact')} className="block py-2 text-slate-600 hover:text-primary w-full text-left">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Photo */}
      <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Hi, I'm <span className="text-blue-400">Rohit Yadav</span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-300 mb-4">Full Stack Developer</p>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl">
                Passionate developer with 6 months of experience building modern web applications. 
                Specializing in React, Node.js, and full-stack development with a focus on creating 
                exceptional user experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
                <Button onClick={() => scrollToSection('portfolio')} variant="outline" className="border-slate-400 hover:bg-white hover:text-slate-900 text-white px-8 py-3 rounded-lg font-medium transition-all">
                  <Code className="w-4 h-4 mr-2" />
                  View My Work
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={profilePhoto} 
                    alt="Rohit Yadav" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">About Me</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A dedicated developer passionate about creating innovative solutions and continuously learning new technologies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-6">Professional Journey</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Currently pursuing B.Tech from Babu Banarasi Das University, Lucknow, I've gained valuable 
                industry experience working at alka.tech Pvt.Ltd. My educational foundation from Ayodhya, 
                combined with hands-on development experience, has shaped me into a well-rounded developer.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                I specialize in full-stack development with expertise in modern web technologies. My goal is 
                to create efficient, scalable, and user-friendly applications that solve real-world problems.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-slate-600">
                  <MapPin className="text-primary w-4 h-4 mr-2" />
                  <span>Lucknow, India</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <GraduationCap className="text-primary w-4 h-4 mr-2" />
                  <span>B.Tech Student</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Briefcase className="text-primary w-4 h-4 mr-2" />
                  <span>6 Months Experience</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">6+</div>
                  <div className="text-slate-600">Months Experience</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">8+</div>
                  <div className="text-slate-600">Technologies</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">10+</div>
                  <div className="text-slate-600">Projects Built</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-slate-600">Dedication</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Technical Skills</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Proficient in modern web development technologies with hands-on experience in full-stack development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend Skills */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Code className="text-orange-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">HTML5</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">CSS3</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">JavaScript</span>
                  <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">React</span>
                </div>
              </CardContent>
            </Card>

            {/* Backend Skills */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Database className="text-green-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">Node.js</span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">Next.js</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">Django</span>
                </div>
              </CardContent>
            </Card>

            {/* Database Skills */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Database className="text-green-600 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">Database</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform">MongoDB</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Proficiency */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-slate-900 mb-8 text-center">Proficiency Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  { skill: "JavaScript", level: 85 },
                  { skill: "React", level: 80 },
                  { skill: "Node.js", level: 75 },
                  { skill: "Next.js", level: 70 }
                ].map(({ skill, level }) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-700 font-medium">{skill}</span>
                      <span className="text-slate-500">{level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  { skill: "HTML/CSS", level: 90 },
                  { skill: "MongoDB", level: 75 },
                  { skill: "Django", level: 65 }
                ].map(({ skill, level }) => (
                  <div key={skill}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-700 font-medium">{skill}</span>
                      <span className="text-slate-500">{level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Experience</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              My professional journey and contributions to the tech industry.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-primary/20"></div>
              
              {/* Experience Item */}
              <div className="relative flex items-start mb-8">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <Briefcase className="text-white w-6 h-6" />
                </div>
                <Card className="ml-6 flex-1 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-900">Software Developer</h3>
                      <span className="text-primary font-medium">6 Months</span>
                    </div>
                    <p className="text-primary font-medium mb-2">alka.tech Pvt.Ltd.</p>
                    <p className="text-slate-600 mb-4">
                      Gained hands-on experience in full-stack web development, working with modern technologies 
                      and contributing to various client projects. Developed proficiency in React, Node.js, 
                      and database management while collaborating with experienced developers.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React</span>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Node.js</span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">MongoDB</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Current Status */}
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <GraduationCap className="text-white w-6 h-6" />
                </div>
                <Card className="ml-6 flex-1 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-slate-900">Current Status</h3>
                      <span className="text-green-600 font-medium">Present</span>
                    </div>
                    <p className="text-green-600 font-medium mb-2">Actively Seeking Opportunities</p>
                    <p className="text-slate-600">
                      Currently pursuing B.Tech and looking for new opportunities to apply my skills 
                      and continue growing as a developer. Open to full-time positions, internships, 
                      and freelance projects.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Education</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              My academic journey and educational background that laid the foundation for my career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* University Education */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <University className="text-blue-600 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Bachelor of Technology</h3>
                    <p className="text-slate-600">Currently Pursuing</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-600">
                    <School className="text-primary w-5 h-5 mr-3" />
                    <span>Babu Banarasi Das University</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="text-primary w-5 h-5 mr-3" />
                    <span>Lucknow, Uttar Pradesh</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <GraduationCap className="text-primary w-5 h-5 mr-3" />
                    <span>In Progress</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-slate-700 text-sm">
                    Pursuing a comprehensive computer science curriculum with focus on 
                    software engineering, data structures, algorithms, and modern web technologies.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* School Education */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <GraduationCap className="text-green-600 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">School Education</h3>
                    <p className="text-slate-600">Completed</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-slate-600">
                    <School className="text-primary w-5 h-5 mr-3" />
                    <span>School in Ayodhya</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="text-primary w-5 h-5 mr-3" />
                    <span>Ayodhya, Uttar Pradesh</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <GraduationCap className="text-primary w-5 h-5 mr-3" />
                    <span>Completed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-slate-700 text-sm">
                    Completed foundational education with strong academic performance, 
                    developing critical thinking and problem-solving skills that form 
                    the basis of my technical abilities.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Portfolio</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A showcase of my projects and development work. More projects coming soon!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Placeholders */}
            {[
              {
                icon: <Code className="w-8 h-8" />,
                title: "React Web App",
                description: "Modern web application built with React and Node.js featuring user authentication and real-time data.",
                tags: ["React", "Node.js", "MongoDB"]
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Next.js Project", 
                description: "Full-stack application using Next.js with server-side rendering and optimized performance.",
                tags: ["Next.js", "JavaScript", "CSS"]
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: "Django Backend",
                description: "RESTful API backend service built with Django, featuring authentication and data management.",
                tags: ["Django", "Python", "REST API"]
              }
            ].map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-dashed border-slate-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-slate-400">{project.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className={`px-2 py-1 rounded text-sm ${
                        tag === 'React' ? 'bg-blue-100 text-blue-800' :
                        tag === 'Node.js' ? 'bg-green-100 text-green-800' :
                        tag === 'MongoDB' ? 'bg-purple-100 text-purple-800' :
                        tag === 'Next.js' ? 'bg-gray-100 text-gray-800' :
                        tag === 'JavaScript' ? 'bg-yellow-100 text-yellow-800' :
                        tag === 'CSS' ? 'bg-blue-100 text-blue-800' :
                        tag === 'Django' ? 'bg-green-100 text-green-800' :
                        tag === 'Python' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">Coming Soon</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6">
              I'm constantly working on new projects and adding to my portfolio. 
              Check back soon for updates on my latest work!
            </p>
            <Button onClick={() => scrollToSection('contact')} className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              Let's Discuss Your Project
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              I'm always interested in discussing new opportunities and collaborating on exciting projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Whether you're looking for a dedicated developer, have a project in mind, 
                or just want to say hello, I'd love to hear from you. Let's create something amazing together!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <Mail className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-slate-300">cse4096@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <Phone className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-slate-300">+91 9565314883</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-slate-300">Lucknow, Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/rohit-yadav-46390a245/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="text-white w-5 h-5" />
                  </a>
                  <a 
                    href="https://github.com/ry538663" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Github className="text-white w-5 h-5" />
                  </a>
                  <a 
                    href="https://x.com/Rohitya44743290" 
                    target="_blank" 
                    rel="noopener noreferrer"
                   className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors">
                    <Twitter className="text-white w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-slate-400"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-slate-400"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-slate-400"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-slate-400 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  {contactMutation.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-2">© 2024 Rohit Yadav. All rights reserved.</p>
            <p className="text-sm">Built with React, Node.js and lots of ☕</p>
          </div>
        </div>
      </footer>
    </div>
  );
}