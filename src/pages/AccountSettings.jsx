import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Textarea } from "@heroui/input";
import { Switch } from "@heroui/switch";
import { Avatar } from "@heroui/avatar";
import { motion } from "framer-motion";
import { useState } from "react";

import DefaultLayout from "../layouts/default.jsx";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Tech enthusiast and premium product collector. Always looking for the latest innovations.",
    avatarUrl:
      "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  });

  // Address state
  const [address, setAddress] = useState({
    street: "123 Premium Avenue",
    city: "San Francisco",
    state: "California",
    zipCode: "94102",
    country: "United States",
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    orderUpdates: true,
    newArrivals: true,
    specialOffers: false,
    newsletter: true,
    smsNotifications: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showPurchaseHistory: false,
    dataSharing: false,
  });

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "address", label: "Address" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "security", label: "Security" },
  ];

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving settings...");
  };

  return (
    <DefaultLayout>
      <motion.div
        className="py-16 min-h-screen"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Header */}
          <motion.div className="mb-12" variants={fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight font-playfair">
              Account Settings
            </h1>
            <p className="text-xl text-foreground/60 font-light">
              Manage your profile, preferences, and account security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <motion.div variants={scaleIn}>
              <Card className="sticky top-24 border-0 shadow-lg">
                <CardBody className="p-6">
                  <div className="space-y-2">
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          activeTab === tab.id
                            ? "bg-foreground text-background"
                            : "hover:bg-foreground/5 text-foreground/70"
                        }`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-xl">{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-foreground/10">
                    <Button
                      className="w-full bg-foreground text-background hover:opacity-90 font-medium"
                      onClick={handleSave}
                    >
                      Save All Changes
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-3 space-y-6"
              variants={staggerContainer}
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div variants={scaleIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-col items-start p-8 border-b border-foreground/10">
                      <h2 className="text-3xl font-bold font-playfair">
                        Profile Information
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Update your personal details and profile picture
                      </p>
                    </CardHeader>
                    <CardBody className="p-8 space-y-8">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6">
                        <Avatar
                          src={profile.avatarUrl}
                          className="w-24 h-24 text-large"
                          isBordered
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            Profile Picture
                          </h3>
                          <p className="text-sm text-foreground/60 mb-4">
                            Upload a new profile picture. JPG, PNG or GIF. Max
                            5MB.
                          </p>
                          <div className="flex gap-3">
                            <Button
                              size="sm"
                              className="bg-foreground text-background hover:opacity-90"
                            >
                              Upload New
                            </Button>
                            <Button
                              size="sm"
                              variant="bordered"
                              className="border-foreground/20"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            First Name
                          </label>
                          <Input
                            value={profile.firstName}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                firstName: e.target.value,
                              })
                            }
                            placeholder="Enter first name"
                            size="lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Last Name
                          </label>
                          <Input
                            value={profile.lastName}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                lastName: e.target.value,
                              })
                            }
                            placeholder="Enter last name"
                            size="lg"
                          />
                        </div>
                      </div>

                      {/* Contact Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Email Address
                          </label>
                          <Input
                            type="email"
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                            placeholder="Enter email"
                            size="lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                            placeholder="Enter phone"
                            size="lg"
                          />
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Bio
                        </label>
                        <Textarea
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile({ ...profile, bio: e.target.value })
                          }
                          placeholder="Tell us about yourself"
                          minRows={4}
                          size="lg"
                        />
                        <p className="text-xs text-foreground/50 mt-2">
                          {profile.bio.length}/500 characters
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )}

              {/* Address Tab */}
              {activeTab === "address" && (
                <motion.div variants={scaleIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-col items-start p-8 border-b border-foreground/10">
                      <h2 className="text-3xl font-bold font-playfair">
                        Shipping Address
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Manage your default shipping address
                      </p>
                    </CardHeader>
                    <CardBody className="p-8 space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Street Address
                        </label>
                        <Input
                          value={address.street}
                          onChange={(e) =>
                            setAddress({ ...address, street: e.target.value })
                          }
                          placeholder="Enter street address"
                          size="lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            City
                          </label>
                          <Input
                            value={address.city}
                            onChange={(e) =>
                              setAddress({ ...address, city: e.target.value })
                            }
                            placeholder="Enter city"
                            size="lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            State / Province
                          </label>
                          <Input
                            value={address.state}
                            onChange={(e) =>
                              setAddress({ ...address, state: e.target.value })
                            }
                            placeholder="Enter state"
                            size="lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            ZIP / Postal Code
                          </label>
                          <Input
                            value={address.zipCode}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                zipCode: e.target.value,
                              })
                            }
                            placeholder="Enter ZIP code"
                            size="lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Country
                          </label>
                          <Input
                            value={address.country}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                country: e.target.value,
                              })
                            }
                            placeholder="Enter country"
                            size="lg"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-foreground/10">
                        <Button
                          variant="bordered"
                          className="border-foreground/20"
                        >
                          + Add Another Address
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div variants={scaleIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-col items-start p-8 border-b border-foreground/10">
                      <h2 className="text-3xl font-bold font-playfair">
                        Notification Preferences
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Choose how you want to be notified
                      </p>
                    </CardHeader>
                    <CardBody className="p-8 space-y-6">
                      {[
                        {
                          key: "emailMarketing",
                          label: "Marketing Emails",
                          description:
                            "Receive emails about new products and exclusive offers",
                        },
                        {
                          key: "orderUpdates",
                          label: "Order Updates",
                          description:
                            "Get notified about your order status and shipping updates",
                        },
                        {
                          key: "newArrivals",
                          label: "New Arrivals",
                          description:
                            "Be the first to know about new product launches",
                        },
                        {
                          key: "specialOffers",
                          label: "Special Offers",
                          description:
                            "Receive notifications about sales and promotions",
                        },
                        {
                          key: "newsletter",
                          label: "Weekly Newsletter",
                          description:
                            "Get our curated weekly digest of premium products",
                        },
                        {
                          key: "smsNotifications",
                          label: "SMS Notifications",
                          description:
                            "Receive important updates via text message",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-foreground/5 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.label}</h3>
                            <p className="text-sm text-foreground/60">
                              {item.description}
                            </p>
                          </div>
                          <Switch
                            isSelected={notifications[item.key]}
                            onValueChange={(value) =>
                              setNotifications({
                                ...notifications,
                                [item.key]: value,
                              })
                            }
                            size="lg"
                          />
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                </motion.div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <motion.div variants={scaleIn}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-col items-start p-8 border-b border-foreground/10">
                      <h2 className="text-3xl font-bold font-playfair">
                        Privacy Settings
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Control your privacy and data sharing preferences
                      </p>
                    </CardHeader>
                    <CardBody className="p-8 space-y-6">
                      {[
                        {
                          key: "profileVisibility",
                          label: "Public Profile",
                          description:
                            "Make your profile visible to other VELORA users",
                        },
                        {
                          key: "showPurchaseHistory",
                          label: "Show Purchase History",
                          description:
                            "Display your purchase history on your public profile",
                        },
                        {
                          key: "dataSharing",
                          label: "Data Sharing",
                          description:
                            "Allow us to share anonymized data with partners for better recommendations",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-foreground/5 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.label}</h3>
                            <p className="text-sm text-foreground/60">
                              {item.description}
                            </p>
                          </div>
                          <Switch
                            isSelected={privacy[item.key]}
                            onValueChange={(value) =>
                              setPrivacy({ ...privacy, [item.key]: value })
                            }
                            size="lg"
                          />
                        </div>
                      ))}

                      <div className="pt-6 border-t border-foreground/10 space-y-4">
                        <Button
                          variant="bordered"
                          className="w-full border-foreground/20"
                        >
                          Download My Data
                        </Button>
                        <Button
                          variant="bordered"
                          className="w-full border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div variants={scaleIn} className="space-y-6">
                  {/* Change Password */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-col items-start p-8 border-b border-foreground/10">
                      <h2 className="text-3xl font-bold font-playfair">
                        Change Password
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Update your password to keep your account secure
                      </p>
                    </CardHeader>
                    <CardBody className="p-8 space-y-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Current Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          size="lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          New Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          size="lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Confirm New Password
                        </label>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          size="lg"
                        />
                      </div>
                      <Button className="bg-foreground text-background hover:opacity-90 font-medium">
                        Update Password
                      </Button>
                    </CardBody>
                  </Card>

                  {/* Two-Factor Authentication */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-col items-start p-8 border-b border-foreground/10">
                      <h2 className="text-3xl font-bold font-playfair">
                        Two-Factor Authentication
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Add an extra layer of security to your account
                      </p>
                    </CardHeader>
                    <CardBody className="p-8">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-foreground/5">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">Enable 2FA</h3>
                          <p className="text-sm text-foreground/60">
                            Protect your account with two-factor authentication
                          </p>
                        </div>
                        <Switch size="lg" />
                      </div>
                    </CardBody>
                  </Card>

                  {/* Active Sessions */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="flex flex-col items-start p-8 border-b border-foreground/10">
                      <h2 className="text-3xl font-bold font-playfair">
                        Active Sessions
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Manage your logged-in devices
                      </p>
                    </CardHeader>
                    <CardBody className="p-8 space-y-4">
                      {[
                        {
                          device: "MacBook Pro",
                          location: "San Francisco, CA",
                          time: "Active now",
                          current: true,
                        },
                        {
                          device: "iPhone 15 Pro",
                          location: "San Francisco, CA",
                          time: "2 hours ago",
                          current: false,
                        },
                        {
                          device: "iPad Air",
                          location: "Los Angeles, CA",
                          time: "1 day ago",
                          current: false,
                        },
                      ].map((session, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border border-foreground/10"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">
                                {session.device}
                              </h3>
                              {session.current && (
                                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-foreground/60 mt-1">
                              {session.location} • {session.time}
                            </p>
                          </div>
                          {!session.current && (
                            <Button
                              size="sm"
                              variant="bordered"
                              className="border-red-500 text-red-500 hover:bg-red-500/10"
                            >
                              Revoke
                            </Button>
                          )}
                        </div>
                      ))}
                    </CardBody>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DefaultLayout>
  );
}
