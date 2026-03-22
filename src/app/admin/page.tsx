"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProfile, updateProfile } from "@/lib/firestore";
import type { ProfileData } from "@/lib/types";
import { defaultProfile } from "@/lib/data";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const { user, loading: authLoading, login, logout, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && isAdmin) {
      getProfile().then((p) => {
        if (p) setProfile(p);
      });
    }
  }, [user, isAdmin]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      await login(email, password);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(profile);
      toast.success("Profile updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080814]">
        <Loader2 className="animate-spin text-purple-500" size={32} />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#080814] px-4">
        <Card className="w-full max-w-md bg-[#0c0c1c] border-purple-500/20 text-white shadow-2xl shadow-purple-500/10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-300">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white font-mono"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-purple-300">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white font-mono"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={loggingIn || !email || !password}
              >
                {loggingIn ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080814] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin <span className="text-purple-500">Dashboard</span></h1>
          <Button variant="outline" className="border-purple-500/20 text-purple-300 hover:bg-purple-500/10" onClick={logout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Profile Settings</TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Manage Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-[#0c0c1c] border-purple-500/20 text-white">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Full Name</label>
                      <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Title</label>
                      <Input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Email</label>
                      <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Phone</label>
                      <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">Location</label>
                      <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-purple-300">WhatsApp Number</label>
                      <Input value={profile.whatsapp} onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })} className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm text-purple-300">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        className="w-full h-32 bg-white/5 border border-white/10 text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={saving}>
                    {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="bg-[#0c0c1c] border-purple-500/20 text-white">
              <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">The projects management interface will be available soon. For now, they are seeded statically.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
