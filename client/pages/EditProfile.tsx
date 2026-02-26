import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  User,
  Mail,
  IdCard,
  Building,
  Calendar,
  Camera,
  Save,
  Github,
  Mail as AtSign,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { UserProfile } from "@/components/UserProfile";
import { apiFetch } from "@/lib/api";

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    githubId: user?.githubId || "",
    gmailId: user?.gmailId || "",
    department: user?.department || "",
    semester: user?.semester || "",
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please sign in to edit your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-red-600 hover:bg-red-700">
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate required fields
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.email.trim()
      ) {
        toast({
          title: "Validation Error",
          description: "First name, last name, and email are required",
          variant: "destructive",
        });
        return;
      }

      // In a real app, this would be an API call to update the user
      const response = await apiFetch("/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update user in auth context
          updateUser(data.user);
          toast({
            title: "Profile Updated",
            description: "Your profile has been updated successfully",
          });
          navigate("/profile");
        } else {
          throw new Error(data.message);
        }
      } else {
        // Fallback: update locally for demo
        const updatedUser = { ...user, ...formData };
        updateUser(updatedUser);
        toast({
          title: "Profile Updated",
          description: "Profile updated locally (API not available)",
        });
        navigate("/profile");
      }
    } catch (error) {
      // Fallback: update locally for demo
      const updatedUser = { ...user, ...formData };
      updateUser(updatedUser);
      toast({
        title: "Profile Updated",
        description: "Profile updated locally",
      });
      navigate("/profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadingPhoto(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;

        try {
          const response = await apiFetch("/api/auth/upload-photo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ photo: base64 }),
          });

          const data = await response.json();

          if (data.success) {
            updateUser(data.user);
            toast({
              title: "Photo Updated",
              description: "Your profile photo has been updated successfully",
            });
          } else {
            throw new Error(data.message);
          }
        } catch (apiError) {
          const updatedUser = { ...user, profilePhoto: base64 };
          updateUser(updatedUser);
          toast({
            title: "Photo Updated",
            description: "Photo saved locally. Upload to server failed.",
          });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to update profile photo",
        variant: "destructive",
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F348b0cf0cd1044f492a3a092345ae992%2F0f1c1f69ae12496285f964f5ac1b8373?format=webp&width=800"
                  alt="RCEW Logo"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    RCEW Project Bank
                  </h1>
                  <p className="text-sm text-gray-600">Edit Profile</p>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/profile"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1 inline" />
                Back to Profile
              </Link>
              <Link
                to="/upload"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Upload Project
              </Link>
              <UserProfile />
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Edit Profile
          </h1>
          <p className="text-gray-600">
            Update your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Photo Section */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profile Photo</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage
                      src={user.profilePhoto}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <AvatarFallback className="bg-red-600 text-white text-2xl">
                      {getInitials(user.firstName, user.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={uploadingPhoto}
                  />
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={uploadingPhoto}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {uploadingPhoto ? "Uploading..." : "Change Photo"}
                  </Button>
                </label>

                <p className="text-xs text-gray-500 mt-2">
                  Max size: 5MB. Formats: JPG, PNG, GIF
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your account details and academic information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="pl-10"
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="pl-10"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="githubId">GitHub Username</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="githubId"
                        value={formData.githubId}
                        onChange={(e) =>
                          handleInputChange("githubId", e.target.value)
                        }
                        className="pl-10"
                        placeholder="GitHub username (optional)"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gmailId">Gmail ID</Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="gmailId"
                        type="email"
                        value={formData.gmailId}
                        onChange={(e) =>
                          handleInputChange("gmailId", e.target.value)
                        }
                        className="pl-10"
                        placeholder="Gmail address (optional)"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        handleInputChange("department", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cse">
                          Computer Science Engineering
                        </SelectItem>
                        <SelectItem value="it">
                          Information Technology
                        </SelectItem>
                        <SelectItem value="ece">
                          Electronics & Communication Engineering
                        </SelectItem>
                        <SelectItem value="eee">
                          Electrical & Electronics Engineering
                        </SelectItem>
                        <SelectItem value="me">
                          Mechanical Engineering
                        </SelectItem>
                        <SelectItem value="ce">Civil Engineering</SelectItem>
                        <SelectItem value="che">
                          Chemical Engineering
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Current Semester</Label>
                    <Select
                      value={formData.semester}
                      onValueChange={(value) =>
                        handleInputChange("semester", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Semester</SelectItem>
                        <SelectItem value="2">2nd Semester</SelectItem>
                        <SelectItem value="3">3rd Semester</SelectItem>
                        <SelectItem value="4">4th Semester</SelectItem>
                        <SelectItem value="5">5th Semester</SelectItem>
                        <SelectItem value="6">6th Semester</SelectItem>
                        <SelectItem value="7">7th Semester</SelectItem>
                        <SelectItem value="8">8th Semester</SelectItem>
                        <SelectItem value="alumni">Alumni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-red-600 hover:bg-red-700 flex-1"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    <Link to="/profile">Cancel</Link>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Note</h4>
                  <p className="text-sm text-blue-800">
                    Roll number and core academic information cannot be changed.
                    Contact administration for major changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
