// app/dashboard/settings/page.tsx
"use client";

import { useState, useId, useRef, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { 
  Save,
  X,
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Camera,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Monitor,
  Volume2,
  Smartphone,
  ArrowRight,
  Key,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Calendar,
  AlertTriangle,
  CircleAlertIcon,
  StoreIcon,
  RefreshCcwIcon,
  ImagePlusIcon,
  CheckIcon
} from "lucide-react";

const settingsCategories = [
  {
    id: "profile",
    title: "Profile",
    icon: User,
    description: "Manage your personal information"
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Configure your notification preferences"
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: Shield,
    description: "Manage your account security"
  },
  {
    id: "appearance",
    title: "Appearance",
    icon: Palette,
    description: "Customize your interface"
  },
  {
    id: "billing",
    title: "Billing",
    icon: CreditCard,
    description: "Manage your subscription and billing"
  }
];

const Toggle = ({ checked, onToggle, disabled = false }) => (
  <button
    onClick={onToggle}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      checked ? 'bg-blue-500' : 'bg-muted'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// Delete Account Confirmation Dialog
const DeleteAccountDialog = () => {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const ACCOUNT_NAME = "Jonathon Smith";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Final confirmation
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              This action cannot be undone. To confirm, please enter your full name{" "}
              <span className="text-foreground">Jonathon Smith</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Full name</Label>
            <Input
              id={id}
              type="text"
              placeholder="Type Jonathon Smith to confirm"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              className="flex-1"
              disabled={inputValue !== ACCOUNT_NAME}
            >
              Delete Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Profile Dialog
const EditProfileDialog = () => {
  const id = useId();
  const [bio, setBio] = useState("Experienced project manager with a passion for driving innovation and delivering results.");
  const maxLength = 180;
  const characterCount = bio.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="sm" 
          className="absolute -bottom-1 -right-1 w-8 h-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Camera className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set information.
        </DialogDescription>
        <div className="overflow-y-auto">
          {/* Profile Background */}
          <div className="h-32">
            <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <button
                  type="button"
                  className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                  aria-label="Upload background image"
                >
                  <ImagePlusIcon size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Avatar */}
          <div className="-mt-10 px-6">
            <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
              <button
                type="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                aria-label="Change profile picture"
              >
                <ImagePlusIcon size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-first-name`}>First name</Label>
                  <Input
                    id={`${id}-first-name`}
                    placeholder="Jonathon"
                    defaultValue="Jonathon"
                    type="text"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-last-name`}>Last name</Label>
                  <Input
                    id={`${id}-last-name`}
                    placeholder="Smith"
                    defaultValue="Smith"
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
                    defaultValue="jonathon-smith"
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
                    defaultValue="jonathon-smith.com"
                    type="text"
                  />
                </div>
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-bio`}>Biography</Label>
                <Textarea
                  id={`${id}-bio`}
                  placeholder="Write a few sentences about yourself"
                  value={bio}
                  maxLength={maxLength}
                  onChange={(e) => setBio(e.target.value)}
                  aria-describedby={`${id}-description`}
                />
                <p
                  id={`${id}-description`}
                  className="text-muted-foreground mt-2 text-right text-xs"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums">{maxLength - characterCount}</span>{" "}
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
          <DialogClose asChild>
            <Button type="button">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Change Plan Dialog
const ChangePlanDialog = () => {
  const id = useId();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <RefreshCcwIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Change your plan</DialogTitle>
            <DialogDescription className="text-left">
              Pick one of the following plans.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <RadioGroup className="gap-2" defaultValue="2">
            {/* Essential Plan */}
            <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
              <RadioGroupItem
                value="1"
                id={`${id}-1`}
                aria-describedby={`${id}-1-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-1`}>Essential</Label>
                <p
                  id={`${id}-1-description`}
                  className="text-muted-foreground text-xs"
                >
                  $9 per month
                </p>
              </div>
            </div>
            {/* Pro Plan - Current */}
            <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
              <RadioGroupItem
                value="2"
                id={`${id}-2`}
                aria-describedby={`${id}-2-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`${id}-2`}>Pro</Label>
                  <Badge variant="secondary" className="text-xs">Current</Badge>
                </div>
                <p
                  id={`${id}-2-description`}
                  className="text-muted-foreground text-xs"
                >
                  $29 per month
                </p>
              </div>
            </div>
            {/* Enterprise Plan */}
            <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
              <RadioGroupItem
                value="3"
                id={`${id}-3`}
                aria-describedby={`${id}-3-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-3`}>Enterprise</Label>
                <p
                  id={`${id}-3-description`}
                  className="text-muted-foreground text-xs"
                >
                  $99 per month
                </p>
              </div>
            </div>
          </RadioGroup>

          <div className="space-y-3">
            <p>
              <strong className="text-sm font-medium">Features include:</strong>
            </p>
            <ul className="text-muted-foreground space-y-2 text-sm">
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Create unlimited projects.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Advanced analytics and reporting.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Priority customer support.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Advanced team collaboration tools.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Custom integrations and API access.
              </li>
            </ul>
          </div>

          <div className="grid gap-2">
            <DialogClose asChild>
              <Button type="button" className="w-full">
                Change plan
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" variant="ghost" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Checkout Dialog
const CheckoutDialog = () => {
  const id = useId();
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const couponInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCouponInput && couponInputRef.current) {
      couponInputRef.current.focus();
    }
  }, [showCouponInput]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upgrade Now</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-2 flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <StoreIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Confirm and pay</DialogTitle>
            <DialogDescription className="text-left">
              Pay securely and cancel any time.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <RadioGroup className="grid-cols-2" defaultValue="yearly">
              {/* Monthly */}
              <label className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
                <RadioGroupItem
                  id="radio-monthly"
                  value="monthly"
                  className="sr-only after:absolute after:inset-0"
                />
                <p className="text-foreground text-sm font-medium">Monthly</p>
                <p className="text-muted-foreground text-sm">$29/month</p>
              </label>
              {/* Yearly */}
              <label className="border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]">
                <RadioGroupItem
                  id="radio-yearly"
                  value="yearly"
                  className="sr-only after:absolute after:inset-0"
                />
                <div className="inline-flex items-start justify-between gap-2">
                  <p className="text-foreground text-sm font-medium">Yearly</p>
                  <Badge>Popular</Badge>
                </div>
                <p className="text-muted-foreground text-sm">$290/year</p>
              </label>
            </RadioGroup>
            
            <div className="*:not-first:mt-2">
              <Label htmlFor={`name-${id}`}>Name on card</Label>
              <Input id={`name-${id}`} type="text" placeholder="Jonathon Smith" required />
            </div>
            
            <div className="*:not-first:mt-2">
              <Label>Card Details</Label>
              <div className="rounded-md shadow-xs">
                <div className="relative focus-within:z-10">
                  <Input
                    className="peer rounded-b-none pe-9 shadow-none"
                    placeholder="1234 1234 1234 1234"
                  />
                </div>
                <div className="-mt-px flex">
                  <div className="min-w-0 flex-1 focus-within:z-10">
                    <Input
                      className="rounded-e-none rounded-t-none shadow-none"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
                    <Input
                      className="rounded-s-none rounded-t-none shadow-none"
                      placeholder="CVC"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {!showCouponInput ? (
              <button
                type="button"
                onClick={() => setShowCouponInput(true)}
                className="text-sm underline hover:no-underline"
              >
                + Add coupon
              </button>
            ) : (
              <div className="*:not-first:mt-2">
                <Label htmlFor={`coupon-${id}`}>Coupon code</Label>
                <Input
                  id={`coupon-${id}`}
                  ref={couponInputRef}
                  placeholder="Enter your code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <DialogClose asChild>
            <Button type="button" className="w-full">
              Subscribe
            </Button>
          </DialogClose>
        </form>

        <p className="text-muted-foreground text-center text-xs">
          Payments are non-refundable. Cancel anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState("profile");
  const [isDirty, setIsDirty] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    setIsDirty(false);
    // Simulate save action
  };

  const handleInputChange = () => {
    setIsDirty(true);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative group">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                  J
                </AvatarFallback>
              </Avatar>
              <EditProfileDialog />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Jonathon Smith</h3>
              <p className="text-muted-foreground mb-3">Senior Project Manager at TechCorp</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified Account
                </Badge>
                <Badge variant="outline">Pro Plan</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input 
                type="text" 
                defaultValue="Jonathon"
                onChange={handleInputChange}
                className="w-full bg-background border rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input 
                type="text" 
                defaultValue="Smith"
                onChange={handleInputChange}
                className="w-full bg-background border rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="email" 
                defaultValue="jonathon.smith@techcorp.com"
                onChange={handleInputChange}
                className="w-full bg-background border rounded-lg pl-10 pr-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input 
                  type="tel" 
                  defaultValue="+1 (555) 123-4567"
                  onChange={handleInputChange}
                  className="w-full bg-background border rounded-lg pl-10 pr-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  defaultValue="San Francisco, CA"
                  onChange={handleInputChange}
                  className="w-full bg-background border rounded-lg pl-10 pr-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea 
              rows={3}
              defaultValue="Experienced project manager with a passion for driving innovation and delivering results."
              onChange={handleInputChange}
              className="w-full bg-background border rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-blue-500" />
              <div>
                <h4 className="font-medium">Export Data</h4>
                <p className="text-sm text-muted-foreground">Download all your account data</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-500" />
              <div>
                <h4 className="font-medium">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
              </div>
            </div>
            <DeleteAccountDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <h4 className="font-medium">Project Updates</h4>
              <p className="text-sm text-muted-foreground">Receive notifications about project changes</p>
            </div>
            <Toggle 
              checked={emailNotifications}
              onToggle={() => {
                setEmailNotifications(!emailNotifications);
                setIsDirty(true);
              }}
            />
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <h4 className="font-medium">Weekly Reports</h4>
              <p className="text-sm text-muted-foreground">Get weekly summary of your activity</p>
            </div>
            <Toggle 
              checked={weeklyReports}
              onToggle={() => {
                setWeeklyReports(!weeklyReports);
                setIsDirty(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <h4 className="font-medium">Security Alerts</h4>
              <p className="text-sm text-muted-foreground">Important security notifications</p>
            </div>
            <Toggle 
              checked={securityAlerts}
              onToggle={() => {
                setSecurityAlerts(!securityAlerts);
                setIsDirty(true);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-emerald-500" />
              <div>
                <h4 className="font-medium">Mobile Notifications</h4>
                <p className="text-sm text-muted-foreground">Get push notifications on your device</p>
              </div>
            </div>
            <Toggle 
              checked={pushNotifications}
              onToggle={() => {
                setPushNotifications(!pushNotifications);
                setIsDirty(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-purple-500" />
              <div>
                <h4 className="font-medium">Sound Notifications</h4>
                <p className="text-sm text-muted-foreground">Play sound for important notifications</p>
              </div>
            </div>
            <Toggle 
              checked={soundNotifications}
              onToggle={() => {
                setSoundNotifications(!soundNotifications);
                setIsDirty(true);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Password & Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full bg-background border rounded-lg px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input 
                type="password" 
                placeholder="Enter new password"
                className="w-full bg-background border rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm new password"
                className="w-full bg-background border rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <Button className="w-full md:w-auto">
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <h4 className="font-medium">2FA Enabled</h4>
                <p className="text-sm text-muted-foreground">Your account is protected with 2FA</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Current Session</h4>
                  <p className="text-sm text-muted-foreground">San Francisco, CA • Chrome on Mac</p>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-purple-500" />
                <div>
                  <h4 className="font-medium">Mobile App</h4>
                  <p className="text-sm text-muted-foreground">Last active 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
          
          <Button variant="destructive" size="sm">
            Sign Out All Devices
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark theme for low-light environments' },
              { id: 'light', label: 'Light', icon: Sun, description: 'Light theme for bright environments' },
              { id: 'system', label: 'System', icon: Monitor, description: 'Follow system preference' }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  setSelectedTheme(theme.id);
                  setIsDirty(true);
                }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedTheme === theme.id 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <theme.icon className="w-6 h-6 text-blue-500" />
                  {selectedTheme === theme.id && <CheckCircle className="w-5 h-5 text-blue-500" />}
                </div>
                <h3 className="font-medium mb-1">{theme.label}</h3>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interface Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <h4 className="font-medium">Compact Mode</h4>
              <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
            </div>
            <Toggle 
              checked={compactMode}
              onToggle={() => {
                setCompactMode(!compactMode);
                setIsDirty(true);
              }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div>
              <h4 className="font-medium">Animations</h4>
              <p className="text-sm text-muted-foreground">Enable smooth transitions and effects</p>
            </div>
            <Toggle 
              checked={animations}
              onToggle={() => {
                setAnimations(!animations);
                setIsDirty(true);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBillingSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div>
              <h3 className="text-xl font-bold">Pro Plan</h3>
              <p className="text-muted-foreground">$29/month • Billed monthly</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">Active</Badge>
                <Badge variant="outline">Auto-renewal enabled</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">$29</div>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <ChangePlanDialog />
            <CheckoutDialog />
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Jan 15, 2024", amount: "$29.00", status: "Paid", invoice: "INV-001" },
              { date: "Dec 15, 2023", amount: "$29.00", status: "Paid", invoice: "INV-002" },
              { date: "Nov 15, 2023", amount: "$29.00", status: "Paid", invoice: "INV-003" }
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div>
                    <h4 className="font-medium">{bill.invoice}</h4>
                    <p className="text-sm text-muted-foreground">{bill.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{bill.amount}</div>
                  <Badge variant="secondary" className="text-xs">{bill.status}</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <h4 className="font-medium">•••• •••• •••• 4242</h4>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case "profile":
        return renderProfileSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "appearance":
        return renderAppearanceSettings();
      case "billing":
        return renderBillingSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="w-full h-full">
      {/* Header - matches dashboard page structure exactly */}
      <header className="flex flex-wrap gap-3 min-h-20 py-4 px-4 md:px-6 lg:px-8 shrink-0 items-center transition-all ease-linear border-b">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">
          <SidebarTrigger className="-ms-1" />
          <div className="max-lg:hidden lg:contents">
            <Separator
              orientation="vertical"
              className="me-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Right side */}
        {isDirty && (
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsDirty(false)}
            >
              <X className="w-4 h-4 mr-2" />
              Discard
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </header>
      
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {settingsCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                        activeCategory === category.id
                          ? 'bg-blue-500/10 text-blue-600 border border-blue-200 dark:border-blue-800'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium">{category.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {category.description}
                        </div>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${
                        activeCategory === category.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}