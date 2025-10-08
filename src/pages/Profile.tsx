import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Loader2, Upload, CheckCircle, XCircle, Edit2, X, Building2, Mail, Phone, User as UserIcon } from 'lucide-react';

interface EnterpriseProfile {
  id: string;
  company_name: string;
  owner_id: string;
  is_active: boolean;
  created_at: string;
}

const Profile = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [enterpriseData, setEnterpriseData] = useState<EnterpriseProfile | null>(null);
  
  const [formData, setFormData] = useState({
    phone_number: '',
    username: '',
    profile_picture_url: ''
  });

  const [displayData, setDisplayData] = useState({
    full_name: '',
    phone_number: '',
    username: '',
    profile_picture_url: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      // Load profile data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Load user_profiles data
      const { data: userProfileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      const userData = {
        full_name: profileData?.full_name || '',
        phone_number: profileData?.phone_number || '',
        username: userProfileData?.username || '',
        profile_picture_url: userProfileData?.profile_picture_url || ''
      };

      setDisplayData(userData);
      setFormData({
        phone_number: userData.phone_number,
        username: userData.username,
        profile_picture_url: userData.profile_picture_url
      });

      // Load enterprise data based on role
      if (profile?.role === 'ENTERPRISE') {
        // For ENTERPRISE role, fetch their owned enterprise
        const { data: enterpriseOwned } = await supabase
          .from('enterprise_profile')
          .select('*')
          .eq('owner_id', user.id)
          .maybeSingle();
        
        setEnterpriseData(enterpriseOwned);
      } else if (profile?.role === 'USER' && profileData?.enterprise_id) {
        // For USER role, fetch their associated enterprise
        const { data: enterpriseAssociated } = await supabase
          .from('enterprise_profile')
          .select('*')
          .eq('id', profileData.enterprise_id)
          .maybeSingle();
        
        setEnterpriseData(enterpriseAssociated);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      const placeholderUrl = URL.createObjectURL(file);
      
      setFormData({
        ...formData,
        profile_picture_url: placeholderUrl
      });

      toast({
        title: "Image Selected",
        description: "Save your changes to update the image",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form data to current display data
    setFormData({
      phone_number: displayData.phone_number,
      username: displayData.username,
      profile_picture_url: displayData.profile_picture_url
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Update profiles table (only phone_number)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          phone_number: formData.phone_number
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      // Update or insert user_profiles
      const { error: userProfileError } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          username: formData.username,
          profile_picture_url: formData.profile_picture_url
        }, {
          onConflict: 'user_id'
        });

      if (userProfileError) throw userProfileError;

      // Update display data
      setDisplayData({
        ...displayData,
        phone_number: formData.phone_number,
        username: formData.username,
        profile_picture_url: formData.profile_picture_url
      });

      setIsEditMode(false);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            {!isEditMode && (
              <Button onClick={handleEdit}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Profile Picture & Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditMode ? 'Update your profile details' : 'Your personal information'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={isEditMode ? formData.profile_picture_url : displayData.profile_picture_url} />
                      <AvatarFallback className="text-3xl">
                        {displayData.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isEditMode && (
                      <div>
                        <Input
                          id="profile-picture"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('profile-picture')?.click()}
                          disabled={uploading}
                        >
                          {uploading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="mr-2 h-4 w-4" />
                              Change Photo
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="flex-1 space-y-6">
                    {/* Full Name - Read Only */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        Full Name
                      </Label>
                      <div className="text-lg font-medium">{displayData.full_name || 'Not set'}</div>
                    </div>

                    {/* Username - Editable */}
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      {isEditMode ? (
                        <Input
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Enter your username"
                        />
                      ) : (
                        <div className="text-lg">{displayData.username || 'Not set'}</div>
                      )}
                    </div>

                    {/* Phone Number - Editable */}
                    <div className="space-y-2">
                      <Label htmlFor="phone_number" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Number
                      </Label>
                      {isEditMode ? (
                        <Input
                          id="phone_number"
                          name="phone_number"
                          type="tel"
                          value={formData.phone_number}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                        />
                      ) : (
                        <div className="text-lg">{displayData.phone_number || 'Not set'}</div>
                      )}
                    </div>

                    {/* Email - Read Only */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      <div className="text-lg">{profile.email}</div>
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons for Edit Mode */}
                {isEditMode && (
                  <div className="flex gap-4 mt-6 pt-6 border-t">
                    <Button onClick={handleSubmit} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enterprise Information Card */}
            {enterpriseData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Enterprise Information
                  </CardTitle>
                  <CardDescription>
                    {profile?.role === 'ENTERPRISE' 
                      ? 'Your enterprise details' 
                      : 'Your associated enterprise'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Company Name</Label>
                        <p className="text-lg font-medium mt-1">{enterpriseData.company_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enterprise Status</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {enterpriseData.is_active ? 'Active enterprise account' : 'Inactive enterprise account'}
                        </p>
                      </div>
                      <Badge variant={enterpriseData.is_active ? "default" : "secondary"}>
                        {enterpriseData.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    {profile?.role === 'ENTERPRISE' && (
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Role in Enterprise</Label>
                          <p className="text-sm text-muted-foreground mt-1">Enterprise Owner</p>
                        </div>
                        <Badge variant="outline">Owner</Badge>
                      </div>
                    )}

                    <div>
                      <Label>Member Since</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(enterpriseData.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Information Card */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your account status and verification details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Verification Status</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {profile.is_email_verified ? 'Your email is verified' : 'Your email is not verified'}
                    </p>
                  </div>
                  {profile.is_email_verified ? (
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Not Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Account Role</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {profile.role === 'ADMIN' ? 'Administrator' : 
                       profile.role === 'ENTERPRISE' ? 'Enterprise Owner' :
                       profile.role === 'SUPPORT' ? 'Support Staff' : 'User'}
                    </p>
                  </div>
                  <Badge variant="outline">{profile.role}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Account Status</Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {profile.is_active ? 'Your account is active' : 'Your account is inactive'}
                    </p>
                  </div>
                  <Badge variant={profile.is_active ? "default" : "secondary"}>
                    {profile.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
