'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Clock, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreatePostFormProps {
  onPostCreated: () => void;
}

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    platform: '',
    date: '',
    time: '',
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    
    if (!formData.content || !formData.platform || !formData.date || !formData.time) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const scheduledFor = new Date(`${formData.date}T${formData.time}`).toISOString();
      
      console.log('Sending request with scheduledFor:', scheduledFor);
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: formData.content,
          scheduledFor,
          platform: formData.platform,
        }),
      });

      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response result:', result);

      if (result.success) {
        toast({
          title: "Success!",
          description: "Post scheduled successfully",
        });
        setFormData({ content: '', platform: '', date: '', time: '' });
        onPostCreated();
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to schedule post",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const minDateTime = new Date();
  minDateTime.setMinutes(minDateTime.getMinutes() + 5); // Minimum 5 minutes from now
  const minDate = minDateTime.toISOString().split('T')[0];
  const minTime = minDateTime.toTimeString().slice(0, 5);

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Send className="h-5 w-5" />
          Schedule New Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform" className="text-white/90">Platform</Label>
            <Select value={formData.platform} onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white/90">Post Content</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind?"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              maxLength={280}
            />
            <div className="text-right text-sm text-white/60">
              {formData.content.length}/280
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white/90 flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                min={minDate}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-white/90 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                min={formData.date === minDate ? minTime : undefined}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              'Schedule Post'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}