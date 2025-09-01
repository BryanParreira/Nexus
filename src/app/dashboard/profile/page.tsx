"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useId } from "react";
import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiCalendarLine,
  RiEditLine,
  RiSaveLine,
  RiCloseLine,
} from "@remixicon/react";
import { CheckIcon, ImagePlusIcon, XIcon } from "lucide-react";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Sample user data - replace with your actual user data source
const userData = {
  name: "Mark Bannert",
  email: "mark@bannert.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "January 2024",
  bio: "Product designer and developer with a passion for creating intuitive user experiences. I love working on innovative projects that solve real-world problems.",
  avatar: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp3/user_itiiaq.png",
  role: "Product Designer",
  department: "Design Team",
  skills: ["UI/UX Design", "React", "TypeScript", "Figma", "Product Strategy"],
};

// Initial image files for the dialog
const initialBgImage = [
  {
    name: "profile-bg.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: "/profile-bg.jpg",
    id: "profile-bg-123456789",
  },
];

const initialAvatarImage = [
  {
    name: "avatar-72-01.jpg",
    size: 1528737,
    type: "image/jpeg",
    url: userData.avatar,
    id: "avatar-123456789",
  },
];

// Profile Background Component for Dialog
function ProfileBg() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
      initialFiles: initialBgImage,
    });

  const currentImage = files[0]?.preview || null;

  return (
    <div className="h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {currentImage && (
          <img
            className="size-full object-cover"
            src={currentImage}
            alt={
              files[0]?.preview
                ? "Preview of uploaded image"
                : "Default profile background"
            }
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
            onClick={openFileDialog}
            aria-label={currentImage ? "Change image" : "Upload image"}
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
      />
    </div>
  );
}

// Avatar Component for Dialog
function AvatarUpload() {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    initialFiles: initialAvatarImage,
  });

  const currentImage = files[0]?.preview || null;

  return (
    <div className="-mt-10 px-6">
      <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
        {currentImage && (
          <img
            src={currentImage}
            className="size-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
          onClick={openFileDialog}
          aria-label="Change profile picture"
        >
          <ImagePlusIcon size={16} aria-hidden="true" />
        </button>
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}

// Edit Profile Dialog Component
function EditProfileDialog({ 
  children, 
  userData, 
  onSave 
}: { 
  children: React.ReactNode;
  userData: any;
  onSave: (data: any) => void;
}) {
  const id = useId();
  const [isOpen, setIsOpen] = React.useState(false);
  
  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: userData.bio,
  });

  const [formData, setFormData] = React.useState({
    firstName: userData.name.split(' ')[0] || '',
    lastName: userData.name.split(' ').slice(1).join(' ') || '',
    username: userData.name.toLowerCase().replace(' ', '-'),
    website: 'www.example.com',
    bio: userData.bio,
  });

  const handleSave = () => {
    const updatedData = {
      ...userData,
      name: `${formData.firstName} ${formData.lastName}`,
      bio: value,
    };
    onSave(updatedData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>
        <div className="overflow-y-auto">
          <ProfileBg />
          <AvatarUpload />
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>First name</Label>
                  <Input
                    id={`${id}-first-name`}
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    type="text"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Last name</Label>
                  <Input
                    id={`${id}-last-name`}
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-username`}>Username</Label>
                <div className="relative">
                  <Input
                    id={`${id}-username`}
                    className="peer pe-9"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    type="text"
                    required
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                    <CheckIcon
                      size={16}
                      className="text-emerald-500"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-website`}>Website</Label>
                <div className="flex rounded-md shadow-xs">
                  <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                    https://
                  </span>
                  <Input
                    id={`${id}-website`}
                    className="-ms-px rounded-s-none shadow-none"
                    placeholder="yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    type="text"
                  />
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-bio`}>Biography</Label>
                <Textarea
                  id={`${id}-bio`}
                  placeholder="Write a few sentences about yourself"
                  value={value}
                  maxLength={maxLength}
                  onChange={handleChange}
                  aria-describedby={`${id}-description`}
                />
                <p
                  id={`${id}-description`}
                  className="text-muted-foreground mt-2 text-right text-xs"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums">{limit - characterCount}</span>{" "}
                  characters left
                </p>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState(userData);

  const handleDialogSave = (updatedData: any) => {
    setFormData(updatedData);
    console.log("Saving profile data from dialog:", updatedData);
    // Here you would typically save the data to your backend
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <EditProfileDialog userData={formData} onSave={handleDialogSave}>
          <Button variant="outline" size="sm">
            <RiEditLine className="size-4 mr-2" />
            Edit Profile
          </Button>
        </EditProfileDialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="size-24">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback className="text-lg">
                  {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{formData.name}</CardTitle>
            <CardDescription>{formData.role}</CardDescription>
            <div className="flex justify-center mt-2">
              <Badge variant="secondary">{formData.department}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <RiMailLine className="size-4 text-muted-foreground" />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RiPhoneLine className="size-4 text-muted-foreground" />
              <span>{formData.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RiMapPinLine className="size-4 text-muted-foreground" />
              <span>{formData.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RiCalendarLine className="size-4 text-muted-foreground" />
              <span>Joined {formData.joinDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Your profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="px-3 py-2 bg-muted/50 rounded-md">{formData.name}</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="px-3 py-2 bg-muted/50 rounded-md">{formData.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="px-3 py-2 bg-muted/50 rounded-md">{formData.phone}</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="px-3 py-2 bg-muted/50 rounded-md">{formData.location}</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <div className="px-3 py-2 bg-muted/50 rounded-md min-h-[100px]">
                {formData.bio}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}