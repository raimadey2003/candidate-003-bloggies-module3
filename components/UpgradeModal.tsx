'use client';

import { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Zap, Star, Loader2, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleUpgrade = async (plan: 'PRO' | 'PREMIUM') => {
    setLoading(plan);
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const result = await response.json();

      if (result.success && result.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = result.data.url;
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create checkout session",
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
      setLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl backdrop-blur-lg bg-white/10 border-white/20 text-white">
        {/* <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-yellow-400" />
            Upgrade Your Account
          </DialogTitle>
        </DialogHeader> */}

        <DialogHeader>
  <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
    <Crown className="h-6 w-6 text-yellow-400" />
    Upgrade Your Account
  </DialogTitle>
  <DialogDescription className="text-center text-white/70 mt-2">
    Choose a plan to get more credits and unlock features
  </DialogDescription>
</DialogHeader>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Pro Plan */}
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl relative">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-blue-400" />
                <CardTitle className="text-xl text-white">Pro Plan</CardTitle>
              </div>
              <div className="text-3xl font-bold text-white">$9.99</div>
              <p className="text-white/70">Perfect for growing creators</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">100 Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">50 Raffle Entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">Pro Badge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">Priority Support</span>
                </div>
              </div>
              
              <Button
                onClick={() => handleUpgrade('PRO')}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
              >
                {loading === 'PRO' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Upgrade to Pro'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-xl relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1">
                Most Popular
              </Badge>
            </div>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-xl text-white">Premium Plan</CardTitle>
              </div>
              <div className="text-3xl font-bold text-white">$19.99</div>
              <p className="text-white/70">For serious content creators</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">250 Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">125 Raffle Entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">Premium Badge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">Advanced Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-white/90">Custom Scheduling</span>
                </div>
              </div>
              
              <Button
                onClick={() => handleUpgrade('PREMIUM')}
                disabled={loading !== null}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium"
              >
                {loading === 'PREMIUM' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Upgrade to Premium'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center text-white/60 text-sm">
          <p>Secure payment powered by Stripe • Test mode enabled</p>
          <p className="mt-1">Use test card: 4242 4242 4242 4242</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}