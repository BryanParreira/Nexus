"use client";

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useId } from "react";
import {
  RiExpandUpDownLine,
  RiUserLine,
  RiLogoutCircleLine,
  RiNotificationLine,
  RiShieldLine,
  RiNoCreditCardLine,
  RiMoonLine,
  RiSunLine,
  RiComputerLine,
} from "@remixicon/react";
import { CheckIcon, RefreshCcwIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";

// Change Plan Dialog Component
function ChangePlanDialog({ children }: { children: React.ReactNode }) {
  const id = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
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
            {/* Radio card #1 */}
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
                  $4 per member/month
                </p>
              </div>
            </div>
            {/* Radio card #2 */}
            <div className="border-input has-data-[state=checked]:border-primary/50 has-data-[state=checked]:bg-accent relative flex w-full items-center gap-2 rounded-md border px-4 py-3 shadow-xs outline-none">
              <RadioGroupItem
                value="2"
                id={`${id}-2`}
                aria-describedby={`${id}-2-description`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-1">
                <Label htmlFor={`${id}-2`}>Standard</Label>
                <p
                  id={`${id}-2-description`}
                  className="text-muted-foreground text-xs"
                >
                  $19 per member/month
                </p>
              </div>
            </div>
            {/* Radio card #3 */}
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
                  $32 per member/month
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
                Remove watermarks.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Add unlimited users and free viewers.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Upload unlimited files.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                7-day money back guarantee.
              </li>
              <li className="flex gap-2">
                <CheckIcon
                  size={16}
                  className="text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                Advanced permissions.
              </li>
            </ul>
          </div>
          <div className="grid gap-2">
            <Button type="button" className="w-full">
              Change plan
            </Button>
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
}

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Settings states
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [securityAlerts, setSecurityAlerts] = React.useState(true);
  const [currentPlan, setCurrentPlan] = React.useState('Pro Plan');

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    router.push('/auth/signin');
  };

  const handleProfile = () => {
    router.push('/dashboard/profile');
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    console.log(`Theme changed to: ${newTheme}`);
  };

  const handleNotificationToggle = (type: string, value: boolean) => {
    switch (type) {
      case 'email':
        setEmailNotifications(value);
        break;
      case 'push':
        setPushNotifications(value);
        break;
      case 'security':
        setSecurityAlerts(value);
        break;
    }
    console.log(`${type} notifications: ${value}`);
  };

  const handleBillingAction = (action: string) => {
    console.log(`Billing action: ${action}`);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground [&>svg]:size-5"
            >
              <Avatar className="size-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <RiExpandUpDownLine className="ml-auto size-5 text-muted-foreground/80" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 max-w-[95vw] bg-sidebar"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            {/* User Info */}
            <DropdownMenuLabel className="p-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{currentPlan}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* Profile */}
              <DropdownMenuItem
                className="gap-3 focus:bg-sidebar-accent cursor-pointer p-3"
                onClick={handleProfile}
              >
                <RiUserLine size={20} className="size-5 text-muted-foreground/80" />
                Profile
              </DropdownMenuItem>

              {/* Theme Selector */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-3 focus:bg-sidebar-accent cursor-pointer p-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {theme === 'dark' ? (
                        <RiMoonLine size={20} className="size-5 text-muted-foreground/80" />
                      ) : theme === 'light' ? (
                        <RiSunLine size={20} className="size-5 text-muted-foreground/80" />
                      ) : (
                        <RiComputerLine size={20} className="size-5 text-muted-foreground/80" />
                      )}
                      <span>Theme</span>
                    </div>
                    <span className="text-xs text-muted-foreground capitalize hidden sm:inline">
                      {theme}
                    </span>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-48">
                  <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                    <RiSunLine className="mr-2 size-4" />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                    <RiMoonLine className="mr-2 size-4" />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleThemeChange('system')}>
                    <RiComputerLine className="mr-2 size-4" />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Notifications */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-3 focus:bg-sidebar-accent cursor-pointer p-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <RiNotificationLine size={20} className="size-5 text-muted-foreground/80" />
                      <span>Notifications</span>
                    </div>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-72 max-w-[90vw] p-0">
                  <div className="p-3 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Email Notifications</span>
                        <p className="text-xs text-muted-foreground mt-0.5">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={emailNotifications}
                        onCheckedChange={(checked) => handleNotificationToggle('email', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Push Notifications</span>
                        <p className="text-xs text-muted-foreground mt-0.5">Get browser notifications</p>
                      </div>
                      <Switch
                        checked={pushNotifications}
                        onCheckedChange={(checked) => handleNotificationToggle('push', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium">Security Alerts</span>
                        <p className="text-xs text-muted-foreground mt-0.5">Important security updates</p>
                      </div>
                      <Switch
                        checked={securityAlerts}
                        onCheckedChange={(checked) => handleNotificationToggle('security', checked)}
                      />
                    </div>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Security */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-3 focus:bg-sidebar-accent cursor-pointer p-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <RiShieldLine size={20} className="size-5 text-muted-foreground/80" />
                      <span>Security</span>
                    </div>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem onClick={() => console.log('Change password')}>
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Configure 2FA')}>
                    <span>Two-Factor Authentication</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('View sessions')}>
                    <span>Active Sessions</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => console.log('Sign out all devices')} className="text-red-600">
                    <span>Sign Out All Devices</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Billing */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="gap-3 focus:bg-sidebar-accent cursor-pointer p-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <RiNoCreditCardLine size={20} className="size-5 text-muted-foreground/80" />
                      <span>Billing</span>
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      Pro
                    </span>
                  </div>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-56">
                  <DropdownMenuItem onClick={() => handleBillingAction('view-plan')}>
                    <div>
                      <span className="font-medium">Current Plan</span>
                      <p className="text-xs text-muted-foreground">{currentPlan} - $29/month</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ChangePlanDialog>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <span>Change Plan</span>
                    </DropdownMenuItem>
                  </ChangePlanDialog>
                  <DropdownMenuItem onClick={() => handleBillingAction('billing-history')}>
                    <span>Billing History</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBillingAction('payment-method')}>
                    <span>Payment Method</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleBillingAction('cancel')} className="text-red-600">
                    <span>Cancel Subscription</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* Logout */}
            <DropdownMenuItem
              className="gap-3 focus:bg-sidebar-accent cursor-pointer text-red-600 focus:text-red-600 p-3"
              onClick={handleLogout}
            >
              <RiLogoutCircleLine size={20} className="size-5 text-red-600" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}