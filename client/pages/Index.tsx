import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Download,
  Users,
  BookOpen,
  Star,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Project, ProjectStatsResponse, ProjectsResponse } from "@shared/api";

export default function Index() {
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState([
    { label: "Total Projects", value: "0", icon: BookOpen },
    { label: "Active Students", value: "0", icon: Users },
    { label: "Total Views", value: "0", icon: Download },
    { label: "Years Active", value: "22", icon: Calendar },
  ]);
  const [yearStats, setYearStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentProjects();
    fetchProjectStats();
  }, []);

  const fetchRecentProjects = async () => {
    try {
      const response = await fetch("/api/projects?limit=3&sortBy=recent");
      const data: ProjectsResponse = await response.json();
      if (data.success) {
        setRecentProjects(data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch recent projects:", error);
    }
  };

  const fetchProjectStats = async () => {
    try {
      const response = await fetch("/api/projects/stats");
      const data: ProjectStatsResponse = await response.json();
      if (data.success) {
        setStats([
          {
            label: "Total Projects",
            value: data.stats.total.toString(),
            icon: BookOpen,
          },
          {
            label: "Active Students",
            value: Object.keys(data.stats.byDepartment).length.toString(),
            icon: Users,
          },
          {
            label: "Total Views",
            value: data.stats.totalViews?.toString() || "0",
            icon: Download,
          },
          { label: "Years Active", value: "22", icon: Calendar },
        ]);
        setYearStats(data.stats.byYear);
      }
    } catch (error) {
      console.error("Failed to fetch project stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F348b0cf0cd1044f492a3a092345ae992%2F0f1c1f69ae12496285f964f5ac1b8373?format=webp&width=800"
                alt="RCEW Logo"
                className="w-16 h-16 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  RCEW Project Bank
                </h1>
                <p className="text-sm text-gray-600">
                  Rajasthan College of Engineering for Women
                </p>
                <p className="text-xs text-red-600 font-medium">
                  Established 2002
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/browse"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Browse Projects
              </Link>
              <Link
                to="/upload"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Upload Project
              </Link>
              <a
                href="https://www.rcew.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                About
              </a>
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link to="/login">Sign In</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F348b0cf0cd1044f492a3a092345ae992%2F0f1c1f69ae12496285f964f5ac1b8373?format=webp&width=800"
              alt="RCEW Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Empowering Innovation Through
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              {" "}
              Shared Knowledge
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-2 leading-relaxed">
            Discover, share, and collaborate on cutting-edge projects from
            brilliant minds at Rajasthan College of Engineering for Women.
          </p>
          <p className="text-lg text-red-600 font-medium mb-8">
            Building tomorrow's technology since 2002
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <Link to="/browse">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Projects
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              <Link to="/upload">
                <Upload className="w-5 h-5 mr-2" />
                Share Your Project
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the most innovative and impactful projects from our
            talented students across different years
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/60 backdrop-blur-sm group"
              >
                <CardHeader>
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : recentProjects.length > 0 ? (
            recentProjects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/60 backdrop-blur-sm group"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-red-100 text-red-700"
                    >
                      {project.department}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-red-200"
                      >
                        {project.year}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {project.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-red-600 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription>by {project.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Download className="w-4 h-4" />
                      {project.views} views
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <Link to={`/project/${project.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-600">
                No projects available yet. Be the first to upload a project!
              </p>
              <Button asChild className="mt-4 bg-red-600 hover:bg-red-700">
                <Link to="/upload">Upload Your Project</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/80 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose RCEW Project Bank?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform designed to foster innovation and
              collaboration among engineering students since 2002
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Upload
              </h3>
              <p className="text-gray-600">
                Share your projects effortlessly with detailed documentation,
                source code, and multimedia files
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Year-wise Organization
              </h3>
              <p className="text-gray-600">
                Browse projects by academic year and track the evolution of
                innovation at RCEW
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Recognition
              </h3>
              <p className="text-gray-600">
                Get recognized for your innovative work and build your academic
                portfolio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Year-wise Projects Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Projects by Year
          </h2>
          <p className="text-gray-600">
            Explore the evolution of innovation at RCEW
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(yearStats).length > 0
            ? Object.entries(yearStats)
                .sort(([a], [b]) => b.localeCompare(a))
                .slice(0, 4)
                .map(([year, count]) => (
                  <Card
                    key={year}
                    className="text-center hover:shadow-lg transition-all cursor-pointer border-0 shadow-md bg-white/60 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-red-600 mb-2">
                        {year}
                      </div>
                      <div className="text-sm text-gray-600">
                        {count} Projects
                      </div>
                    </CardContent>
                  </Card>
                ))
            : [...Array(4)].map((_, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all cursor-pointer border-0 shadow-md bg-white/60 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-8 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Share Your Innovation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of students who are already showcasing their projects
            and inspiring the next generation of engineers at RCEW
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <Link to="/register">
                <Users className="w-5 h-5 mr-2" />
                Create Account
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              <Link to="/upload">
                <Upload className="w-5 h-5 mr-2" />
                Upload Your Project
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F348b0cf0cd1044f492a3a092345ae992%2F0f1c1f69ae12496285f964f5ac1b8373?format=webp&width=800"
                  alt="RCEW Logo"
                  className="w-12 h-12 object-contain filter brightness-0 invert"
                />
                <div>
                  <span className="font-bold text-lg">RCEW Project Bank</span>
                  <p className="text-xs text-gray-400">Established 2002</p>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering the next generation of women engineers through shared
                knowledge and innovation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-white transition-colors"
                  >
                    Browse Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/upload"
                    className="hover:text-white transition-colors"
                  >
                    Upload Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="hover:text-white transition-colors"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/years"
                    className="hover:text-white transition-colors"
                  >
                    By Year
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Student Portal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Create Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-white transition-colors"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-projects"
                    className="hover:text-white transition-colors"
                  >
                    My Projects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">College</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="https://www.rcew.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    About RCEW
                  </a>
                </li>
                <li>
                  <Link
                    to="/departments"
                    className="hover:text-white transition-colors"
                  >
                    Departments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faculty"
                    className="hover:text-white transition-colors"
                  >
                    Faculty
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Rajasthan College of Engineering for Women. All rights
              reserved. | Established 2002
              <br />
              Made by Gunjan Singla
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
